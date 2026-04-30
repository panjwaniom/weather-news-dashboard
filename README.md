# Weather & News Dashboard

A minimalist, high-performance dashboard that centralizes your daily essentials: current weather conditions and top news headlines. Built with a focus on speed and a refined dark-mode aesthetic.

## Tech Stack

- **React 18** — UI logic and component architecture
- **TypeScript** — Type safety and improved developer experience
- **Vite** — Lightning-fast build tool and dev server
- **Tailwind CSS** — Utility-first styling with custom animations
- **Lucide React** — Clean, consistent iconography

## Features

- **Dynamic Weather Search:** Fetch real-time weather data for any city globally
- **Curated News Feed:** Toggle between General, Technology, Sports, and Business headlines
- **Efficient Caching:** Weather data persisted in `localStorage` (30m expiry); news cached in-memory (15m expiry) to keep API usage low
- **Intelligent Search:** Built-in debouncing prevents unnecessary API calls while typing
- **Theme Continuity:** Automatic dark/light mode detection with manual override that persists across sessions
- **Responsive Motion:** Custom Tailwind animations for smooth transitions between tabs and loading states

## Setup & Installation

1. **Clone the repository:**
```bash
   git clone <repository-url>
```

2. **Install dependencies:**
```bash
   npm install
```

3. **Configure environment variables:**
   Create a `.env` file in the root directory:
```env
   VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key
   VITE_NEWS_API_KEY=your_newsapi_org_key
```
   - Weather API: [openweathermap.org/api](https://openweathermap.org/api)
   - News API: [newsapi.org](https://newsapi.org)

## Development

```bash
npm run dev       # Start dev server
npm run build     # Production build
```

## Roadmap

- Multi-city weather tracking with a saved cities sidebar
- Extended 5-day weather forecast view
- Keyword search within news articles
- Maps API integration for visual location tracking
