import type { FC } from 'react'

interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => start + i)

const Pagination: FC<PaginationProps> = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null
  const pagesToShow = 5
  let start = Math.max(1, page - Math.floor(pagesToShow / 2))
  let end = start + pagesToShow - 1
  if (end > totalPages) {
    end = totalPages
    start = Math.max(1, end - pagesToShow + 1)
  }

  return (
    <nav className="flex justify-center mt-8 space-x-2 text-sm">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="px-2 py-1 rounded border dark:border-gray-600 disabled:opacity-40"
      >
        ← 이전
      </button>
      {range(start, end).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1 rounded border dark:border-gray-600 ${p === page ? 'bg-indigo-600 text-white' : ''}`}
        >
          {p}
        </button>
      ))}
      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="px-2 py-1 rounded border dark:border-gray-600 disabled:opacity-40"
      >
        다음 →
      </button>
    </nav>
  )
}

export default Pagination 