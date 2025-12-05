import { useState, useEffect } from 'react';
import weatherApi from '../../service/weatherApi';

/**
 * Custom hook for CurrentWeather page logic
 * Fetches and manages current weather data
 */
export const useCurrentWeather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  // Fetch current weather data from API
  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await weatherApi.getCurrentWeather();
      setWeatherData(data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err.message || 'Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  // Manually trigger weather fetch from OpenWeatherMap API
  const fetchNow = async () => {
    try {
      setIsFetching(true);
      await weatherApi.fetchWeatherNow();
      
      // Wait 2 seconds then refresh the data
      setTimeout(() => {
        fetchWeatherData();
      }, 2000);
    } catch (err) {
      console.error('Error triggering weather fetch:', err);
      alert('Failed to fetch weather data. Please try again.');
    } finally {
      setIsFetching(false);
    }
  };

  // Refresh data manually
  const refreshData = () => {
    fetchWeatherData();
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchWeatherData();

    // Auto-refresh every 30 minutes (matching your backend cron job)
    const interval = setInterval(() => {
      fetchWeatherData();
    }, 30 * 60 * 1000); // 30 minutes

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return {
    weatherData,
    loading,
    error,
    refreshData,
    fetchNow,
    isFetching,
  };
};
