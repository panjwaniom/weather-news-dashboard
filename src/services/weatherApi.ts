import { WeatherData } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new Error('OpenWeather API key is missing. Check .env file.');
  }

  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found');
    }
    throw new Error('Failed to fetch weather data');
  }

  return response.json();
};
