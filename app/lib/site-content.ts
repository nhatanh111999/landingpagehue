import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { del, get, put } from '@vercel/blob'
import { type SiteContent } from '../content/default-content'
import seedContent from '../../data/site-content.json'

const contentFile = path.join(process.cwd(), 'data', 'site-content.json')
const contentBlobPath = 'site-content.json'

export function hasBlobStorage() {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN
    || (process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN)
  )
}

function isVercelDeployment() {
  return process.env.VERCEL === '1'
}

async function readFileSeed(): Promise<SiteContent> {
  try {
    return JSON.parse(await readFile(contentFile, 'utf8')) as SiteContent
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
    return seedContent as SiteContent
  }
}

export async function readSiteContent(): Promise<SiteContent> {
  if (hasBlobStorage()) {
    const blob = await get(contentBlobPath, { access: 'public', useCache: false })
    if (blob?.stream) {
      return JSON.parse(await new Response(blob.stream).text()) as SiteContent
    }
    return readFileSeed()
  }

  if (isVercelDeployment()) return readFileSeed()

  return readFileSeed()
}

export async function writeSiteContent(content: SiteContent) {
  if (hasBlobStorage()) {
    await put(contentBlobPath, JSON.stringify(content), {
      access: 'public',
      allowOverwrite: true,
      cacheControlMaxAge: 60,
      contentType: 'application/json; charset=utf-8',
    })
    return
  }

  if (isVercelDeployment()) {
    throw new Error('Vercel Blob chưa được kết nối. Hãy tạo Blob Store và thêm BLOB_READ_WRITE_TOKEN hoặc kết nối OIDC với BLOB_STORE_ID.')
  }

  await mkdir(path.dirname(contentFile), { recursive: true })
  await writeFile(contentFile, `${JSON.stringify(content, null, 2)}\n`, 'utf8')
}

function collectUploadedImages(value: unknown, filenames = new Set<string>()) {
  if (typeof value === 'string') {
    const localPattern = /\/(?:api\/uploads|images\/uploads|uploads)\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(?:jpg|jpeg|png|webp|gif))(?:[?#]|$)/gi
    const blobPattern = /https:\/\/[^/]+\.public\.blob\.vercel-storage\.com\/(uploads\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(?:jpg|jpeg|png|webp|gif))(?:[?#]|$)/gi
    for (const match of value.matchAll(localPattern)) filenames.add(match[1])
    for (const match of value.matchAll(blobPattern)) filenames.add(match[0])
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
    if (filename.startsWith('https://')) {
      if (hasBlobStorage()) {
        try {
          await del(filename)
        } catch (error) {
          console.error(`Không thể xóa ảnh Blob cũ:`, error)
        }
      }
      return
    }

    try {
      await unlink(path.join(uploadDirectory, filename))
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        console.error(`Không thể xóa ảnh upload cũ ${filename}:`, error)
      }
    }
  }))
}
