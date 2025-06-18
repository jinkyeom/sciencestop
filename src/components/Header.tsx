import { useLocation, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'

export default function Header() {
  const location = useLocation()
  // document.documentElement.classList.contains('dark')가 true일 때 다크모드
  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark')
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hideHeader, setHideHeader] = useState(false)

  // 초기 테마 설정 및 OS 테마 변경 감지
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    // localStorage에 저장된 테마가 있으면 그것을 따르고, 없으면 OS 설정을 따름
    const initialDarkMode = storedTheme ? storedTheme === 'dark' : prefersDark
    setDarkMode(initialDarkMode)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      // 사용자가 수동으로 테마를 설정하지 않았을 경우에만 OS 설정을 따름
      if (localStorage.getItem('theme') === null) {
        setDarkMode(mediaQuery.matches)
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // darkMode 상태가 변경될 때마다 HTML 태그의 class와 localStorage를 업데이트
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

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
    setDarkMode(prev => !prev)
  }

  const menuItems = [
    { title: '우주', href: '/category/space' },
    { title: '뇌', href: '/category/brain' },
    { title: '생명', href: '/category/life' },
    { title: 'AI', href: '/category/ai' },
    { title: '수학', href: '/category/math' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 w-full z-[9999] transition-transform duration-300 ${hideHeader ? '-translate-y-full' : 'translate-y-0'}`} style={{overflow: 'visible'}}>
      <div className="flex justify-between items-center py-4 px-2 md:px-4 gap-2 w-full">
        {/* 좌측 로고/타이틀 */}
        <Link
          to="/"
          className="font-title text-1xl md:text-2xl lg:text-3xl font-bold !text-[#d1c7ff] hover:!text-purple-400 dark:!text-[#d1c7ff] dark:hover:!text-purple-300 transition-colors block [text-shadow:_0_2px_4px_rgba(0,0,0,0.6)]">
          과학정류장
        </Link>
        {/* 우측 컨트롤: flex row, 항상 같은 위치 */}
        <div className="flex items-center gap-0 ml-auto pr-0 justify-end">
          {/* 다크 모드 토글: 항상 렌더링, md 이상/미만 모두 */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="p-2 rounded-md !bg-transparent text-gray-800 dark:text-gray-100 hover:bg-gray-700/20 dark:hover:bg-gray-200/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 transition-colors m-0"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-blue-500" />
            )}
          </button>
          {/* 햄버거 메뉴: md 이상에서 숨김, md 미만에서만 보임 */}
          <button
            className="p-2 rounded-md text-gray-800 dark:text-gray-300 !bg-transparent md:hidden m-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-gray-800 dark:text-gray-300" /> : <Menu className="w-6 h-6 text-gray-800 dark:text-gray-300" />}
          </button>
        </div>
        {/* 데스크탑 메뉴: md 이상에서만 보임 */}
        <nav className="hidden md:flex items-center gap-2 ml-4">
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
                    : 'text-gray-800 dark:text-white hover:!text-purple-300 hover:bg-gray-700/40'
                }`}
              >
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>
      {/* 모바일 메뉴 오버레이: md 미만에서만, 햄버거 메뉴 열렸을 때 */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute top-16 right-0 w-1/4 min-w-[80px] max-w-xs bg-white dark:bg-gray-900 rounded-lg shadow-lg p-2" onClick={e => e.stopPropagation()}>
            <nav className="flex flex-col gap-1 text-center">
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
                        : 'text-gray-800 dark:!text-white hover:!text-purple-300 hover:bg-gray-700/40'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
} 