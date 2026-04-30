import { useState, useEffect } from 'react';
import { fetchNewsByCategory } from '../services/newsApi';
import { NewsArticle } from '../types/news';

interface NewsCacheEntry {
  data: NewsArticle[];
  timestamp: number;
}

// Simple in-memory cache for news
const newsCache = new Map<string, NewsCacheEntry>();

interface UseNewsReturn {
  data: NewsArticle[] | null;
  loading: boolean;
  error: string | null;
}

export function useNews(category: string): UseNewsReturn {
  const [data, setData] = useState<NewsArticle[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category) return;

    if (newsCache.has(category)) {
      const { data: cachedData, timestamp } = newsCache.get(category)!;
      // Cache valid for 15 minutes
      if (Date.now() - timestamp < 15 * 60 * 1000) {
        setData(cachedData);
        setError(null);
        return;
      }
    }

    const getNews = async (): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchNewsByCategory(category);
        setData(result);
        newsCache.set(category, { data: result, timestamp: Date.now() });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch news';
        setError(message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [category]);

  return { data, loading, error };
}
