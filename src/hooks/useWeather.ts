import { useState, useEffect } from 'react';
import { fetchWeatherByCity } from '../services/weatherApi';
import { WeatherData } from '../types/weather';

interface UseWeatherReturn {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export function useWeather(city: string): UseWeatherReturn {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) {
      setData(null);
      setError(null);
      return;
    }

    // Check cache
    const cacheKey = `weather_${city.toLowerCase()}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data: cachedData, timestamp } = JSON.parse(cached) as { data: WeatherData; timestamp: number };
      // Cache valid for 30 minutes
      if (Date.now() - timestamp < 30 * 60 * 1000) {
        setData(cachedData);
        setError(null);
        return;
      }
    }

    const getWeather = async (): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchWeatherByCity(city);
        setData(result);
        localStorage.setItem(cacheKey, JSON.stringify({ data: result, timestamp: Date.now() }));
        localStorage.setItem('lastSearchedCity', city);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch weather';
        setError(message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, [city]);

  return { data, loading, error };
}
