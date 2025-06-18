import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 p-2 rounded-full !bg-transparent dark:!bg-transparent text-teal-600 dark:text-teal-400 hover:!bg-gray-700/20 dark:hover:!bg-gray-200/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <ArrowUp size={20} className="text-teal-600 dark:text-teal-400" />
    </button>
  )
} 