import { useMemo } from 'react';

// Custom hook for AlertCard logic
export const useAlertCard = (alert) => {
  // Format alert type to readable text
  const formattedAlertType = useMemo(() => {
    if (!alert) return '';
    return alert.alert_type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }, [alert]);

  // Get severity level 
  const severityLevel = useMemo(() => {
    if (!alert) return 0;
    
    const severityMap = {
      extreme_weather: 3,
      high_temperature: 2,
      high_humidity: 1,
    };
    
    return severityMap[alert.alert_type] || 0;
  }, [alert]);

  // Check if alert is recent (within last hour)
  const isRecent = useMemo(() => {
    if (!alert) return false;
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    return new Date(alert.created_at) > oneHourAgo;
  }, [alert]);

  return {
    formattedAlertType,
    severityLevel,
    isRecent,
  };
};
