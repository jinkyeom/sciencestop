import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import PostPage from './pages/PostPage'
import "./index.css" // Tailwind CSS import

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <main className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/article/:slug" element={<PostPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
