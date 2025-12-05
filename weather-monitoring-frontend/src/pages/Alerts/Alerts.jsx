import React from 'react';
import { useAlerts } from './Alerts.hook';
import Navbar from '../../components/Navbar/Navbar';
import AlertCard from '../../components/AlertCard/AlertCard';
import './Alerts.css';

const Alerts = () => {
  const {
    alerts,
    loading,
    error,
    refreshData,
    filterType,
    setFilterType,
    filteredAlerts,
  } = useAlerts();

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="alerts-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading alerts...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="alerts-container">
          <div className="error-message">
            <h3>⚠️ Error Loading Alerts</h3>
            <p>{error}</p>
            <button onClick={refreshData} className="retry-button">
              🔄 Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  if (!alerts || alerts.length === 0) {
    return (
      <>
        <Navbar />
        <div className="alerts-container">
          <div className="no-data-message">
            <h3>✅ No Weather Alerts</h3>
            <p>All weather conditions are normal. No alerts at this time.</p>
            <button onClick={refreshData} className="refresh-button">
              🔄 Refresh
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="alerts-container">
        <div className="alerts-header">
          <h2>🚨 Weather Alerts</h2>
          <button onClick={refreshData} className="refresh-button">
            🔄 Refresh
          </button>
        </div>

        <div className="alerts-info">
          <p>
            Showing {filteredAlerts.length} of {alerts.length} alerts
          </p>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
              onClick={() => setFilterType('all')}
            >
              All Alerts
            </button>
            <button
              className={`filter-btn ${filterType === 'high_temperature' ? 'active' : ''}`}
              onClick={() => setFilterType('high_temperature')}
            >
              🌡️ Temperature
            </button>
            <button
              className={`filter-btn ${filterType === 'high_humidity' ? 'active' : ''}`}
              onClick={() => setFilterType('high_humidity')}
            >
              💧 Humidity
            </button>
            <button
              className={`filter-btn ${filterType === 'extreme_weather' ? 'active' : ''}`}
              onClick={() => setFilterType('extreme_weather')}
            >
              ⛈️ Extreme Weather
            </button>
          </div>
        </div>

        <div className="alerts-grid">
          {filteredAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>

        {filteredAlerts.length === 0 && filterType !== 'all' && (
          <div className="no-filtered-alerts">
            <p>No alerts found for this filter.</p>
            <button onClick={() => setFilterType('all')} className="reset-filter-btn">
              Show All Alerts
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Alerts;
