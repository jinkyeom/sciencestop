import matter from 'gray-matter'
import { Buffer } from 'buffer'

if (typeof globalThis !== 'undefined' && !(globalThis as { Buffer?: typeof Buffer }).Buffer) {
  ;(globalThis as { Buffer: typeof Buffer }).Buffer = Buffer
}

export interface PostMeta {
  slug: string // 파일명(확장자 제외)
  title: string
  date: string | Date
  categories?: string[]
  category?: string
  tags?: string[]
  summary?: string
  thumbnail?: string
}

// Vite 정적 임포트로 모든 markdown 원본 가져오기
type RawModule = { default: string }

const files = import.meta.glob<RawModule>('/src/posts/**/*.md', { as: 'raw', eager: true })

export const posts: PostMeta[] = Object.entries(files).map(([path, raw]) => {
  const slugMatch = path.match(/\/src\/posts\/(.*).md$/)
  const slug = slugMatch ? slugMatch[1] : path
  const { data } = matter((raw as unknown) as string)
  const meta = data as Omit<PostMeta, 'slug'>
  return {
    slug,
    ...meta
  }
}).sort((a, b) => {
  const toDate = (d?: string | Date) => {
    if (!d) return new Date(0)
    if (d instanceof Date) return d
    const standard = d.trim()
    const parsed = new Date(standard)
    if (!isNaN(parsed.getTime())) return parsed
    // fallback: convert 'YYYY-MM-DD HH:MM:SS' to ISO by replacing space with T
    const iso = standard.replace(' ', 'T') + 'Z'
    return new Date(iso)
  }
  return +toDate(b.date) - +toDate(a.date)
})

// 본문 가져오기
type BodyModule = { default: string }
const bodyMap = import.meta.glob<BodyModule>('/src/posts/**/*.md', { as: 'raw' })

export async function getPostBody(slug: string) {
  const importer = bodyMap[`/src/posts/${slug}.md`]
  if (!importer) return ''
  const mod = await importer()
  const { content } = matter(mod as unknown as string)
  return content
} 