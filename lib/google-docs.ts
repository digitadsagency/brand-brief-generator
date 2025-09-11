import { google } from 'googleapis'

const auth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
)

export const docs = google.docs({ version: 'v1', auth })
export const drive = google.drive({ version: 'v3', auth })

export { auth }
