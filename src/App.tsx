import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import "./index.css"; // Tailwind CSS import
import { motion } from "framer-motion";

const categories = ["우주", "뇌", "생명", "AI", "수학"];

function Sidebar({ setCategory }: { setCategory: (cat: string) => void }) {
  return (
    <div className="w-56 bg-gray-100 dark:bg-gray-900 p-4 h-screen">
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
    </div>
  );
}

// Persisted dark mode hook
function useDarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return [darkMode, setDarkMode] as const;
}

function Header({ toggleDark, dark }: { toggleDark: () => void; dark: boolean }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <NavLink to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">과학정류장</NavLink>
        <nav className="hidden md:flex space-x-4">
          {categories.map((c) => (
            <NavLink key={c} to={`/category/${c}`} className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
              {c}
            </NavLink>
          ))}
        </nav>
        <button onClick={toggleDark} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800">
          {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useDarkMode();
  const [, setCategory] = useState("");

  return (
    <div className="flex min-h-screen pt-14 bg-white dark:bg-gray-950 text-black dark:text-white">
      <Header toggleDark={() => setDarkMode(!darkMode)} dark={darkMode} />
      <Sidebar setCategory={setCategory} />
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

function Home() {
  const heroUrl = `https://picsum.photos/seed/hero${Date.now()%1000}/1920/1080`;
  return (
    <div className="space-y-12">
      <motion.section
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[70vh] w-full overflow-hidden rounded-b-3xl shadow-lg"
      >
        <motion.img
          src={heroUrl}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 flex flex-col items-center justify-center text-center p-4">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg"
          >
            과학 정류장
          </motion.h1>
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl text-gray-200 max-w-2xl"
          >
            우주, 뇌, 생명, AI, 수학 등 최신 과학 이야기를 한 곳에서 만나보세요.
          </motion.p>
        </div>
      </motion.section>

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
  const src = `https://picsum.photos/seed/${query}-${name}/600/400`;
  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      <NavLink
        to={`/category/${name}`}
        className="relative group rounded-xl overflow-hidden shadow-lg"
      >
        <motion.img
          src={src}
          alt={name}
          className="w-full h-48 object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
        <h3 className="absolute inset-x-0 bottom-0 p-4 text-xl font-semibold text-white drop-shadow-md">
          {name}
        </h3>
      </NavLink>
    </motion.div>
  );
}

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
