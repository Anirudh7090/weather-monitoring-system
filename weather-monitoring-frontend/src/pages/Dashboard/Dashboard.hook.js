import { useState, useEffect } from 'react';
import weatherApi from '../../service/weatherApi';

/**
 * Custom hook for Dashboard page logic
 * Fetches and manages dashboard summary data
 */
export const useDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard summary from API
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await weatherApi.getDashboardSummary();
      setSummary(data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Refresh data manually
  const refreshData = () => {
    fetchDashboardData();
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardData();

    // Auto-refresh every 1 hour (matching your backend cron job)
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 60 * 60 * 1000); // 1 hour

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return {
    summary,
    loading,
    error,
    refreshData,
  };
};
