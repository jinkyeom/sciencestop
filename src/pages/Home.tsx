import Hero from '../components/Hero'
import ArticleCard from '../components/ArticleCard'
import { posts, getPostBody } from '../lib/posts'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
// @ts-expect-error - no types for remark-breaks
import remarkBreaks from 'remark-breaks'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

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
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings]}
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