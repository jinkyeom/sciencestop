import { useLocation, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function Header() {
  const location = useLocation()
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark'
    setDarkMode(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    document.documentElement.classList.toggle('dark', newMode)
    localStorage.setItem('theme', newMode ? 'dark' : 'light')
  }

  const menuItems = [
    { title: '과학정류장', href: '/' },
    { title: '우주', href: '/category/space' },
    { title: '뇌', href: '/category/brain' },
    { title: '생명', href: '/category/life' },
    { title: 'AI', href: '/category/ai' },
    { title: '수학', href: '/category/math' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
      <div className="text-xl font-bold text-gray-900 dark:text-white">
        <Link to="/">과학정류장</Link>
      </div>
      <nav className="flex items-center gap-6">
        <ul className="flex gap-4 text-sm font-medium text-gray-700 dark:text-gray-300">
          {menuItems.slice(1).map((item) => {
            const isActive = location.pathname.startsWith(item.href)
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`hover:text-blue-500 dark:hover:text-blue-400 ${
                    isActive ? 'underline font-bold text-blue-600 dark:text-blue-400' : ''
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          className="ml-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>
    </header>
  )
} 