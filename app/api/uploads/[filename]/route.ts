import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const imageTypes: Record<string, string> = {
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
}

export async function GET(_request: Request, context: RouteContext<'/api/uploads/[filename]'>) {
  const { filename } = await context.params
  if (!/^[0-9a-f-]{36}\.(jpg|png|webp|gif)$/i.test(filename)) {
    return NextResponse.json({ message: 'Ảnh không hợp lệ.' }, { status: 400 })
  }

  try {
    const imagePath = path.join(process.cwd(), 'public', 'images', 'uploads', filename)
    const image = await readFile(imagePath)
    const extension = path.extname(filename).slice(1).toLowerCase()

    return new Response(new Uint8Array(image), {
      headers: {
        'Content-Type': imageTypes[extension],
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch {
    return NextResponse.json({ message: 'Không tìm thấy ảnh.' }, { status: 404 })
  }
}
