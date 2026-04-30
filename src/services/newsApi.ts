import { NewsArticle, NewsApiResponse } from '../types/news';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNewsByCategory = async (category: string): Promise<NewsArticle[]> => {
  if (!API_KEY) {
    throw new Error('News API key is missing. Check .env file.');
  }

  const response = await fetch(
    `${BASE_URL}/top-headlines?country=us&category=${category.toLowerCase()}&apiKey=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch news data');
  }

  const data: NewsApiResponse = await response.json();
  if (data.status === 'error') {
    throw new Error(data.message || 'News API Error');
  }

  return data.articles;
};
