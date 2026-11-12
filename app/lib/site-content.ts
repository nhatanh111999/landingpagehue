import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { defaultContent, type SiteContent } from '../content/default-content'

const contentFile = path.join(process.cwd(), 'data', 'site-content.json')

export async function readSiteContent(): Promise<SiteContent> {
  try {
    return JSON.parse(await readFile(contentFile, 'utf8')) as SiteContent
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
    return defaultContent
  }
}

export async function writeSiteContent(content: SiteContent) {
  await mkdir(path.dirname(contentFile), { recursive: true })
  await writeFile(contentFile, `${JSON.stringify(content, null, 2)}\n`, 'utf8')
}

function collectUploadedImages(value: unknown, filenames = new Set<string>()) {
  if (typeof value === 'string') {
    const pattern = /\/(?:api\/uploads|images\/uploads|uploads)\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(?:jpg|jpeg|png|webp|gif))(?:[?#]|$)/gi
    for (const match of value.matchAll(pattern)) filenames.add(match[1])
  } else if (Array.isArray(value)) {
    value.forEach((item) => collectUploadedImages(item, filenames))
  } else if (value && typeof value === 'object') {
    Object.values(value).forEach((item) => collectUploadedImages(item, filenames))
  }

  return filenames
}

export async function removeOrphanedUploads(previous: SiteContent, next: SiteContent) {
  const stillUsed = collectUploadedImages(next)
  const noLongerUsed = [...collectUploadedImages(previous)].filter((filename) => !stillUsed.has(filename))
  const uploadDirectory = path.join(process.cwd(), 'public', 'images', 'uploads')

  await Promise.all(noLongerUsed.map(async (filename) => {
    try {
      await unlink(path.join(uploadDirectory, filename))
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        console.error(`Không thể xóa ảnh upload cũ ${filename}:`, error)
      }
    }
  }))
}
