import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Search, MapPin, Wind, Droplets, Clock, CloudSun } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { useWeather } from '../hooks/useWeather';

export default function WeatherSection(): React.ReactElement {
  const [searchInput, setSearchInput] = useState<string>('');
  const [city, setCity] = useState<string>(() => localStorage.getItem('lastSearchedCity') || 'London');
  const [lastUpdated, setLastUpdated] = useState<string>('Just now');
  
  const debouncedSearch = useDebounce<string>(searchInput, 500);
  const { data: weather, loading, error } = useWeather(city);

  useEffect(() => {
    if (debouncedSearch.trim() && debouncedSearch !== city) {
      setCity(debouncedSearch.trim());
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (weather) {
      setLastUpdated('Just now');
      const interval = setInterval(() => {
        setLastUpdated(prev => {
          if (prev === 'Just now') return '1 min ago';
          const match = prev.match(/(\d+)/);
          if (match) return `${parseInt(match[1]) + 1} mins ago`;
          return prev;
        });
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [weather]);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
    }
  };

  return (
    <div className="w-full relative">
      <div className="flex items-end justify-between border-b-2 border-gray-300 dark:border-dark-border pb-4 mb-8">
        <h2 className="font-display text-4xl font-black tracking-tight text-gray-900 dark:text-white drop-shadow-sm flex items-center gap-4">
          <CloudSun className="w-8 h-8 text-gray-900 dark:text-white dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] animate-pulse" />
          Current Weather
        </h2>
        {weather && !loading && (
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-brand font-bold dark:drop-shadow-[0_0_5px_rgba(93,173,226,0.3)]">
            <Clock className="w-5 h-5" />
            <span>{lastUpdated}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-center justify-between w-full">
        {/* Search Input */}
        <div className="w-full lg:w-1/3">
          <form onSubmit={handleSearchSubmit} className="relative group">
            <div className="relative flex items-center w-full bg-gray-50 dark:bg-dark-surface border-b-2 border-gray-300 dark:border-dark-border focus-within:border-gray-900 dark:focus-within:border-brand dark:focus-within:drop-shadow-[0_0_15px_rgba(93,173,226,0.4)] transition-all duration-300">
              <Search className="absolute left-3 w-5 h-5 text-gray-400 group-focus-within:text-gray-900 dark:group-focus-within:text-brand transition-colors duration-300" />
              <input
                type="text"
                value={searchInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
                placeholder="Enter city name..."
                className="w-full bg-transparent py-3 pl-10 pr-4 text-base focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 font-sans tracking-wide"
              />
            </div>
          </form>
          {error && !loading && (
            <div className="mt-4 text-red-500 text-base font-display tracking-wider drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
              ERROR: {error}
            </div>
          )}
        </div>

        {/* Weather Stats */}
        <div className="w-full lg:w-2/3 flex flex-col sm:flex-row gap-10 sm:items-center justify-end">
          {loading ? (
            <div className="flex gap-10 w-full justify-end animate-pulse">
              <div className="h-20 w-40 bg-gray-100 dark:bg-dark-surface rounded"></div>
              <div className="h-20 w-32 bg-gray-100 dark:bg-dark-surface rounded"></div>
            </div>
          ) : weather && !error ? (
            <>
              {/* Main Temp */}
              <div className="flex items-center gap-5">
                <span className="font-display font-bold text-6xl md:text-7xl tracking-tight text-gray-900 dark:text-brand dark:drop-shadow-[0_0_15px_rgba(93,173,226,0.3)] leading-none">
                  {Math.round(weather.main.temp)}°
                </span>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-brand uppercase text-xs font-bold tracking-widest mb-1">
                    <MapPin className="w-4 h-4 dark:drop-shadow-[0_0_5px_rgba(93,173,226,0.4)]" />
                    <span>{weather.name}, {weather.sys.country}</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900 dark:text-gray-100 capitalize font-display tracking-wide">
                    {weather.weather[0].description}
                  </span>
                </div>
              </div>

              {/* Secondary Stats */}
              <div className="flex gap-8 border-l-2 border-gray-300 dark:border-brand/40 pl-8">
                <div className="flex flex-col gap-1 group hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-brand uppercase text-xs font-bold tracking-widest">
                    <Droplets className="w-4 h-4 dark:drop-shadow-[0_0_5px_rgba(93,173,226,0.4)]" />
                    Humidity
                  </div>
                  <span className="font-display font-bold text-3xl text-gray-900 dark:text-white dark:drop-shadow-sm">
                    {weather.main.humidity}%
                  </span>
                </div>
                <div className="flex flex-col gap-1 group hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-brand uppercase text-xs font-bold tracking-widest">
                    <Wind className="w-4 h-4 dark:drop-shadow-[0_0_5px_rgba(93,173,226,0.4)]" />
                    Wind
                  </div>
                  <span className="font-display font-bold text-3xl text-gray-900 dark:text-white dark:drop-shadow-sm">
                    {weather.wind.speed}m/s
                  </span>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
