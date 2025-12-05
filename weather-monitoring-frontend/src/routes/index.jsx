import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Import pages
import Dashboard from '../pages/Dashboard/Dashboard';
import CurrentWeather from '../pages/CurrentWeather/CurrentWeather';
import Alerts from '../pages/Alerts/Alerts';

/**
 * Define all routes for the application
 * Using React Router v6 createBrowserRouter
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/current-weather',
    element: <CurrentWeather />,
  },
  {
    path: '/alerts',
    element: <Alerts />,
  },
]);

export default router;
