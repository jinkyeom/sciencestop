import { Link } from 'react-router-dom'
import { useState } from 'react'
console.log('✅ 최신 ArticleCard 로드');

interface ArticleCardProps {
  title: string
  category: string
  slug: string
  imageQuery?: string
  thumbnail?: string
  shape?: 'circle' | 'rounded'
}

export default function ArticleCard({ title, category, slug, imageQuery, thumbnail, shape = 'circle' }: ArticleCardProps) {
  const fallbackImage = `https://source.unsplash.com/400x300/?${imageQuery || category.toLowerCase()}`
  const [imgSrc] = useState(thumbnail || fallbackImage)
  const [imgError, setImgError] = useState(false)

  const imageClass = shape === 'circle'
    ? 'w-14 h-14 rounded-full'
    : 'w-28 h-20 rounded-lg'

  const placeholder = (
    <div className={`${imageClass} flex items-center justify-center bg-gradient-to-br from-teal-400 to-blue-500 text-white font-bold text-xs select-none mb-2`}>
      {category.charAt(0)}
    </div>
  )

  return (
    <Link 
      to={`/article/${slug}`} 
      className="group flex flex-col items-center justify-center text-center w-max transform hover:-translate-y-1 transition-transform duration-300"
    >
      {/* Image / Placeholder */}
      {imgError ? (
        placeholder
      ) : (
        <div className={`${imageClass} overflow-hidden mb-2 ring-1 ring-gray-200 dark:ring-gray-700 group-hover:ring-blue-500 group-hover:ring-2 transition-all duration-300 shadow-md`}>
          <img
            src={imgSrc}
            alt={title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}

      {/* 제목 + 카테고리 (아주 작은 글씨) */}
      <div className="space-y-1 text-center">
        <h3 className="text-[11px] font-medium text-gray-900 dark:text-white max-w-[90px] line-clamp-2">
          {title}
        </h3>
        <span className="inline-block text-[9px] px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          {category}
        </span>
      </div>
    </Link>
  )
} 