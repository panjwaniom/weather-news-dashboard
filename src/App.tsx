import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import WeatherSection from './components/WeatherSection';
import NewsSection from './components/NewsSection';

function App(): React.ReactElement {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) as boolean : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen p-4 md:p-8 selection:bg-brand selection:text-black bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-10 pb-5 opacity-0 animate-crazy-slide-fade">
        <h1 className="font-display font-normal text-5xl md:text-6xl text-gray-900 dark:text-brand drop-shadow-[0_0_10px_rgba(93,173,226,0.3)]">
          Weather Dashboard
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-brand transition-all duration-300 p-2 hover:scale-125 hover:rotate-12 dark:hover:drop-shadow-[0_0_8px_rgba(93,173,226,0.5)]"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <Sun className="w-8 h-8" /> : <Moon className="w-8 h-8" />}
        </button>
      </header>

      <main className="max-w-7xl mx-auto flex flex-col gap-16 opacity-0 animate-crazy-slide-fade" style={{ animationDelay: '150ms' }}>
        <section className="w-full">
          <WeatherSection />
        </section>
        <section className="w-full">
          <NewsSection />
        </section>
      </main>
    </div>
  );
}

export default App;
