import { createSign, randomUUID } from 'crypto'

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_SHEETS_BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets'
const GOOGLE_DRIVE_UPLOAD_URL = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name'
const GOOGLE_DRIVE_PERMISSIONS_URL = 'https://www.googleapis.com/drive/v3/files'

interface AccessTokenCacheEntry {
  accessToken: string
  expiresAt: number
}

const tokenCache = new Map<string, AccessTokenCacheEntry>()

function base64UrlEncode(value: string | Buffer): string {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function getGoogleCredentials() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!email || !privateKey) {
    throw new Error('Google service account credentials are not configured')
  }

  return {
    email,
    privateKey,
  }
}

async function fetchGoogleAccessToken(scopes: string[]): Promise<string> {
  const scopeKey = scopes.slice().sort().join(' ')
  const cached = tokenCache.get(scopeKey)

  if (cached && cached.expiresAt > Date.now() + 60_000) {
    return cached.accessToken
  }

  const { email, privateKey } = getGoogleCredentials()
  const issuedAt = Math.floor(Date.now() / 1000)
  const expiresAt = issuedAt + 3600
  const header = base64UrlEncode(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const payload = base64UrlEncode(JSON.stringify({
    iss: email,
    scope: scopes.join(' '),
    aud: GOOGLE_TOKEN_URL,
    exp: expiresAt,
    iat: issuedAt,
  }))
  const unsignedToken = `${header}.${payload}`
  const signer = createSign('RSA-SHA256')
  signer.update(unsignedToken)
  signer.end()
  const signature = base64UrlEncode(signer.sign(privateKey))
  const assertion = `${unsignedToken}.${signature}`

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch Google access token: ${response.status}`)
  }

  const data = await response.json() as {
    access_token: string
    expires_in: number
  }

  tokenCache.set(scopeKey, {
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  })

  return data.access_token
}

type GoogleRequestInit = RequestInit & {
  next?: {
    revalidate?: number
  }
}

async function googleJsonRequest<T>(url: string, init: GoogleRequestInit, scopes: string[]): Promise<T> {
  const accessToken = await fetchGoogleAccessToken(scopes)
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(init.headers || {}),
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Google API request failed (${response.status}): ${errorText}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export async function getSheetValues(sheetId: string, range: string): Promise<string[][]> {
  const response = await googleJsonRequest<{ values?: string[][] }>(
    `${GOOGLE_SHEETS_BASE_URL}/${sheetId}/values/${encodeURIComponent(range)}`,
    {
      method: 'GET',
      next: { revalidate: 300 },
    },
    ['https://www.googleapis.com/auth/spreadsheets.readonly']
  )

  return response.values || []
}

export async function ensureSheetExists(sheetId: string, sheetName: string): Promise<void> {
  const spreadsheet = await googleJsonRequest<{ sheets?: Array<{ properties?: { title?: string } }> }>(
    `${GOOGLE_SHEETS_BASE_URL}/${sheetId}?fields=sheets.properties.title`,
    { method: 'GET' },
    ['https://www.googleapis.com/auth/spreadsheets']
  )

  const exists = spreadsheet.sheets?.some((sheet) => sheet.properties?.title === sheetName)
  if (exists) {
    return
  }

  await googleJsonRequest(
    `${GOOGLE_SHEETS_BASE_URL}/${sheetId}:batchUpdate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          {
            addSheet: {
              properties: {
                title: sheetName,
              },
            },
          },
        ],
      }),
    },
    ['https://www.googleapis.com/auth/spreadsheets']
  )
}

export async function updateSheetValues(sheetId: string, range: string, values: string[][]): Promise<void> {
  await googleJsonRequest(
    `${GOOGLE_SHEETS_BASE_URL}/${sheetId}/values/${encodeURIComponent(range)}?valueInputOption=RAW`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        range,
        majorDimension: 'ROWS',
        values,
      }),
    },
    ['https://www.googleapis.com/auth/spreadsheets']
  )
}

export async function appendSheetValues(sheetId: string, range: string, values: string[][]): Promise<void> {
  await googleJsonRequest(
    `${GOOGLE_SHEETS_BASE_URL}/${sheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        range,
        majorDimension: 'ROWS',
        values,
      }),
    },
    ['https://www.googleapis.com/auth/spreadsheets']
  )
}

export async function uploadFileToDrive(options: {
  fileName: string
  mimeType: string
  fileBuffer: Buffer
  folderId: string
}): Promise<{ id: string; publicUrl: string }> {
  const boundary = `codex-${randomUUID()}`
  const metadata = JSON.stringify({
    name: options.fileName,
    parents: [options.folderId],
  })

  const multipartBody = Buffer.concat([
    Buffer.from(`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n`),
    Buffer.from(`--${boundary}\r\nContent-Type: ${options.mimeType}\r\n\r\n`),
    options.fileBuffer,
    Buffer.from(`\r\n--${boundary}--`),
  ])

  const uploadResponse = await googleJsonRequest<{ id: string }>(
    GOOGLE_DRIVE_UPLOAD_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: multipartBody,
    },
    ['https://www.googleapis.com/auth/drive.file']
  )

  await googleJsonRequest(
    `${GOOGLE_DRIVE_PERMISSIONS_URL}/${uploadResponse.id}/permissions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role: 'reader',
        type: 'anyone',
      }),
    },
    ['https://www.googleapis.com/auth/drive.file']
  )

  return {
    id: uploadResponse.id,
    publicUrl: `https://drive.google.com/uc?export=view&id=${uploadResponse.id}`,
  }
}
