import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { isValidAdminSession } from '../../../lib/admin-auth'
import { hasBlobStorage } from '../../../lib/site-content'

export const runtime = 'nodejs'

const allowedTypes: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
}

export async function POST(request: Request) {
  if (!isValidAdminSession(request)) {
    return NextResponse.json({ message: 'Bạn cần đăng nhập lại.' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file')
    if (!(file instanceof File) || !allowedTypes[file.type] || file.size > 8 * 1024 * 1024) {
      return NextResponse.json({ message: 'Chỉ nhận ảnh JPG, PNG, WebP hoặc GIF tối đa 8 MB.' }, { status: 400 })
    }

    const fileName = `${randomUUID()}${allowedTypes[file.type]}`

    if (hasBlobStorage()) {
      const blob = await put(`uploads/${fileName}`, file, {
        access: 'public',
        contentType: file.type,
      })
      return NextResponse.json({ url: blob.url })
    }

    if (process.env.VERCEL === '1') {
      return NextResponse.json({ message: 'Vercel Blob chưa được kết nối. Hãy kết nối Blob Store với project trước khi upload ảnh.' }, { status: 503 })
    }

    const uploadDirectory = path.join(process.cwd(), 'public', 'images', 'uploads')
    await mkdir(uploadDirectory, { recursive: true })
    await writeFile(path.join(uploadDirectory, fileName), Buffer.from(await file.arrayBuffer()))

    return NextResponse.json({ url: `/api/uploads/${fileName}` })
  } catch (error) {
    console.error('Lỗi upload ảnh:', error)
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Không thể tải ảnh lên.' }, { status: 500 })
  }
}
