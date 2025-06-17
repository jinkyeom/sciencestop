import { useLocation, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'

export default function Header() {
  const location = useLocation()
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hideHeader, setHideHeader] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const isDark = stored === 'dark'
    setDarkMode(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  // 스크롤 방향에 따라 헤더 숨김/표시
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const current = window.scrollY
      const diff = current - lastY
      if (current > 120 && diff > 0) {
        setHideHeader(true)
      } else if (diff < 0) {
        setHideHeader(false)
      }
      lastY = current
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
    const isDark = document.documentElement.classList.contains('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    setDarkMode(isDark)
  }

  const menuItems = [
    { title: '우주', href: '/category/space' },
    { title: '뇌', href: '/category/brain' },
    { title: '생명', href: '/category/life' },
    { title: 'AI', href: '/category/ai' },
    { title: '수학', href: '/category/math' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-300 ${hideHeader ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="flex justify-between items-start p-4 gap-2">
        {/* 좌측 로고/타이틀 */}
        <Link to="/" className="text-xl font-bold !text-purple-300 hover:!text-purple-400 dark:!text-purple-300 dark:hover:!text-purple-400 transition-colors hidden md:block">
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
                      ? 'text-purple-300 bg-purple-900/20'
                      : '!text-white hover:!text-purple-300 hover:bg-gray-700/40'
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
            className="p-2 rounded-full !bg-transparent !border-none hover:bg-gray-700/30 dark:hover:bg-gray-700 transition-colors"
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
              className="p-2 rounded-md text-gray-200 dark:text-gray-300 !bg-transparent !border-none hover:bg-gray-700/30 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            {mobileMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-24 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-2 z-50">
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
                            ? 'text-purple-300 bg-purple-900/20'
                            : '!text-white hover:!text-purple-300 hover:bg-gray-700/40'
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