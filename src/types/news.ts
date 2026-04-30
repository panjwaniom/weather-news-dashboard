export interface NewsArticle {
  title: string;
  url: string;
  urlToImage?: string;
  source: {
    name: string;
  };
}

export interface NewsApiResponse {
  status: string;
  message?: string;
  articles: NewsArticle[];
}
