import React, { useState, SyntheticEvent } from 'react';
import { Newspaper } from 'lucide-react';
import { useNews } from '../hooks/useNews';

const CATEGORIES: string[] = ['General', 'Technology', 'Sports', 'Business'];

export default function NewsSection(): React.ReactElement {
  const [activeCategory, setActiveCategory] = useState<string>('General');
  const { data: news, loading, error } = useNews(activeCategory);

  return (
    <div className="w-full relative">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b-2 border-gray-300 dark:border-dark-border pb-4 mb-8 gap-6">
        <h2 className="font-display text-4xl font-bold tracking-tight text-gray-900 dark:text-white drop-shadow-sm flex items-center gap-4">
          <Newspaper className="w-8 h-8 text-gray-900 dark:text-white dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] hover:rotate-12 transition-transform duration-300" />
          Headlines
        </h2>
        
        <div className="flex flex-wrap gap-x-6 gap-y-3 w-full lg:w-auto">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`text-lg font-display tracking-wide transition-all duration-300 uppercase pb-1 border-b-4 hover:-translate-y-1 ${
                activeCategory === category
                  ? 'text-gray-900 border-gray-900 dark:text-brand dark:border-brand dark:drop-shadow-[0_0_10px_rgba(93,173,226,0.5)] scale-110 origin-bottom'
                  : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-brand dark:hover:drop-shadow-[0_0_8px_rgba(93,173,226,0.3)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div key={activeCategory} className="animate-tab-switch">
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <div key={n} className="flex flex-col gap-3">
                <div className="w-full aspect-video bg-gray-100 dark:bg-dark-surface animate-pulse border border-gray-200 dark:border-dark-border"></div>
                <div className="h-4 bg-gray-100 dark:bg-dark-surface w-full animate-pulse"></div>
                <div className="h-4 bg-gray-100 dark:bg-dark-surface w-2/3 animate-pulse"></div>
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="text-red-500 text-lg font-display tracking-wider p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/10 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
            ERROR: {error}
          </div>
        )}

        {news && !loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {news.filter(article => article.title && article.title !== '[Removed]').slice(0, 12).map((article, index) => (
              <a
                key={`${article.url}-${index}`}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-4 cursor-pointer hover:scale-[1.05] hover:z-10 transition-all duration-300 dark:hover:shadow-[0_0_20px_rgba(93,173,226,0.2)] bg-white dark:bg-dark-surface border border-transparent dark:hover:border-brand/40 rounded-lg overflow-hidden"
              >
                <div className="w-full aspect-video overflow-hidden bg-gray-100 dark:bg-black relative">
                  {article.urlToImage ? (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e: SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display text-gray-300 dark:text-gray-800 text-3xl tracking-widest group-hover:text-brand transition-colors duration-500">
                      NEWS
                    </div>
                  )}
                  {/* Aggressive hover overlay */}
                  <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/20 mix-blend-overlay transition-colors duration-300"></div>
                </div>
                
                <div className="flex flex-col p-4 pt-0">
                  <span className="text-[12px] font-display font-bold text-brand tracking-widest mb-2 drop-shadow-[0_0_3px_rgba(93,173,226,0.4)] group-hover:scale-105 origin-left transition-transform duration-300">
                    {article.source.name}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-[#EAEAEA] leading-snug group-hover:text-brand transition-colors line-clamp-3 font-sans">
                    {article.title}
                  </h3>
                </div>
              </a>
            ))}
            {news.length === 0 && (
              <div className="col-span-full text-gray-500 text-xl font-display tracking-wider py-8">
                No news found for this category.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
