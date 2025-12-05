import { useMemo } from 'react';

// Custom hook for WeatherCard logic
export const useWeatherCard = (weatherData) => {
  // Format temperature with proper rounding
  const formattedTemp = useMemo(() => {
    if (!weatherData) return null;
    return Math.round(weatherData.temperature);
  }, [weatherData]);

  // Get weather icon based on condition
  const getWeatherIcon = useMemo(() => {
    if (!weatherData) return null;
    
    const condition = weatherData.weather_main.toLowerCase();
    
    const iconMap = {
      clear: '☀️',
      clouds: '☁️',
      rain: '🌧️',
      drizzle: '🌦️',
      thunderstorm: '⛈️',
      snow: '❄️',
      mist: '🌫️',
      fog: '🌫️',
      haze: '🌫️',
    };
    
    return iconMap[condition] || '🌤️';
  }, [weatherData]);

  return {
    formattedTemp,
    getWeatherIcon,
  };
};
