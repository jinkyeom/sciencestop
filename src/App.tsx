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
  const heroUrl = "https://source.unsplash.com/1600x900/?science,technology";
  return (
    <section
      className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-lg"
      style={{ backgroundImage: `url(${heroUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">과학 정류장에 오신 것을 환영합니다!</h1>
      </div>
    </section>
  );
}

const categoryQuery: Record<string, string> = {
  "우주": "space",
  "뇌": "brain",
  "생명": "biology",
  AI: "artificial-intelligence",
  "수학": "mathematics",
};

function CategoryPage({ name }: { name: string }) {
  const query = categoryQuery[name] || "science";
  const images = Array.from({ length: 6 }, (_, i) => `https://source.unsplash.com/600x400/?${query}&sig=${i}`);
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">📂 {name} 카테고리</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((src, idx) => (
          <div key={idx} className="relative overflow-hidden rounded-lg shadow-md group">
            <img src={src} alt={`${name} 이미지 ${idx + 1}`} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
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
