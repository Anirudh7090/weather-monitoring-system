import React from 'react';
import { useCurrentWeather } from './CurrentWeather.hook';
import Navbar from '../../components/Navbar/Navbar';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import './CurrentWeather.css';

const CurrentWeather = () => {
  const {
    weatherData,
    loading,
    error,
    refreshData,
    fetchNow,
    isFetching,
  } = useCurrentWeather();

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="current-weather-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="current-weather-container">
          <div className="error-message">
            <h3>⚠️ Error Loading Data</h3>
            <p>{error}</p>
            <button onClick={refreshData} className="retry-button">
              🔄 Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  if (!weatherData || weatherData.length === 0) {
    return (
      <>
        <Navbar />
        <div className="current-weather-container">
          <div className="no-data-message">
            <h3>🌤️ No Weather Data Available</h3>
            <p>Weather data is being collected. Please check back later.</p>
            <button onClick={fetchNow} className="fetch-button" disabled={isFetching}>
              {isFetching ? '⏳ Fetching...' : '🔄 Fetch Now'}
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="current-weather-container">
        <div className="current-weather-header">
          <h2>🌤️ Current Weather Data</h2>
          <div className="header-buttons">
            <button 
              onClick={fetchNow} 
              className="fetch-button"
              disabled={isFetching}
            >
              {isFetching ? '⏳ Fetching...' : '📡 Fetch Now'}
            </button>
            <button onClick={refreshData} className="refresh-button">
              🔄 Refresh
            </button>
          </div>
        </div>

        <p className="data-info">
          Showing latest {weatherData.length} weather records
        </p>

        <div className="weather-cards-grid">
          {weatherData.map((weather) => (
            <WeatherCard key={weather.id} weatherData={weather} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CurrentWeather;
