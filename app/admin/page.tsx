'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertCircle, ArrowLeft, Check, ImagePlus, LogOut, Plus, Save, Trash2, Upload, X } from 'lucide-react'
import Link from 'next/link'
import type { SiteContent } from '../content/default-content'

const sections = [
  { key: 'hero', label: 'Đầu trang' },
  { key: 'story', label: 'Câu chuyện' },
  { key: 'locations', label: 'Địa điểm' },
  { key: 'collections', label: 'Bộ sưu tập' },
  { key: 'samplePhotos', label: 'Album ảnh' },
  { key: 'packages', label: 'Gói chụp' },
  { key: 'processSteps', label: 'Quy trình' },
  { key: 'reviews', label: 'Đánh giá' },
] as const

type SectionKey = typeof sections[number]['key']
type Draft = Record<string, string | boolean>
type ToastMessage = { message: string; type: 'success' | 'error' }

const labels: Record<string, string> = {
  eyebrow: 'Dòng giới thiệu', title: 'Tiêu đề', accentTitle: 'Tiêu đề nhấn', description: 'Mô tả',
  backgroundImage: 'Ảnh nền', quote: 'Trích dẫn', name: 'Tên', category: 'Danh mục', image: 'Ảnh đại diện',
  desc: 'Mô tả', details: 'Chi tiết', model: 'Tên khách hàng', concept: 'Concept',
  relatedImages: 'Ảnh trong album', feature: 'Đặc trưng', price: 'Giá', features: 'Quyền lợi', popular: 'Gói nổi bật',
  step: 'Số thứ tự', author: 'Người đánh giá',
}

const listSections: SectionKey[] = ['locations', 'collections', 'samplePhotos', 'packages', 'processSteps', 'reviews']
const multilineFields = new Set(['description', 'desc', 'details', 'concept', 'feature', 'features', 'relatedImages', 'quote'])

function toDraft(record: Record<string, unknown>): Draft {
  return Object.fromEntries(Object.entries(record).filter(([key]) => key !== 'id').map(([key, value]) => [
    key,
    Array.isArray(value) ? value.join('\n') : typeof value === 'boolean' ? value : String(value ?? ''),
  ])) as Draft
}

function newRecord(section: SectionKey, content: SiteContent): Record<string, unknown> {
  const records = content[section] as unknown as Record<string, unknown>[]
  const id = Math.max(0, ...records.map((record) => Number(record.id) || 0)) + 1
  const templates: Record<string, Record<string, unknown>> = {
    locations: { name: '', image: '', feature: '', concept: '' },
    collections: { id, name: '', category: '', image: '', desc: '', details: '' },
    samplePhotos: { id, title: '', model: '', concept: '', image: '', relatedImages: [] },
    packages: { title: '', price: '', desc: '', features: [], popular: false },
    processSteps: { step: String(records.length + 1).padStart(2, '0'), title: '', desc: '' },
    reviews: { id, quote: '', author: '' },
  }
  return templates[section] ?? {}
}

function isRecordSection(section: SectionKey): section is Exclude<SectionKey, 'hero' | 'story'> {
  return listSections.includes(section)
}

