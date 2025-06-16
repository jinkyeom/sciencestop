import { useParams } from 'react-router-dom'
import Hero from '../components/Hero'
import ArticleCard from '../components/ArticleCard'

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

// 임시 데이터 생성 함수
function generateArticles(category: string) {
  return Array.from({ length: 6 }, (_, i) => ({
    title: `${category} 관련 글 ${i + 1}`,
    excerpt: `${category}에 대한 흥미로운 발견과 연구 내용을 소개합니다...`,
    category: category,
    slug: `${category.toLowerCase()}-article-${i + 1}`,
    imageQuery: `${category.toLowerCase()}-science-${i + 1}`
  }))
}

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>()
  const koreanCategoryName = category ? categoryNameMap[category as keyof typeof categoryNameMap] : ''
  const description = category ? categoryDescriptions[category as keyof typeof categoryDescriptions] || '' : ''
  const articles = generateArticles(koreanCategoryName || '일반')

  return (
    <div className="min-h-screen">
      <Hero
        category={koreanCategoryName}
        title={`${koreanCategoryName} 카테고리`}
        description={description}
      />
      
      <main className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-16 -mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {articles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
} 