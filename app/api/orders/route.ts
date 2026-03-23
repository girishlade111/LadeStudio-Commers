import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { PendingCheckout } from '@/types'
import { createOrder, getOrdersByClerkUserId } from '@/services/orders'
import { rateLimit, sanitizeInput, validateAddress, validateName, validatePhone, validateProductId } from '@/utils/security'

const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '20', 10)
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10)
const MAX_SCREENSHOT_SIZE = 5 * 1024 * 1024
const ALLOWED_SCREENSHOT_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

export const runtime = 'nodejs'

function getRateLimitKey(request: Request, userId: string) {
  const forwardedFor = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  return `orders_${userId}_${forwardedFor}`
}

function parsePendingCheckoutPayload(value: FormDataEntryValue | null): PendingCheckout | null {
  if (typeof value !== 'string' || !value.trim()) {
    return null
  }

  const parsed = JSON.parse(value) as PendingCheckout | null
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Invalid pending checkout payload')
  }

  return parsed
}

function parseOrderItems(
  itemsJson: string,
  pendingCheckout: PendingCheckout | null
): Array<{ productId: string; quantity: number }> {
  const rawItems: Array<{ productId?: string; id?: string; quantity?: number }> = itemsJson.trim()
    ? JSON.parse(itemsJson) as Array<{ productId?: string; id?: string; quantity?: number }>
    : pendingCheckout?.items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })) || []

  if (!Array.isArray(rawItems)) {
    throw new Error('Order items payload must be an array')
  }

  return rawItems
    .map((item) => ({
      productId: String(item.productId || item.id || '').trim(),
      quantity: Number(item.quantity),
    }))
    .filter((item) => validateProductId(item.productId) && Number.isInteger(item.quantity) && item.quantity > 0)
}

export async function GET(request: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const rateLimitResult = rateLimit(getRateLimitKey(request, userId), RATE_LIMIT_MAX, RATE_LIMIT_WINDOW)

  if (!rateLimitResult.success) {
    return NextResponse.json({ success: false, error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  try {
    const orders = await getOrdersByClerkUserId(userId)
    return NextResponse.json({ success: true, data: orders })
  } catch (error) {
    console.error('Failed to fetch orders', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const rateLimitResult = rateLimit(getRateLimitKey(request, userId), RATE_LIMIT_MAX, RATE_LIMIT_WINDOW)

  if (!rateLimitResult.success) {
    return NextResponse.json({ success: false, error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  try {
    const formData = await request.formData()
    let pendingCheckout: PendingCheckout | null = null

    try {
      pendingCheckout = parsePendingCheckoutPayload(formData.get('pendingCheckout'))
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid pending checkout data' }, { status: 400 })
    }

    const customerName = sanitizeInput(
      String(formData.get('customerName') || pendingCheckout?.customer?.name || ''),
      100
    )
    const customerPhone = String(formData.get('customerPhone') || pendingCheckout?.customer?.phone || '')
      .replace(/\D/g, '')
      .slice(0, 10)
    const shippingAddress = sanitizeInput(
      String(formData.get('shippingAddress') || pendingCheckout?.customer?.address || ''),
      500
    )
    const payerName = sanitizeInput(String(formData.get('payerName') || ''), 100)
    const payerPhone = String(formData.get('payerPhone') || '').replace(/\D/g, '').slice(0, 10)
    const itemsJson = String(formData.get('items') || '')
    const screenshot = formData.get('screenshot')

    if (!validateName(customerName) || !validatePhone(customerPhone) || !validateAddress(shippingAddress)) {
      return NextResponse.json({ success: false, error: 'Invalid customer details' }, { status: 400 })
    }

    if (!validateName(payerName) || !validatePhone(payerPhone)) {
      return NextResponse.json({ success: false, error: 'Invalid payer details' }, { status: 400 })
    }

    if (!(screenshot instanceof File)) {
      return NextResponse.json({ success: false, error: 'Payment screenshot is required' }, { status: 400 })
    }

    if (!ALLOWED_SCREENSHOT_TYPES.has(screenshot.type)) {
      return NextResponse.json({ success: false, error: 'Only JPG, PNG, or WEBP screenshots are allowed' }, { status: 400 })
    }

    if (screenshot.size > MAX_SCREENSHOT_SIZE) {
      return NextResponse.json({ success: false, error: 'Screenshot must be 5 MB or smaller' }, { status: 400 })
    }

    let items: Array<{ productId: string; quantity: number }> = []

    try {
      items = parseOrderItems(itemsJson, pendingCheckout)
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid order items payload' }, { status: 400 })
    }

    if (items.length === 0) {
      return NextResponse.json({ success: false, error: 'No valid items found in this order' }, { status: 400 })
    }

    const screenshotBuffer = Buffer.from(await screenshot.arrayBuffer())
    const user = await currentUser()
    const emailAddress = user?.emailAddresses?.[0]?.emailAddress || ''

    const order = await createOrder({
      clerkUserId: userId,
      clerkEmail: emailAddress,
      customerName,
      customerPhone,
      shippingAddress,
      payerName,
      payerPhone,
      items,
      screenshotFileName: screenshot.name || 'payment-proof',
      screenshotMimeType: screenshot.type,
      screenshotBuffer,
    })

    return NextResponse.json({ success: true, data: order }, { status: 201 })
  } catch (error) {
    console.error('Failed to create order', error)
    if (error instanceof Error && (
      error.message.startsWith('Invalid product id') ||
      error.message.startsWith('Invalid quantity') ||
      error.message.startsWith('Some products are no longer available') ||
      error.message === 'No valid items were found for this order'
    )) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: false, error: 'Failed to submit payment proof' }, { status: 500 })
  }
}
