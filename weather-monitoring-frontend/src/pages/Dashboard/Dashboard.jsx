import React from 'react';
import { useDashboard } from './Dashboard.hook';
import Navbar from '../../components/Navbar/Navbar';
import './Dashboard.css';

const Dashboard = () => {
  const {
    summary,
    loading,
    error,
    refreshData,
  } = useDashboard();

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="dashboard-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading dashboard data...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="dashboard-container">
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

  if (!summary) {
    return (
      <>
        <Navbar />
        <div className="dashboard-container">
          <div className="no-data-message">
            <h3>📊 No Dashboard Data Available</h3>
            <p>Weather data is being collected. Please check back later.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>📊 Weather Dashboard - {summary.city}</h2>
          <button onClick={refreshData} className="refresh-button">
            🔄 Refresh
          </button>
        </div>

        <div className="dashboard-grid">
          {/* Average Temperature Card */}
          <div className="stat-card avg-temp">
            <div className="stat-icon">🌡️</div>
            <div className="stat-content">
              <h3>Average Temperature</h3>
              <p className="stat-value">{summary.avg_temperature}°C</p>
            </div>
          </div>

          {/* Max Temperature Card */}
          <div className="stat-card max-temp">
            <div className="stat-icon">🔥</div>
            <div className="stat-content">
              <h3>Max Temperature</h3>
              <p className="stat-value">{summary.max_temperature}°C</p>
            </div>
          </div>

          {/* Min Temperature Card */}
          <div className="stat-card min-temp">
            <div className="stat-icon">❄️</div>
            <div className="stat-content">
              <h3>Min Temperature</h3>
              <p className="stat-value">{summary.min_temperature}°C</p>
            </div>
          </div>

          {/* Average Humidity Card */}
          <div className="stat-card humidity">
            <div className="stat-icon">💧</div>
            <div className="stat-content">
              <h3>Average Humidity</h3>
              <p className="stat-value">{summary.avg_humidity}%</p>
            </div>
          </div>
        </div>

        {/* Trend Data Section */}
        {summary.trend_data && summary.trend_data.hourly_temps && (
          <div className="trend-section">
            <h3>📈 Recent Hourly Trends</h3>
            <div className="trend-list">
              {summary.trend_data.hourly_temps.map((item, index) => (
                <div key={index} className="trend-item">
                  <span className="trend-time">
                    {new Date(item.time).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <span className="trend-temp">{Math.round(item.temperature)}°C</span>
                  <span className="trend-humidity">{item.humidity}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="dashboard-footer">
          <p className="last-updated">
            Last updated: {new Date(summary.computed_at).toLocaleString('en-IN')}
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
