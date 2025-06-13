import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import "./index.css"; // Tailwind CSS import
import { motion } from "framer-motion";

const categories = ["우주", "뇌", "생명", "AI", "수학"];

// Persisted dark mode hook
function useDarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return [darkMode, setDarkMode] as const;
}

function Header({ toggleDark, dark }: { toggleDark: () => void; dark: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <NavLink to="/" className="text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 dark:from-blue-400 dark:to-teal-300 whitespace-nowrap">
          🔬 과학정류장
        </NavLink>

        <div className="flex items-center space-x-4">
          {/* Category dropdown */}
          <div className="relative">
            <button onClick={() => setOpen((p) => !p)} className="text-sm font-medium text-gray-700 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none">
              카테고리
            </button>
            {open && (
              <ul className="absolute left-0 top-full mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 border border-gray-200 dark:border-gray-700">
                {categories.map((c) => (
                  <li key={c}>
                    <NavLink
                      to={`/category/${c}`}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {c}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Dark toggle */}
          <button onClick={toggleDark} aria-label="Theme Toggle" className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
      © 2025 과학정류장 – All rights reserved.
    </footer>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div className="flex flex-col min-h-screen pt-14 bg-white dark:bg-gray-950 text-black dark:text-white">
      <Header toggleDark={() => setDarkMode(!darkMode)} dark={darkMode} />
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Home() {
  const heroImg = `https://picsum.photos/seed/hero${Date.now() % 1000}/1920/1080`;
  return (
    <section className="relative -mt-14 h-screen w-full overflow-hidden">
      <img src={heroImg} alt="hero" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-28 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg">
            🔬 과학정류장에 오신 걸 환영합니다!
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto">
            우주, 뇌, 생명 등 흥미로운 과학 콘텐츠를 큐레이션합니다.
          </p>
        </motion.div>
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
  const heroSrc = `https://picsum.photos/seed/${query}-banner/1600/600`;
  const images = Array.from({ length: 6 }, (_, i) => `https://picsum.photos/seed/${query}-${i}/600/400`);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const seed = Math.floor(Math.random() * 1000);
    e.currentTarget.src = `https://picsum.photos/seed/${seed}/600/400`;
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
