import { NextResponse } from 'next/server'
import { createAdminSession, isValidAdminSession, sessionCookie } from '../../../lib/admin-auth'

export async function GET(request: Request) {
  return NextResponse.json({ authenticated: isValidAdminSession(request) })
}

export async function POST(request: Request) {
  const password = process.env.ADMIN_PASSWORD
  if (!password) {
    return NextResponse.json({ message: 'Chưa cấu hình ADMIN_PASSWORD trên máy chủ.' }, { status: 503 })
  }

  try {
    const body = await request.json()
    if (typeof body.password !== 'string' || body.password !== password) {
      return NextResponse.json({ message: 'Mật khẩu không chính xác.' }, { status: 401 })
    }

    const response = NextResponse.json({ authenticated: true })
    response.headers.set('Set-Cookie', sessionCookie(createAdminSession()))
    return response
  } catch {
    return NextResponse.json({ message: 'Yêu cầu không hợp lệ.' }, { status: 400 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false })
  response.headers.set('Set-Cookie', sessionCookie('', 0))
  return response
}
