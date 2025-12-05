import { useState, useEffect, useMemo } from 'react';
import weatherApi from '../../service/weatherApi';

/**
 * Custom hook for Alerts page logic
 * Fetches and manages weather alerts data
 */
export const useAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('all');

  // Fetch alerts data from API
  const fetchAlertsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await weatherApi.getAlerts();
      setAlerts(data);
    } catch (err) {
      console.error('Error fetching alerts:', err);
      setError(err.message || 'Failed to load alerts');
    } finally {
      setLoading(false);
    }
  };

  // Filter alerts based on selected type
  const filteredAlerts = useMemo(() => {
    if (filterType === 'all') {
      return alerts;
    }
    return alerts.filter(alert => alert.alert_type === filterType);
  }, [alerts, filterType]);

  // Refresh data manually
  const refreshData = () => {
    fetchAlertsData();
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAlertsData();

    // Auto-refresh every 15 minutes (matching your backend cron job)
    const interval = setInterval(() => {
      fetchAlertsData();
    }, 15 * 60 * 1000); // 15 minutes

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return {
    alerts,
    loading,
    error,
    refreshData,
    filterType,
    setFilterType,
    filteredAlerts,
  };
};