function AdminToast({ toast, onClose }: { toast: ToastMessage; onClose: () => void }) {
  const isError = toast.type === 'error'

  return (
    <div role={isError ? 'alert' : 'status'} aria-live={isError ? 'assertive' : 'polite'} className={`fixed right-4 top-4 z-[100] flex w-80 max-w-[calc(100vw-2rem)] items-center gap-3 border-l-4 bg-white px-4 py-3 shadow-lg ${isError ? 'border-red-700' : 'border-emerald-700'}`}>
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center ${isError ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>
        {isError ? <AlertCircle size={18} /> : <Check size={18} />}
      </span>
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button onClick={onClose} aria-label="Đóng thông báo" className="p-1 text-stone-500 hover:text-stone-900"><X size={16} /></button>
    </div>
  )
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)
  const [password, setPassword] = useState('')
  const [content, setContent] = useState<SiteContent | null>(null)
  const [section, setSection] = useState<SectionKey>('hero')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [draft, setDraft] = useState<Draft>({})
  const [isNew, setIsNew] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [notice, setNotice] = useState('')
  const [toast, setToast] = useState<ToastMessage | null>(null)
  const [localPreview, setLocalPreview] = useState<{ field: string; url: string } | null>(null)
  const newItemRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    if (isNew) newItemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }, [isNew, section])

  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(null), 5000)
    return () => window.clearTimeout(timeout)
  }, [toast])

  useEffect(() => {
    if (!localPreview) return
    return () => URL.revokeObjectURL(localPreview.url)
  }, [localPreview])

  const loadContent = async () => {
    const response = await fetch('/api/site-content', { cache: 'no-store' })
    if (!response.ok) throw new Error('Không tải được nội dung trang.')
    const nextContent = await response.json() as SiteContent
    setContent(nextContent)
    setDraft(toDraft(nextContent.hero))
  }

  useEffect(() => {
    fetch('/api/admin/login').then(async (response) => {
      const result = await response.json()
      if (result.authenticated) {
        setAuthenticated(true)
        await loadContent()
      }
    }).catch(() => setToast({ message: 'Không thể kết nối máy chủ.', type: 'error' })).finally(() => setCheckingSession(false))
  }, [])

  const selectSection = (nextSection: SectionKey) => {
    if (!content) return
    setLocalPreview(null)
    setSection(nextSection)
    setIsNew(false)
    setSelectedIndex(0)
    if (nextSection === 'hero' || nextSection === 'story') {
      setDraft(toDraft(content[nextSection]))
    } else {
      const records = content[nextSection] as unknown as Record<string, unknown>[]
      setDraft(records[0] ? toDraft(records[0]) : {})
    }
  }

  const records = content && isRecordSection(section)
    ? content[section] as unknown as Record<string, unknown>[]
    : []

  const saveDraft = async () => {
    if (!content) return
    setIsSaving(true)
    setNotice('')
    try {
      let updatedContent = { ...content }
      if (isRecordSection(section)) {
        const existing = isNew ? newRecord(section, content) : records[selectedIndex]
        if (!existing) throw new Error('Vui lòng tạo một mục trước khi lưu.')
        const updatedRecord = Object.fromEntries(Object.entries(draft).map(([key, value]) => {
          const original = existing[key]
          if (Array.isArray(original)) return [key, String(value).split('\n').map((item) => item.trim()).filter(Boolean)]
          if (typeof original === 'boolean') return [key, Boolean(value)]
          return [key, value]
        }))
        if ('id' in existing) updatedRecord.id = existing.id
        const updatedRecords = isNew ? [...records, updatedRecord] : records.map((item, index) => index === selectedIndex ? updatedRecord : item)
        updatedContent = { ...content, [section]: updatedRecords } as SiteContent
        if (isNew) setSelectedIndex(updatedRecords.length - 1)
        setIsNew(false)
      } else {
        updatedContent = { ...content, [section]: { ...content[section], ...draft } } as SiteContent
      }

      const response = await fetch('/api/site-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContent),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Không thể lưu nội dung.')
      setContent(updatedContent)
      setToast({ message: 'Đã lưu thay đổi.', type: 'success' })
    } catch (error) {
      setToast({ message: error instanceof Error ? error.message : 'Không thể lưu nội dung.', type: 'error' })
    } finally {
      setIsSaving(false)
    }
  }

  const deleteRecord = async () => {
    if (!content || !isRecordSection(section) || !window.confirm('Xóa mục này khỏi trang?')) return
    setNotice('')
    const updatedRecords = records.filter((_, index) => index !== selectedIndex)
    const updatedContent = { ...content, [section]: updatedRecords } as SiteContent
    try {
      const response = await fetch('/api/site-content', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatedContent),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok) throw new Error(result?.message || 'Không thể xóa mục này.')

      setContent(updatedContent)
      setSelectedIndex(Math.max(0, selectedIndex - 1))
      setDraft(updatedRecords[Math.max(0, selectedIndex - 1)] ? toDraft(updatedRecords[Math.max(0, selectedIndex - 1)]) : {})
      setToast({ message: 'Đã xóa mục.', type: 'success' })
    } catch (error) {
      setToast({ message: error instanceof Error ? error.message : 'Không thể xóa mục này.', type: 'error' })
    }
  }

  const uploadImages = async (files: FileList | null, field: string) => {
    if (!files?.length) return
    if (field === 'image' || field === 'backgroundImage') {
      setLocalPreview({ field, url: URL.createObjectURL(files[0]) })
    }
    setNotice('Đang tải ảnh lên...')
    try {
      const urls: string[] = []
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.set('file', file)
        const response = await fetch('/api/admin/upload', { method: 'POST', body: formData })
        const result = await response.json()
        if (!response.ok) throw new Error(result.message || 'Tải ảnh thất bại.')
        urls.push(result.url)
      }
      setDraft((current) => ({
        ...current,
        [field]: field === 'relatedImages'
          ? `${String(current[field] || '').trim()}${current[field] ? '\n' : ''}${urls.join('\n')}`
          : urls[0],
      }))
      setNotice('')
      setToast({ message: `Đã tải ${urls.length} ảnh lên.`, type: 'success' })
    } catch (error) {
      setNotice('')
      setToast({ message: error instanceof Error ? error.message : 'Tải ảnh thất bại.', type: 'error' })
    }
  }

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNotice('')
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }),
      })
      const result = await response.json()
      if (!response.ok) {
        setToast({ message: result.message || 'Đăng nhập thất bại.', type: 'error' })
        return
      }
      setAuthenticated(true)
      setPassword('')
      await loadContent()
    } catch (error) {
      setToast({ message: error instanceof Error ? error.message : 'Đăng nhập thất bại.', type: 'error' })
    }
  }

  const logout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' })
    setAuthenticated(false)
    setContent(null)
  }

  const selectRecord = (index: number) => {
    setLocalPreview(null)
    setSelectedIndex(index)
    setIsNew(false)
    setDraft(toDraft(records[index]))
  }

  if (checkingSession) return <main className="min-h-screen bg-[#f5f3ed] p-8 text-[#25251f]">Đang kiểm tra phiên đăng nhập...</main>

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#f5f3ed] px-5 py-16 text-[#25251f]">
        {toast && <AdminToast toast={toast} onClose={() => setToast(null)} />}
        <form onSubmit={login} className="mx-auto mt-16 max-w-sm border-t-4 border-[#8b3f2f] bg-white p-8 shadow-sm">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-[#685e50]"><ArrowLeft size={16} /> Về trang chủ</Link>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b3f2f]">ChungCheng Studio</p>
          <h1 className="mb-6 mt-2 font-serif text-3xl">Quản trị nội dung</h1>
          <label className="mb-2 block text-sm font-medium" htmlFor="admin-password">Mật khẩu quản trị</label>
          <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full border border-stone-300 px-3 py-3 outline-none focus:border-[#8b3f2f]" />
          <button type="submit" className="mt-5 w-full bg-[#8b3f2f] px-4 py-3 text-sm font-semibold text-white">Đăng nhập</button>
        </form>
      </main>
    )
  }

  if (!content) return <main className="min-h-screen bg-[#f5f3ed] p-8">Đang tải dữ liệu...</main>

  const selectedRecord = isRecordSection(section) ? records[selectedIndex] : content[section]
  const fields = Object.keys(draft)

  return (
    <main className="min-h-screen bg-[#f5f3ed] text-[#25251f]">
      {toast && <AdminToast toast={toast} onClose={() => setToast(null)} />}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-300 bg-white px-5 py-4 sm:px-8">
        <div>
          <Link href="/" className="text-xs font-medium uppercase tracking-[0.15em] text-[#8b3f2f]">ChungCheng Studio</Link>
          <h1 className="mt-1 text-xl font-semibold">Quản trị nội dung</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank" className="text-sm text-stone-600 underline underline-offset-4">Xem trang</Link>
          <button onClick={logout} className="inline-flex items-center gap-2 text-sm text-stone-600"><LogOut size={16} /> Thoát</button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav className="flex gap-2 overflow-x-auto lg:block lg:space-y-1" aria-label="Các phần nội dung">
          {sections.map((item) => (
            <button key={item.key} onClick={() => selectSection(item.key)} className={`shrink-0 px-3 py-2 text-left text-sm lg:block lg:w-full ${section === item.key ? 'bg-[#8b3f2f] text-white' : 'text-stone-600 hover:bg-white'}`}>
              {item.label}
            </button>
          ))}
        </nav>

        <section className="min-w-0 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-stone-500">Nội dung trang chủ</p>
              <h2 className="mt-1 text-2xl font-semibold">{sections.find((item) => item.key === section)?.label}</h2>
            </div>
            <div className="flex gap-2">
              {isRecordSection(section) && <>
                <button onClick={() => {
                  const record = newRecord(section, content)
                  setIsNew(true)
                  setSelectedIndex(records.length)
                  setDraft(toDraft(record))
                }} className="inline-flex items-center gap-2 border border-stone-300 px-3 py-2 text-sm"><Plus size={16} /> Thêm mục</button>
                {!isNew && selectedRecord && <button onClick={deleteRecord} aria-label="Xóa mục" title="Xóa mục" className="border border-stone-300 p-2 text-[#8b3f2f]"><Trash2 size={17} /></button>}
              </>}
              <button onClick={saveDraft} disabled={isSaving} className="inline-flex items-center gap-2 bg-[#8b3f2f] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"><Save size={16} /> {isSaving ? 'Đang lưu' : 'Lưu thay đổi'}</button>
            </div>
          </div>

          {isRecordSection(section) && <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
            {records.map((record, index) => <button key={String(record.id ?? index)} onClick={() => selectRecord(index)} className={`max-w-56 shrink-0 truncate border px-3 py-2 text-left text-sm ${index === selectedIndex && !isNew ? 'border-[#8b3f2f] text-[#8b3f2f]' : 'border-stone-200 text-stone-600'}`}>
              {String(record.title || record.name || record.step || record.author || `Mục ${index + 1}`)}
            </button>)}
            {isNew && <span ref={newItemRef} aria-current="true" className="shrink-0 border border-[#8b3f2f] bg-[#8b3f2f] px-3 py-2 text-sm font-medium text-white">Mục mới</span>}
          </div>}

          <div className="mt-6 grid gap-x-6 gap-y-5 md:grid-cols-2">
            {fields.map((field) => {
              const isBoolean = typeof draft[field] === 'boolean'
              const isImageField = field === 'image' || field === 'backgroundImage'
              const value = draft[field]
              return <div key={field} className={multilineFields.has(field) || isImageField ? 'md:col-span-2' : ''}>
                {isBoolean ? <label className="flex items-center gap-3 text-sm font-medium">
                  <input type="checkbox" checked={Boolean(value)} onChange={(event) => setDraft({ ...draft, [field]: event.target.checked })} className="h-4 w-4 accent-[#8b3f2f]" />
                  {labels[field] || field}
                </label> : <>
                  <label htmlFor={`field-${field}`} className="mb-2 block text-sm font-medium">{labels[field] || field}</label>
                  {multilineFields.has(field) ? <textarea id={`field-${field}`} rows={field === 'relatedImages' || field === 'features' ? 5 : 4} value={String(value ?? '')} onChange={(event) => setDraft({ ...draft, [field]: event.target.value })} className="w-full resize-y border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-[#8b3f2f]" /> : <input id={`field-${field}`} value={String(value ?? '')} onChange={(event) => setDraft({ ...draft, [field]: event.target.value })} className="w-full border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-[#8b3f2f]" />}
                  {isImageField && <div className="mt-2 flex flex-wrap items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 border border-stone-300 px-3 py-2 text-xs"><ImagePlus size={15} /> Tải ảnh lên<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="sr-only" onChange={(event) => uploadImages(event.target.files, field)} /></label>
                    {value && <img src={localPreview?.field === field ? localPreview.url : String(value)} alt="Xem trước" className="h-16 w-24 object-cover" />}
                  </div>}
                  {field === 'relatedImages' && <label className="mt-2 inline-flex cursor-pointer items-center gap-2 border border-stone-300 px-3 py-2 text-xs"><Upload size={15} /> Tải nhiều ảnh lên<input type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif" className="sr-only" onChange={(event) => uploadImages(event.target.files, field)} /></label>}
                  {field === 'features' && <p className="mt-1 text-xs text-stone-500">Mỗi quyền lợi nhập trên một dòng.</p>}
                  {field === 'relatedImages' && <p className="mt-1 text-xs text-stone-500">Mỗi ảnh một dòng. Có thể dùng đường dẫn /images/... hoặc URL ảnh.</p>}
                </>}
              </div>
            })}
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-stone-200 pt-4">
            <p aria-live="polite" className="text-sm text-stone-600">{notice}</p>
          </div>
        </section>
      </div>
    </main>
  )
}
