import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  // Check if current route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-title-link">
          <h1 className="navbar-title">🌦️ Weather Monitoring System</h1>
        </Link>
        
        <div className="navbar-links">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            📊 Dashboard
          </Link>
          <Link 
            to="/current-weather" 
            className={`nav-link ${isActive('/current-weather') ? 'active' : ''}`}
          >
            🌤️ Current Weather
          </Link>
          <Link 
            to="/alerts" 
            className={`nav-link ${isActive('/alerts') ? 'active' : ''}`}
          >
            🚨 Alerts
          </Link>
        </div>

        <div className="navbar-city">
          <span>📍 Pune, India</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
