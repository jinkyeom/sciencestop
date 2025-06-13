import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import "./index.css"; // Tailwind CSS import

const categories = ["우주", "뇌", "생명", "AI", "수학"];

function Sidebar({ setCategory }: { setCategory: (cat: string) => void }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="w-60 bg-gray-100 dark:bg-gray-900 p-4 h-screen">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-4 text-sm text-gray-600 dark:text-gray-300"
      >
        {collapsed ? "카테고리 열기" : "카테고리 접기"}
      </button>
      {!collapsed && (
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <NavLink
                to={`/category/${cat}`}
                onClick={() => setCategory(cat)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`
                }
              >
                {cat}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [, setCategory] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white">
      <Sidebar setCategory={setCategory} />
      <div className="flex-1 p-6">
        <div className="flex justify-end mb-4">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Home() {
  return <div>과학 정류장에 오신 것을 환영합니다!</div>;
}

function CategoryPage({ name }: { name: string }) {
  return <div className="text-lg">📂 {name} 카테고리의 글 목록</div>;
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {categories.map((cat) => (
            <Route key={cat} path={`/category/${cat}`} element={<CategoryPage name={cat} />} />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
}
