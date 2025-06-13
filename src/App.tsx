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
        <ul className="space-y-2 list-none p-0">
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
  const heroUrl = "https://source.unsplash.com/random/1920x1080/?galaxy,science";
  return (
    <div className="space-y-12">
      <section className="relative h-[70vh] w-full overflow-hidden rounded-b-3xl shadow-lg">
        <img src={heroUrl} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            과학 정류장
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 max-w-2xl">
            우주, 뇌, 생명, AI, 수학 등 최신 과학 이야기를 한 곳에서 만나보세요.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">카테고리</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat} name={cat} />
          ))}
        </div>
      </section>
    </div>
  );
}

const categoryQuery: Record<string, string> = {
  "우주": "space",
  "뇌": "brain",
  "생명": "biology",
  AI: "artificial-intelligence",
  "수학": "mathematics",
};

function CategoryCard({ name }: { name: string }) {
  const query = categoryQuery[name] || "science";
  const src = `https://source.unsplash.com/random/600x400/?${query}&sig=${name}`;
  return (
    <NavLink
      to={`/category/${name}`}
      className="relative group rounded-xl overflow-hidden shadow-lg"
    >
      <img
        src={src}
        alt={name}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
      <h3 className="absolute inset-x-0 bottom-0 p-4 text-xl font-semibold text-white drop-shadow-md">
        {name}
      </h3>
    </NavLink>
  );
}

function CategoryPage({ name }: { name: string }) {
  const query = categoryQuery[name] || "science";
  const heroSrc = `https://source.unsplash.com/1600x600/?${query}`;
  const images = Array.from({ length: 6 }, (_, i) => `https://source.unsplash.com/600x400/?${query}&sig=${i}`);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = `https://via.placeholder.com/600x400?text=${encodeURIComponent(name)}`;
  };

  return (
    <div className="space-y-8">
      {/* Hero banner */}
      <div className="relative h-56 md:h-72 w-full overflow-hidden rounded-2xl shadow-lg">
        <img src={heroSrc} alt={`${name} hero`} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">📂 {name} 카테고리</h2>
        </div>
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((src, idx) => (
          <div key={idx} className="relative overflow-hidden rounded-lg shadow-md group">
            <img
              src={src}
              alt={`${name} 이미지 ${idx + 1}`}
              onError={handleImgError}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
