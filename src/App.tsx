import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTopButton from './components/ScrollToTopButton'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import PostPage from './pages/PostPage'
import ScrollToTop from './components/ScrollToTop'
import "./index.css" // Tailwind CSS import

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      const el = document.querySelector('.min-h-screen');
      if (el) el.scrollTop = 0;
    }, 200);
  }, [pathname]);
  return null;
}

export default function App() {
  // 다크모드 로직은 Header 컴포넌트에서 모두 처리하므로 여기서 관련 로직을 제거합니다.

  return (
    <Router>
      {/* 이 div에서 배경색 및 글자색 관련 클래스를 제거하여 html, body의 스타일을 상속받게 합니다. */}
      <div>
        <ScrollToTopOnRouteChange />
        <ScrollToTop />
        <Header />
        <main className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/article/:slug" element={<PostPage />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </Router>
  )
}
