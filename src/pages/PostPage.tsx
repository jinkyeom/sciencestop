import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { posts, getPostBody } from '../lib/posts'
import { Link } from 'react-router-dom'

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [body, setBody] = useState<string>('')
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const articleRef = useRef<HTMLElement>(null)
  const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>([])
  const [activeId, setActiveId] = useState<string>('')

  // 타임스탬프 [MM:SS] 패턴을 링크로 변환
  const processedBody = useMemo(() => {
    return body.replace(/\[([0-9]{2}):([0-9]{2})\]/g, (_match, mm, ss) => {
      const total = parseInt(mm, 10) * 60 + parseInt(ss, 10)
      return `[${mm}:${ss}](#t${total})`
    })
  }, [body])

  useEffect(() => {
    if (slug) {
      getPostBody(slug).then(setBody)
    }
  }, [slug])

  // 본문이 로드된 뒤 목차 추출
  useEffect(() => {
    // 디바운스하여 DOM 갱신 후 실행
    const timer = setTimeout(() => {
      if (articleRef.current) {
        const headings = Array.from(
          articleRef.current.querySelectorAll('h2, h3')
        ) as HTMLHeadingElement[]
        const list = headings.map((el) => ({
          id: el.id,
          text: el.textContent || '',
          level: el.tagName === 'H2' ? 2 : 3
        }))
        setToc(list)
        // scrollspy 등록
        const onScroll = () => {
          const headingsPos = list.map((item) => {
            const el = document.getElementById(item.id)
            if (!el) return { id: item.id, top: Infinity }
            return { id: item.id, top: el.getBoundingClientRect().top }
          })

          // 맨 아래 근접 여부 먼저 확인
          const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
          let idToSet: string | undefined

          if (atBottom) {
            idToSet = list[list.length - 1]?.id
          } else {
            const candidate = headingsPos
              .filter((h) => h.top <= 120 && h.top >= 0)
              .sort((a, b) => b.top - a.top)[0]
            idToSet = candidate?.id
          }

          if (idToSet && idToSet !== activeId) {
            setActiveId(idToSet)
          }
        }
        window.addEventListener('scroll', onScroll)
        onScroll() // 초기 설정
        return () => window.removeEventListener('scroll', onScroll)
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [processedBody])

  // 한글 자막 강제 적용 (YouTube IFrame API)
  useEffect(() => {
    if (!iframeRef.current) return
    const timer = setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({
          event: 'command',
          func: 'setOption',
          args: ['captions', 'track', { languageCode: 'ko' }]
        }),
        '*'
      )
    }, 2000) // 플레이어 로드 이후 약간의 지연
    return () => clearTimeout(timer)
  }, [processedBody])

  if (!slug) return <div className="p-8">잘못된 경로입니다.</div>

  const meta = posts.find((p) => p.slug === slug)
  if (!meta) return <div className="p-8">글을 찾을 수 없습니다.</div>

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 pt-32 flex gap-8">
      <article
        ref={articleRef}
        className="prose dark:prose-invert lg:prose-lg flex-1 post-content"
      >
        <h1 className="mt-0 mb-4 text-2xl md:text-3xl font-extrabold leading-tight">{meta.title}</h1>
        <p className="text-sm opacity-70 mb-6">
          {meta.date instanceof Date ? meta.date.toLocaleDateString('ko-KR') : meta.date}
          {meta.tags && meta.tags.length > 0 && (
            <> · {meta.tags.join(', ')}</>
          )}
        </p>

        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings, rehypeKatex]}
          components={{
            iframe: (props) => {
              let src = props.src as string
              if (src && !src.includes('enablejsapi')) {
                const join = src.includes('?') ? '&' : '?'
                src += `${join}enablejsapi=1&cc_load_policy=1&cc_lang_pref=ko&hl=ko`
              }
              const isCosmicCalendar = meta?.slug === "2025-06-17-cosmic-calendar";
              return (
                <iframe
                  ref={iframeRef}
                  {...props}
                  src={src}
                  className={isCosmicCalendar ? "w-full aspect-[9/16]" : "w-full aspect-video"}
                />
              );
            },
            a: ({ href, children, ...props }) => {
              if (href && href.startsWith('#t')) {
                const sec = parseInt(href.replace('#t', ''), 10)
                const seek = () => {
                  iframeRef.current?.contentWindow?.postMessage(
                    JSON.stringify({ event: 'command', func: 'seekTo', args: [sec, true] }),
                    '*'
                  )
                }
                return (
                  <span
                    role="link"
                    tabIndex={0}
                    onClick={seek}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') seek() }}
                    className="cursor-pointer text-blue-500 underline hover:text-blue-700"
                  >
                    {children}
                  </span>
                )
              }
              return <a href={href} {...props}>{children}</a>
            },
            li: ({ children, ...props }) => {
              const extractPlain = (n: unknown): string => {
                if (typeof n === 'string') return n
                if (Array.isArray(n)) return n.map(extractPlain).join('')
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (typeof n === 'object' && n !== null && 'props' in (n as any)) {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            )
          }}
        >
          {processedBody}
        </ReactMarkdown>

        {/* 이전/다음 글 네비게이션 */}
        <hr className="mt-16 mb-8" />
        <PostNavigator currentSlug={slug} />
      </article>

      {/* 목차 */}
      {toc.length > 0 && (
        <aside className="hidden xl:block w-64">
          <div className="sticky top-24">
            <h2 className="text-sm font-bold mb-3 text-center">목차</h2>
            <ul className="space-y-1 text-sm">
              {toc.map((item) => (
                <li key={item.id} className={item.level === 3 ? 'ml-4' : ''}>
                  <a
                    href={`#${item.id}`}
                    className={`block px-2 py-0.5 rounded no-underline transition-colors ${
                      activeId === item.id
                        ? 'bg-teal-500 !text-white'
                        : 'text-gray-500 visited:text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:visited:text-gray-400 dark:hover:text-white'
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </div>
  )
}

/* --- 하단 네비게이션 컴포넌트 --- */
function PostNavigator({ currentSlug }: { currentSlug: string }) {
  const index = posts.findIndex((p) => p.slug === currentSlug)
  const prev = index > 0 ? posts[index - 1] : null // 최신 글이 앞에 위치
  const next = index < posts.length - 1 ? posts[index + 1] : null // 오래된 글

  return (
    <nav className="flex justify-between text-sm">
      {next ? (
        <Link
          to={`/article/${next.slug}`}
          className="text-blue-500 hover:text-blue-700 block whitespace-nowrap"
        >
          ← {next.title}
        </Link>
      ) : <span />}

      {prev ? (
        <Link
          to={`/article/${prev.slug}`}
          className="text-blue-500 hover:text-blue-700 block text-right whitespace-nowrap"
        >
          {prev.title} →
        </Link>
      ) : <span />}
    </nav>
  )
} 