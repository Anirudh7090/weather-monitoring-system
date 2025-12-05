import React from 'react';
import { AlertTriangle, Thermometer, Droplets, CloudRain } from 'lucide-react';
import './AlertCard.css';

const AlertCard = ({ alert }) => {
  if (!alert) return null;

  // Get icon based on alert type
  const getAlertIcon = (type) => {
    switch (type) {
      case 'high_temperature':
        return <Thermometer className="alert-icon temperature" />;
      case 'high_humidity':
        return <Droplets className="alert-icon humidity" />;
      case 'extreme_weather':
        return <CloudRain className="alert-icon extreme" />;
      default:
        return <AlertTriangle className="alert-icon default" />;
    }
  };

  // Get alert severity class
  const getSeverityClass = (type) => {
    switch (type) {
      case 'high_temperature':
        return 'alert-temperature';
      case 'high_humidity':
        return 'alert-humidity';
      case 'extreme_weather':
        return 'alert-extreme';
      default:
        return 'alert-default';
    }
  };

  return (
    <div className={`alert-card ${getSeverityClass(alert.alert_type)}`}>
      <div className="alert-header">
        {getAlertIcon(alert.alert_type)}
        <div className="alert-info">
          <h4 className="alert-title">
            {alert.alert_type.split('_').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </h4>
          <span className="alert-time">
            {new Date(alert.created_at).toLocaleString('en-IN', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </span>
        </div>
      </div>

      <p className="alert-message">{alert.message}</p>

      <div className="alert-footer">
        <span className="alert-city">📍 {alert.city}</span>
        <span className={`alert-status ${alert.is_sent ? 'sent' : 'pending'}`}>
          {alert.is_sent ? '✓ Sent' : '⏳ Pending'}
        </span>
      </div>
    </div>
  );
};

export default AlertCard;
