import Hero from '../components/Hero'
import ArticleCard from '../components/ArticleCard'
import { posts, getPostBody } from '../lib/posts'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import { Link } from 'react-router-dom'
import Pagination from '../components/Pagination'

export default function Home() {
  // 가장 처음 발행한 포스트(리스트의 마지막 요소)
  const pinnedPost = posts[posts.length - 1]
  const postsPerPage = 6
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(posts.length / postsPerPage)
  const paginated = posts.slice((page - 1) * postsPerPage, page * postsPerPage)
  const [pinnedBody, setPinnedBody] = useState('')

  useEffect(() => {
    if (pinnedPost) {
      getPostBody(pinnedPost.slug).then(setPinnedBody)
    }
  }, [pinnedPost])

  return (
    <>
      <div className="relative">
        <Hero
          title="과학의 발견, 지식의 여정"
          description="우주, 뇌, 생명, AI, 수학을 아우르는 과학 이야기"
          isHome={true}
        />
      </div>

      {/* Hero 바로 아래 첫 포스팅 표시 */}
      <section className="relative z-30 isolate pt-12 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            최신 글
          </h2>

          {paginated && (
            <div className="flex flex-wrap justify-center gap-2">
              {paginated.map((post) => (
                <ArticleCard
                  key={post.slug}
                  title={post.title}
                  category={post.categories?.[0] || post.category || ''}
                  slug={post.slug}
                  imageQuery="science"
                  thumbnail={post.thumbnail as string | undefined}
                  showCategory={false}
                />
              ))}
            </div>
          )}

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </section>

      {/* 첫 포스트(가장 오래된 글) 본문 고정 섹션 */}
      {pinnedBody && (
        <section className="relative z-30 isolate pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose lg:prose-lg mx-auto max-w-4xl bg-[#dcd5ff]/40 dark:bg-transparent rounded-xl px-6 sm:px-10 py-6 lg:py-8">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
                rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings, rehypeKatex]}
                components={{
                  h2: (props) => (
                    <h2
                      {...props}
                      className="mt-10 mb-4 text-3xl leading-tight font-extrabold"
                    />
                  ),
                  h3: (props) => (
                    <h3
                      {...props}
                      className="mt-8 mb-3 text-2xl leading-snug font-bold"
                    />
                  ),
                  strong: (props) => (
                    <strong
                      {...props}
                      className="font-bold"
                    />
                  ),
                  em: (props) => (
                    <em
                      {...props}
                      className="italic"
                    />
                  ),
                  /* eslint-disable @typescript-eslint/no-explicit-any */
                  li: ({ children, ...props }) => {
                    const extractPlain = (n: unknown): string => {
                      if (typeof n === 'string') return n
                      if (Array.isArray(n)) return n.map(extractPlain).join('')
                      if (typeof n === 'object' && n !== null && 'props' in (n as any)) {
                        const c = (n as any).props?.children
                        if (c) return extractPlain(c)
                      }
                      return ''
                    }
                    const plain = extractPlain(children)
                    if (/^\[?\d{2}:\d{2}\]?/.test(plain)) {
                      return (
                        <li data-timestamp className="list-none" {...props}>
                          {children}
                        </li>
                      )
                    }
                    return <li {...props}>{children}</li>
                  },
                  /* eslint-enable @typescript-eslint/no-explicit-any */
                }}
              >
                {pinnedBody}
              </ReactMarkdown>

              {/* 홈 하단 포스트 네비게이션 */}
              <hr className="mt-16 mb-8" />
              <HomeNavigator currentSlug={pinnedPost.slug} />
            </div>
          </div>
        </section>
      )}
    </>
  )
}

/* --- 홈 네비게이터 --- */
function HomeNavigator({ currentSlug }: { currentSlug: string }) {
  const index = posts.findIndex((p) => p.slug === currentSlug)
  const next = index > 0 ? posts[index - 1] : null // 더 최신 글

  return (
    <nav className="flex justify-end text-sm">
      {next && (
        <Link to={`/article/${next.slug}`} className="text-blue-500 hover:text-blue-700 whitespace-nowrap">
          {next.title} →
        </Link>
      )}
    </nav>
  )
} 