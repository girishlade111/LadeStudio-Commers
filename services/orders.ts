import { CartItem, OrderLineItem, OrderRecord } from '@/types'
import { appendSheetValues, ensureSheetExists, getSheetValues, updateSheetValues, uploadFileToDrive } from '@/services/googleWorkspace'
import { getAllProducts } from '@/services/catalog'
import { getGoogleDriveFolderId, getGoogleSheetId } from '@/utils/env'
import { buildOrderLineItems, calculateOrderTotals, summarizeOrderItems } from '@/utils/orders'
import { validateProductId } from '@/utils/security'

const ORDERS_SHEET_NAME = 'Orders'

const ORDER_HEADERS = [
  'order_id',
  'clerk_user_id',
  'clerk_email',
  'customer_name',
  'customer_phone',
  'shipping_address',
  'payer_name',
  'payer_phone',
  'items_json',
  'item_summary',
  'subtotal',
  'shipping',
  'total',
  'screenshot_drive_file_id',
  'screenshot_url',
  'status',
  'created_at',
]

export async function ensureOrdersSheetHeaders(): Promise<void> {
  const sheetId = getGoogleSheetId()

  if (!sheetId) {
    throw new Error('GOOGLE_SHEET_ID or GOOGLE_SHEETS_ID is not configured')
  }

  await ensureSheetExists(sheetId, ORDERS_SHEET_NAME)
  const headerValues = await getSheetValues(sheetId, `${ORDERS_SHEET_NAME}!1:1`)

  if (headerValues.length === 0 || headerValues[0].length === 0) {
    await updateSheetValues(sheetId, `${ORDERS_SHEET_NAME}!A1:Q1`, [ORDER_HEADERS])
  }
}

function mapOrderRow(row: string[]): OrderRecord | null {
  if (!row[0] || row[0] === 'order_id') {
    return null
  }

  let items: OrderLineItem[] = []
  try {
    items = JSON.parse(row[8] || '[]') as OrderLineItem[]
  } catch {
    items = []
  }

  return {
    orderId: row[0] || '',
    clerkUserId: row[1] || '',
    clerkEmail: row[2] || '',
    customerName: row[3] || '',
    customerPhone: row[4] || '',
    shippingAddress: row[5] || '',
    payerName: row[6] || '',
    payerPhone: row[7] || '',
    items,
    itemSummary: row[9] || '',
    subtotal: Number(row[10] || 0),
    shipping: Number(row[11] || 0),
    total: Number(row[12] || 0),
    screenshotDriveFileId: row[13] || '',
    screenshotUrl: row[14] || '',
    status: (row[15] as OrderRecord['status']) || 'payment_submitted',
    createdAt: row[16] || '',
  }
}

export async function getOrdersByClerkUserId(clerkUserId: string): Promise<OrderRecord[]> {
  const sheetId = getGoogleSheetId()

  if (!sheetId) {
    return []
  }

  await ensureOrdersSheetHeaders()
  const rows = await getSheetValues(sheetId, `${ORDERS_SHEET_NAME}!A:Q`)

  return rows
    .slice(1)
    .map(mapOrderRow)
    .filter((order): order is OrderRecord => Boolean(order && order.clerkUserId === clerkUserId))
    .sort((first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime())
}

export async function createOrder(options: {
  clerkUserId: string
  clerkEmail: string
  customerName: string
  customerPhone: string
  shippingAddress: string
  payerName: string
  payerPhone: string
  items: Array<{ productId: string; quantity: number }>
  screenshotFileName: string
  screenshotMimeType: string
  screenshotBuffer: Buffer
}): Promise<OrderRecord> {
  const sheetId = getGoogleSheetId()
  const driveFolderId = getGoogleDriveFolderId()

  if (!sheetId) {
    throw new Error('GOOGLE_SHEET_ID or GOOGLE_SHEETS_ID is not configured')
  }

  if (!driveFolderId) {
    throw new Error('GOOGLE_DRIVE_FOLDER_ID is not configured')
  }

  await ensureOrdersSheetHeaders()

  const products = await getAllProducts()
  const itemsByProductId = new Map(products.map((product) => [product.id, product]))
  const mergedItems = new Map<string, number>()

  for (const item of options.items) {
    if (!validateProductId(item.productId)) {
      throw new Error(`Invalid product id: ${item.productId}`)
    }

    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
      throw new Error(`Invalid quantity for product: ${item.productId}`)
    }

    mergedItems.set(item.productId, (mergedItems.get(item.productId) || 0) + item.quantity)
  }

  const missingProductIds = Array.from(mergedItems.keys()).filter((productId) => !itemsByProductId.has(productId))
  if (missingProductIds.length > 0) {
    throw new Error(`Some products are no longer available: ${missingProductIds.join(', ')}`)
  }

  const cartItems: CartItem[] = Array.from(mergedItems.entries()).map(([productId, quantity]) => {
    const product = itemsByProductId.get(productId)

    if (!product) {
      throw new Error(`Product not found: ${productId}`)
    }

    return {
      ...product,
      quantity,
    }
  })

  if (cartItems.length === 0) {
    throw new Error('No valid items were found for this order')
  }

  const lineItems = buildOrderLineItems(cartItems)
  const totals = calculateOrderTotals(cartItems)
  const timestamp = new Date().toISOString()
  const orderId = `ORD-${timestamp.slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
  const uploadedScreenshot = await uploadFileToDrive({
    fileName: `${orderId}-${options.screenshotFileName}`,
    mimeType: options.screenshotMimeType,
    fileBuffer: options.screenshotBuffer,
    folderId: driveFolderId,
  })

  const orderRecord: OrderRecord = {
    orderId,
    clerkUserId: options.clerkUserId,
    clerkEmail: options.clerkEmail,
    customerName: options.customerName,
    customerPhone: options.customerPhone,
    shippingAddress: options.shippingAddress,
    payerName: options.payerName,
    payerPhone: options.payerPhone,
    items: lineItems,
    itemSummary: summarizeOrderItems(lineItems),
    subtotal: totals.subtotal,
    shipping: totals.shipping,
    total: totals.total,
    screenshotDriveFileId: uploadedScreenshot.id,
    screenshotUrl: uploadedScreenshot.publicUrl,
    status: 'payment_submitted',
    createdAt: timestamp,
  }

  await appendSheetValues(sheetId, `${ORDERS_SHEET_NAME}!A:Q`, [[
    orderRecord.orderId,
    orderRecord.clerkUserId,
    orderRecord.clerkEmail,
    orderRecord.customerName,
    orderRecord.customerPhone,
    orderRecord.shippingAddress,
    orderRecord.payerName,
    orderRecord.payerPhone,
    JSON.stringify(orderRecord.items),
    orderRecord.itemSummary,
    String(orderRecord.subtotal),
    String(orderRecord.shipping),
    String(orderRecord.total),
    orderRecord.screenshotDriveFileId,
    orderRecord.screenshotUrl,
    orderRecord.status,
    orderRecord.createdAt,
  ]])

  return orderRecord
}
