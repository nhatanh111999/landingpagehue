import { createHmac, timingSafeEqual } from 'node:crypto'

export const adminCookieName = 'hue_admin_session'
const sessionDurationSeconds = 60 * 60 * 8

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD
}

function sign(value: string) {
  return createHmac('sha256', getSessionSecret() || '').update(value).digest('hex')
}

export function createAdminSession() {
  const expiresAt = Math.floor(Date.now() / 1000) + sessionDurationSeconds
  const payload = String(expiresAt)
  return `${payload}.${sign(payload)}`
}

export function isValidAdminSession(request: Request) {
  const token = request.headers.get('cookie')?.split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${adminCookieName}=`))
    ?.slice(adminCookieName.length + 1)

  if (!token || !getSessionSecret()) return false
  const [expiresAt, signature] = token.split('.')
  if (!expiresAt || !signature || Number(expiresAt) <= Math.floor(Date.now() / 1000)) return false

  const expected = sign(expiresAt)
  const actualBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expected)
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer)
}

export function sessionCookie(value: string, maxAge = sessionDurationSeconds) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  return `${adminCookieName}=${value}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${secure}`
}
