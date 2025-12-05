import React from 'react';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';
import './WeatherCard.css';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <h3 className="weather-city">{weatherData.city}</h3>
        <span className="weather-time">
          {new Date(weatherData.recorded_at).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <Thermometer className="temp-icon" />
          <span className="temperature">{Math.round(weatherData.temperature)}°C</span>
        </div>
        <p className="weather-description">{weatherData.weather_description}</p>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <Thermometer size={18} />
          <span>Feels Like: {Math.round(weatherData.feels_like)}°C</span>
        </div>
        <div className="detail-item">
          <Droplets size={18} />
          <span>Humidity: {weatherData.humidity}%</span>
        </div>
        <div className="detail-item">
          <Wind size={18} />
          <span>Wind: {weatherData.wind_speed} m/s</span>
        </div>
        <div className="detail-item">
          <Cloud size={18} />
          <span>Clouds: {weatherData.clouds}%</span>
        </div>
      </div>

      <div className="weather-minmax">
        <span>Min: {Math.round(weatherData.temp_min)}°C</span>
        <span>Max: {Math.round(weatherData.temp_max)}°C</span>
      </div>
    </div>
  );
};

export default WeatherCard;
