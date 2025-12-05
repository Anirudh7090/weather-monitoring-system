// API Configuration
export const API_CONFIG = {
  BASE_URL: '/api/weather',
  TIMEOUT: 10000, // 10 seconds
};

// Weather Alert Types
export const ALERT_TYPES = {
  HIGH_TEMPERATURE: 'high_temperature',
  HIGH_HUMIDITY: 'high_humidity',
  EXTREME_WEATHER: 'extreme_weather',
};

// Alert Severity Levels
export const ALERT_SEVERITY = {
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

// Weather Icons Mapping
export const WEATHER_ICONS = {
  clear: '☀️',
  clouds: '☁️',
  rain: '🌧️',
  drizzle: '🌦️',
  thunderstorm: '⛈️',
  snow: '❄️',
  mist: '🌫️',
  fog: '🌫️',
  haze: '🌫️',
  smoke: '🌫️',
  dust: '🌪️',
  sand: '🌪️',
  ash: '🌋',
  squall: '💨',
  tornado: '🌪️',
};

// Default City
export const DEFAULT_CITY = 'Pune';

// Refresh Intervals (in milliseconds)
export const REFRESH_INTERVALS = {
  WEATHER_DATA: 30 * 60 * 1000, // 30 minutes (matching your cron job)
  DASHBOARD: 60 * 60 * 1000,     // 1 hour (matching your cron job)
  ALERTS: 15 * 60 * 1000,        // 15 minutes (matching your cron job)
};

// Date Format Options
export const DATE_FORMAT = {
  SHORT_TIME: {
    hour: '2-digit',
    minute: '2-digit',
  },
  FULL_DATE_TIME: {
    dateStyle: 'medium',
    timeStyle: 'short',
  },
  DATE_ONLY: {
    dateStyle: 'medium',
  },
};

// Temperature Thresholds (matching your backend)
export const THRESHOLDS = {
  HIGH_TEMPERATURE: 35, // °C
  HIGH_HUMIDITY: 80,    // %
};

// Chart Colors
export const CHART_COLORS = {
  TEMPERATURE: '#667eea',
  HUMIDITY: '#4dabf7',
  WIND: '#51cf66',
  PRESSURE: '#ff922b',
};

// Status Messages
export const STATUS_MESSAGES = {
  LOADING: 'Loading weather data...',
  ERROR: 'Failed to load weather data',
  NO_DATA: 'No weather data available',
  SUCCESS: 'Data loaded successfully',
};
