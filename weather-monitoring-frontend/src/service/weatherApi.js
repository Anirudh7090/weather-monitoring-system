import axios from 'axios';

// Base URL for API - Vite proxy will forward /api to http://localhost:8000/api
const API_BASE_URL = '/api/weather';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// API Service Object
const weatherApi = {
  /**
   * Get current weather data (latest 10 records)
   * Endpoint: GET /api/weather/current
   */
  getCurrentWeather: async () => {
    try {
      const response = await apiClient.get('/current');
      return response.data;
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  },

  /**
   * Get dashboard summary with trends and averages
   * Endpoint: GET /api/weather/dashboard
   */
  getDashboardSummary: async () => {
    try {
      const response = await apiClient.get('/dashboard');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard summary:', error);
      throw error;
    }
  },

  /**
   * Get recent weather alerts
   * Endpoint: GET /api/weather/alerts
   */
  getAlerts: async () => {
    try {
      const response = await apiClient.get('/alerts');
      return response.data;
    } catch (error) {
      console.error('Error fetching alerts:', error);
      throw error;
    }
  },

  /**
   * Manually trigger weather data fetch from OpenWeatherMap API
   * Endpoint: POST /api/weather/fetch-now
   */
  fetchWeatherNow: async () => {
    try {
      const response = await apiClient.post('/fetch-now');
      return response.data;
    } catch (error) {
      console.error('Error triggering weather fetch:', error);
      throw error;
    }
  },
};

export default weatherApi;
