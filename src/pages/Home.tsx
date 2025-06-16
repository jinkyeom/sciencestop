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
import React from 'react'

export default function Home() {
  const firstPost = posts[0]
  console.log('posts', posts)
  const [firstBody, setFirstBody] = useState('')

  useEffect(() => {
    if (firstPost) {
      getPostBody(firstPost.slug).then(setFirstBody)
    }
  }, [firstPost])

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
      <section className="relative bg-white dark:bg-gray-900 pt-12 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            최신 글
          </h2>

          {firstPost && (
            <div className="flex justify-center">
              <ArticleCard
                title={firstPost.title}
                category={firstPost.categories?.[0] || firstPost.category || ''}
                slug={firstPost.slug}
                imageQuery="universe,galaxy,space"
                shape="rounded"
                thumbnail={firstPost.thumbnail as string | undefined}
              />
            </div>
          )}
        </div>
      </section>

      {/* 첫 포스트 본문 고정 섹션 */}
      {firstBody && (
        <section className="relative bg-white dark:bg-gray-900 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose dark:prose-invert lg:prose-lg mx-auto max-w-4xl">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
                rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings, rehypeKatex]}
                components={{
                  h2: (props) => (
                    <h2
                      {...props}
                      className="mt-10 mb-4 text-3xl leading-tight font-extrabold text-white"
                    />
                  ),
                  h3: (props) => (
                    <h3
                      {...props}
                      className="mt-8 mb-3 text-2xl leading-snug font-bold text-white"
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
                        <li data-timestamp className="timestamp-li list-none" {...props}>
                          {children}
                        </li>
                      )
                    }
                    return <li {...props}>{children}</li>
                  },
                  /* eslint-enable @typescript-eslint/no-explicit-any */
                }}
              >
                {firstBody}
              </ReactMarkdown>
            </div>
          </div>
        </section>
      )}
    </>
  )
} 