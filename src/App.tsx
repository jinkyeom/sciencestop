import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import "./index.css" // Tailwind CSS import

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        <div className="pt-16"> {/* Header 높이만큼 상단 여백 */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<CategoryPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
