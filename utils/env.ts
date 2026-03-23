export interface GoogleServiceAccountCredentials {
  email: string
  privateKey: string
}

function normalizePrivateKey(privateKey: string): string {
  return privateKey.replace(/\\n/g, '\n')
}

export function getGoogleSheetId(): string {
  return process.env.GOOGLE_SHEETS_ID || process.env.GOOGLE_SHEET_ID || ''
}

export function getGoogleDriveFolderId(): string {
  return process.env.GOOGLE_DRIVE_FOLDER_ID || ''
}

export function hasGoogleServiceAccountCredentials(): boolean {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS ||
    (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY)
  )
}

export function getGoogleServiceAccountCredentials(): GoogleServiceAccountCredentials {
  const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS

  if (credentialsJson) {
    try {
      const parsed = JSON.parse(credentialsJson) as {
        client_email?: string
        private_key?: string
        email?: string
        privateKey?: string
      }

      const email = parsed.client_email || parsed.email
      const privateKey = parsed.private_key || parsed.privateKey

      if (!email || !privateKey) {
        throw new Error('Missing client_email/private_key fields')
      }

      return {
        email,
        privateKey: normalizePrivateKey(privateKey),
      }
    } catch (error) {
      const details = error instanceof Error ? error.message : 'Unknown error'
      throw new Error(`GOOGLE_SERVICE_ACCOUNT_CREDENTIALS is invalid: ${details}`)
    }
  }

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY

  if (!email || !privateKey) {
    throw new Error('Google service account credentials are not configured')
  }

  return {
    email,
    privateKey: normalizePrivateKey(privateKey),
  }
}
