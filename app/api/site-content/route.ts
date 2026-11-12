import { NextResponse } from 'next/server'
import { isValidAdminSession } from '../../lib/admin-auth'
import { readSiteContent, removeOrphanedUploads, writeSiteContent } from '../../lib/site-content'
import type { SiteContent } from '../../content/default-content'

export const runtime = 'nodejs'

export async function GET() {
  try {
    return NextResponse.json(await readSiteContent())
  } catch {
    return NextResponse.json({ message: 'Không thể đọc nội dung trang.' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  if (!isValidAdminSession(request)) {
    return NextResponse.json({ message: 'Bạn cần đăng nhập lại.' }, { status: 401 })
  }

  try {
    const content = await request.json() as SiteContent
    const valid = content && typeof content === 'object'
      && content.hero && content.story
      && Array.isArray(content.collections)
      && Array.isArray(content.samplePhotos)
      && Array.isArray(content.locations)
      && Array.isArray(content.packages)
      && Array.isArray(content.processSteps)
      && Array.isArray(content.reviews)

    if (!valid) {
      return NextResponse.json({ message: 'Dữ liệu không đúng cấu trúc trang.' }, { status: 400 })
    }

    const previousContent = await readSiteContent()
    await writeSiteContent(content)
    await removeOrphanedUploads(previousContent, content)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ message: 'Không thể lưu nội dung trang.' }, { status: 400 })
  }
}
