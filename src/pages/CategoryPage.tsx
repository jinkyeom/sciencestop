import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import ArticleCard from '../components/ArticleCard'
import { posts, getPostBody, type PostMeta } from '../lib/posts'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import { Link } from 'react-router-dom'

const categoryDescriptions = {
  space: '무한한 우주의 신비를 탐험하는 여정',
  brain: '인간 뇌의 복잡성과 의식의 비밀',
  life: '지구 생명의 다양성과 진화의 이야기',
  ai: '인공지능이 여는 새로운 시대',
  math: '자연을 이해하는 수학적 언어'
}

const categoryNameMap = {
  space: '우주',
  brain: '뇌',
  life: '생명',
  ai: 'AI',
  math: '수학'
}

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>()
  const koreanCategoryName = category ? categoryNameMap[category as keyof typeof categoryNameMap] : ''
  const description = category ? categoryDescriptions[category as keyof typeof categoryDescriptions] || '' : ''

  // 실제 포스트 중 해당 카테고리에 포함되는 글 추출 (최신순)
  const categoryPosts = posts.filter((p) => {
    const list = p.categories || (p.category ? [p.category] : [])
    return list?.includes(koreanCategoryName)
  })

  const latestTwo = categoryPosts.slice(0, 2)
  const firstPost = latestTwo[0]
  const [body, setBody] = useState('')

  useEffect(() => {
    if (firstPost) {
      getPostBody(firstPost.slug).then(setBody)
    }
  }, [firstPost])

  return (
    <div className="min-h-screen">
      <Hero
        category={koreanCategoryName}
        title={`${koreanCategoryName} 카테고리`}
        description={description}
      />

      <main className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-16 -mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* 최신 글 2개 카드 */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {latestTwo.map((post) => (
              <ArticleCard
                key={post.slug}
                title={post.title}
                category={koreanCategoryName}
                slug={post.slug}
                imageQuery="space"
                showCategory={false}
              />
            ))}
          </div>

          {/* 최신 글 본문 */}
          {body && (
            <div className="post-content category-content prose dark:prose-invert lg:prose-lg mx-auto max-w-4xl">
              <h2 className="text-center mb-6 font-extrabold text-3xl">{firstPost?.title}</h2>
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
                  )
                }}
              >
                {body}
              </ReactMarkdown>

              {/* 카테고리 내 이전/다음 글 네비게이션 */}
              <hr className="mt-16 mb-8" />
              {firstPost && (
                <CategoryNavigator currentSlug={firstPost.slug} posts={categoryPosts} />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

/* --- 카테고리 전용 네비게이션 --- */
function CategoryNavigator({ currentSlug, posts }: { currentSlug: string; posts: PostMeta[] }) {
  const index = posts.findIndex((p: PostMeta) => p.slug === currentSlug)
  const prev = index > 0 ? posts[index - 1] : null
  const next = index < posts.length - 1 ? posts[index + 1] : null

  return (
    <nav className="flex justify-between text-sm">
      {next ? (
        <Link
          to={`/article/${next.slug}`}
          className="text-blue-500 hover:text-blue-700 whitespace-nowrap"
          onClick={() => {
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 0);
          }}
        >
          ← {next.title}
        </Link>
      ) : <span />}

      {prev ? (
        <Link
          to={`/article/${prev.slug}`}
          className="text-blue-500 hover:text-blue-700 whitespace-nowrap text-right"
          onClick={() => {
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 0);
          }}
        >
          {prev.title} →
        </Link>
      ) : <span />}
    </nav>
  )
} 