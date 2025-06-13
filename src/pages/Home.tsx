import Hero from '../components/Hero'
import ArticleCard from '../components/ArticleCard'

// 임시 데이터
const featuredArticles = [
  {
    title: '제임스웹 망원경이 포착한 우주의 신비',
    excerpt: '가장 멀리 있는 은하들의 모습을 통해 우주 초기의 비밀을 풀어냅니다.',
    category: '우주',
    slug: 'james-webb-universe',
    imageQuery: 'space-telescope-galaxy'
  },
  {
    title: '뇌의 가소성: 평생 학습의 비밀',
    excerpt: '시냅스 가소성이 학습과 기억에 미치는 영향을 탐구합니다.',
    category: '뇌',
    slug: 'brain-plasticity',
    imageQuery: 'neuron-synapse'
  },
  {
    title: '생명의 기원: RNA 세계 가설',
    excerpt: 'DNA 이전, RNA가 생명의 시작을 어떻게 이끌었는지 살펴봅니다.',
    category: '생명',
    slug: 'rna-world',
    imageQuery: 'dna-molecule'
  },
  {
    title: 'GPT-4의 출현과 AI의 미래',
    excerpt: '대규모 언어 모델이 가져올 기술과 사회의 변화를 전망합니다.',
    category: 'AI',
    slug: 'gpt4-future',
    imageQuery: 'artificial-intelligence'
  },
  {
    title: '수학으로 보는 자연의 패턴',
    excerpt: '피보나치 수열과 황금비가 자연계에서 나타나는 방식을 분석합니다.',
    category: '수학',
    slug: 'math-nature-patterns',
    imageQuery: 'fibonacci-spiral'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Hero
        title="과학의 발견, 지식의 여정"
        description="우주, 뇌, 생명, AI, 수학을 아우르는 과학 이야기"
      />
      
      <main className="container mx-auto px-4 py-12 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          최신 과학 이야기
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      </main>
    </div>
  )
} 