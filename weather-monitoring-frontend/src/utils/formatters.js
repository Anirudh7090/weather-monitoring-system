/**
 * Format temperature with proper rounding and unit
 * @param {number} temp - Temperature value
 * @param {string} unit - Temperature unit (default: '°C')
 * @returns {string} Formatted temperature
 */
export const formatTemperature = (temp, unit = '°C') => {
  if (temp === null || temp === undefined) return 'N/A';
  return `${Math.round(temp)}${unit}`;
};

/**
 * Format date and time for display
 * @param {string|Date} date - Date to format
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDateTime = (date, options = {}) => {
  if (!date) return 'N/A';
  
  const defaultOptions = {
    dateStyle: 'medium',
    timeStyle: 'short',
  };
  
  const formatOptions = { ...defaultOptions, ...options };
  
  try {
    return new Date(date).toLocaleString('en-IN', formatOptions);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

/**
 * Format time only (HH:MM)
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted time string
 */
export const formatTime = (date) => {
  if (!date) return 'N/A';
  
  try {
    return new Date(date).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'Invalid Time';
  }
};

/**
 * Format date only (DD MMM YYYY)
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return 'N/A';
  
  try {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

/**
 * Get weather icon emoji based on weather condition
 * @param {string} condition - Weather condition (from API)
 * @returns {string} Weather emoji
 */
export const getWeatherIcon = (condition) => {
  if (!condition) return '🌤️';
  
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
    smoke: '🌫️',
    dust: '🌪️',
    sand: '🌪️',
    ash: '🌋',
    squall: '💨',
    tornado: '🌪️',
  };
  
  return iconMap[condition.toLowerCase()] || '🌤️';
};

/**
 * Capitalize first letter of each word
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Format humidity percentage
 * @param {number} humidity - Humidity value
 * @returns {string} Formatted humidity
 */
export const formatHumidity = (humidity) => {
  if (humidity === null || humidity === undefined) return 'N/A';
  return `${humidity}%`;
};

/**
 * Format wind speed
 * @param {number} speed - Wind speed in m/s
 * @returns {string} Formatted wind speed
 */
export const formatWindSpeed = (speed) => {
  if (speed === null || speed === undefined) return 'N/A';
  return `${speed.toFixed(1)} m/s`;
};

/**
 * Format pressure
 * @param {number} pressure - Pressure in hPa
 * @returns {string} Formatted pressure
 */
export const formatPressure = (pressure) => {
  if (pressure === null || pressure === undefined) return 'N/A';
  return `${pressure} hPa`;
};

/**
 * Check if data is recent (within last N minutes)
 * @param {string|Date} date - Date to check
 * @param {number} minutes - Number of minutes to consider as recent (default: 60)
 * @returns {boolean} True if recent, false otherwise
 */
export const isDataRecent = (date, minutes = 60) => {
  if (!date) return false;
  
  try {
    const dataTime = new Date(date).getTime();
    const currentTime = Date.now();
    const diffMinutes = (currentTime - dataTime) / (1000 * 60);
    
    return diffMinutes <= minutes;
  } catch (error) {
    console.error('Error checking data recency:', error);
    return false;
  }
};

/**
 * Get relative time string (e.g., "2 hours ago")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return 'N/A';
  
  try {
    const now = Date.now();
    const past = new Date(date).getTime();
    const diffMs = now - past;
    
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  } catch (error) {
    console.error('Error getting relative time:', error);
    return 'N/A';
  }
};
