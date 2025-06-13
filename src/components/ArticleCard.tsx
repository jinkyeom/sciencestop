import { Link } from 'react-router-dom'

interface ArticleCardProps {
  title: string
  excerpt: string
  category: string
  slug: string
  imageQuery?: string
}

export default function ArticleCard({ title, excerpt, category, slug, imageQuery }: ArticleCardProps) {
  const image = `https://source.unsplash.com/400x300/?${imageQuery || category.toLowerCase()}`

  return (
    <Link to={`/article/${slug}`} className="group">
      <article className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              {category}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {excerpt}
          </p>
        </div>
      </article>
    </Link>
  )
} 