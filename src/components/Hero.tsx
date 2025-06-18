import { useEffect, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import spaceImage from '../assets/space.jpg'
import brainImage from '../assets/brain.png'
import lifeImage from '../assets/life.jpg'
import aiImage from '../assets/ai.jpg'
import mathImage from '../assets/math.jpg'

interface HeroProps {
  category?: string;
  title: string;
  description?: string;
  isHome?: boolean;
}

const categoryImages: Record<string, string> = {
  '홈': spaceImage,
  '우주': spaceImage,
  '뇌': brainImage,
  '생명': lifeImage,
  'AI': aiImage,
  '수학': mathImage,
}

const categories = [
  { name: '우주', query: 'space-astronomy-telescope', emoji: '🌌' },
  { name: '뇌', query: 'neuroscience-brain-research', emoji: '🧠' },
  { name: '생명', query: 'biology-microscope-cell', emoji: '🧬' },
  { name: 'AI', query: 'artificial-intelligence-robot', emoji: '🤖' },
  { name: '수학', query: 'mathematics-formula-geometry', emoji: '📐' }
]

export default function Hero({ category, title, description, isHome = false }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % categories.length)
  }, [])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length)
  }, [])

  useEffect(() => {
    if (isHome) {
      const interval = setInterval(goToNext, 5000)
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') goToNext()
        if (e.key === 'ArrowLeft') {
          setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length)
        }
      }
      
      window.addEventListener('keydown', handleKeyDown)

      return () => {
        clearInterval(interval)
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isHome, goToNext])

  const currentCategory = categories[currentIndex]
  const imageUrl = isHome ? categoryImages[currentCategory.name] : categoryImages[category || '홈']

  return (
    <div
      className="relative w-full overflow-hidden bg-white dark:bg-gray-900"
      style={{
        height: '100svh',
        minHeight: '100svh',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 밝기 보정: 라이트 모드에서는 사진을 70 % 흰색 + screen 블렌드로 더 밝게,
         다크 모드에서는 기존보다 살짝 어둡게 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none
                   bg-white/90 mix-blend-screen
                   dark:bg-black/20 dark:mix-blend-normal" />
      
      <div
        className={`relative h-full flex flex-col items-center text-center px-4 ${
          isHome ? 'justify-start pt-[12vh]' : 'justify-center pt-0 md:pt-0'
        }`}>
        {/* 좌우 네비게이션 버튼 (홈에서만 표시) */}
        {isHome && (
          <>
            <button
              onClick={goToPrev}
              aria-label="이전 카테고리"
              className="absolute top-1/2 left-4 -translate-y-1/2 text-white hover:text-blue-300 transition-colors focus:outline-none !bg-transparent !border-none"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={goToNext}
              aria-label="다음 카테고리"
              className="absolute top-1/2 right-4 -translate-y-1/2 text-white hover:text-blue-300 transition-colors focus:outline-none !bg-transparent !border-none"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
        <div className="max-w-4xl mx-auto pt-16">
          {isHome ? (
            <>
              <h1 className="font-title text-2xl md:text-3xl lg:text-5xl font-bold text-white force-white mb-8 leading-tight tracking-tight [text-shadow:_0_2px_4px_rgba(0,0,0,0.9)]" style={{color:'#ffffff'}}>
                🔭 <span className="text-[#d1c7ff]">과학정류장</span>에 오신 걸 환영합니다! 🔬
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-100 mb-12 leading-relaxed max-w-3xl mx-auto [text-shadow:_0_2px_4px_rgba(0,0,0,0.8)] font-medium">
                우주, 뇌, 생명 등 흥미로운 과학 콘텐츠를 큐레이션합니다.
              </p>
              {/* Category Indicators */}
              <div className="absolute bottom-24 left-0 right-0 flex items-center justify-center gap-4">
                {categories.map((cat, idx) => (
                  <span
                    key={cat.name}
                    role="button"
                    tabIndex={0}
                    onClick={() => setCurrentIndex(idx)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setCurrentIndex(idx)}
                    className={`cursor-pointer w-2 h-2 rounded-full outline-none transition-transform ${
                      currentIndex === idx
                        ? 'bg-purple-400 scale-150'
                        : 'bg-gray-400/70'
                    }`}
                    aria-label={`${cat.name} 보기`}
                  />
                ))}
              </div>
              {/* Current Category Label */}
              <div className="absolute bottom-16 left-0 right-0 text-center text-base font-medium text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                {currentCategory.emoji} {currentCategory.name}
              </div>
            </>
          ) : (
            <>
              {category && (
                <span className="inline-block px-6 py-2 mb-6 rounded-full bg-blue-500/80 text-white text-lg font-medium transform hover:scale-105 transition-transform [text-shadow:_0_2px_4px_rgba(0,0,0,0.8)]">
                  {category}
                </span>
              )}
              <h1 className="font-title text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-6 leading-tight [text-shadow:_0_2px_6px_rgba(0,0,0,0.95)]" style={{color:'#fff'}}>
                {title}
              </h1>
              {description && (
                <p className="text-lg md:text-xl font-semibold text-gray-100 leading-relaxed max-w-2xl mx-auto [text-shadow:_0_2px_5px_rgba(0,0,0,0.85)]">
                  {description}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
} 