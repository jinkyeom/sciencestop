import Hero from '../components/Hero'
import ArticleCard from '../components/ArticleCard'

// 임시 데이터
const featuredArticles = [
  {
    title: '제임스웹 망원경이 포착한 우주의 신비',
    category: '우주',
    slug: 'james-webb-universe',
    imageQuery: 'space-telescope-galaxy'
  },
  {
    title: '뇌의 가소성: 평생 학습의 비밀',
    category: '뇌',
    slug: 'brain-plasticity',
    imageQuery: 'neuron-synapse'
  },
  {
    title: '생명의 기원: RNA 세계 가설',
    category: '생명',
    slug: 'rna-world',
    imageQuery: 'dna-molecule'
  },
  {
    title: 'GPT-4의 출현과 AI의 미래',
    category: 'AI',
    slug: 'gpt4-future',
    imageQuery: 'artificial-intelligence'
  },
  {
    title: '수학으로 보는 자연의 패턴',
    category: '수학',
    slug: 'math-nature-patterns',
    imageQuery: 'fibonacci-spiral'
  }
]

export default function Home() {
  return (
    <>
      <div className="relative">
        <Hero
          title="과학의 발견, 지식의 여정"
          description="우주, 뇌, 생명, AI, 수학을 아우르는 과학 이야기"
          isHome={true}
        />
      </div>
      
      {/* Hero 섹션 아래로 자연스럽게 이어지는 최신 과학 이야기 섹션 */}
      <section className="relative bg-white dark:bg-gray-900 mt-[90vh] pt-12 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            최신 과학 이야기
          </h2>
          
          <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto pb-4">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
} 