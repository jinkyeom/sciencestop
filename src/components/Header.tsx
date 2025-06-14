import { useLocation, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'

export default function Header() {
  const location = useLocation()
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setDarkMode(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const menuItems = [
    { title: '홈', href: '/' },
    { title: '우주', href: '/category/space' },
    { title: '뇌', href: '/category/brain' },
    { title: '생명', href: '/category/life' },
    { title: 'AI', href: '/category/ai' },
    { title: '수학', href: '/category/math' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none">
      <div className="flex justify-between items-start p-4 gap-2 pointer-events-auto">
        {/* 좌측 로고/타이틀 */}
        <Link to="/" className="text-xl font-bold text-white dark:text-gray-200 hover:text-blue-400 dark:hover:text-blue-300 transition-colors hidden md:block">
          과학정류장
        </Link>
        {/* 우측 메뉴/토글 */}
        <div className="flex items-center gap-2 ml-auto">
          {/* 데스크탑 메뉴 */}
          <nav className="hidden md:flex items-center gap-2">
            {menuItems.map((item) => {
              const isActive = item.href === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-lg font-bold transition-colors ${
                    isActive
                      ? 'text-blue-400 bg-blue-900/20'
                      : '!text-white hover:!text-blue-300 hover:bg-gray-700/40'
                  }`}
                >
                  {item.title}
                </Link>
              )
            })}
          </nav>

          {/* 다크 모드 토글 */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full hover:bg-gray-700/30 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-white" />
            ) : (
              <Moon className="w-5 h-5 text-white" />
            )}
          </button>

          {/* 모바일 햄버거 메뉴 */}
          <div className="md:hidden relative">
            <button
              className="p-2 rounded-md text-gray-200 dark:text-gray-300 hover:bg-gray-700/30 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            {mobileMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-2 z-50">
                <nav className="flex flex-col gap-1">
                  {menuItems.map((item) => {
                    const isActive = item.href === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(item.href)
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`block px-3 py-2 rounded-md text-lg font-bold transition-colors ${
                          isActive
                            ? 'text-blue-400 bg-blue-900/20'
                            : '!text-white hover:!text-blue-300 hover:bg-gray-700/40'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 