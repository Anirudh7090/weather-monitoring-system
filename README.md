# 🌦️ Weather Monitoring & Automation System

A full-stack weather monitoring application with automated cron jobs, real-time data updates, and alert notifications. Built with FastAPI backend and React frontend.

## 📋 Features

- 🌤️ **Automated Weather Data Fetching**: Collects weather data from OpenWeatherMap API every 30 minutes
- 📊 **Dashboard Analytics**: Computes hourly summaries with trends, averages, and metrics
- 🚨 **Smart Alerts**: Monitors weather conditions and generates alerts for:
  - High temperature (>35°C)
  - High humidity (>80%)
  - Extreme weather conditions (storms, heavy rain, etc.)
- 🗑️ **Data Cleanup**: Automatic daily cleanup of records older than 2 days
- 🔄 **Real-time Updates**: Frontend auto-refreshes matching backend cron intervals

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern async Python web framework
- **PostgreSQL** - Relational database with asyncpg driver
- **APScheduler** - Cron job scheduling
- **SQLAlchemy** - ORM for database operations
- **OpenWeatherMap API** - Weather data source

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library

## 📁 Project Structure

```

weather-monitoring-system1/
├── weather-monitoring-backend/
│   ├── src/
│   │   ├── api/routes/          \# API endpoints
│   │   ├── config/              \# Configuration settings
│   │   ├── cron/                \# Cron job schedulers
│   │   ├── database/            \# Database models \& connection
│   │   ├── models/              \# SQLAlchemy models
│   │   ├── schemas/             \# Pydantic schemas
│   │   └── services/            \# Business logic
│   ├── .env                     \# Environment variables
│   ├── requirements.txt         \# Python dependencies
│   └── main.py                  \# Application entry point
│
└── weather-monitoring-frontend/
├── src/
│   ├── components/          \# Reusable UI components
│   ├── pages/               \# Page components
│   ├── routes/              \# Route definitions
│   ├── service/             \# API service layer
│   ├── constants/           \# App constants
│   └── utils/               \# Helper functions
├── package.json             \# Node dependencies
└── vite.config.js           \# Vite configuration

```

## 🚀 Installation & Setup

### Prerequisites

- Python 3.9+
- Node.js 16+
- PostgreSQL 12+
- OpenWeatherMap API Key ([Get it here](https://openweathermap.org/api))

### Backend Setup

1. **Navigate to backend folder**
```

cd weather-monitoring-backend

```

2. **Create virtual environment**
```


# Windows

python -m venv venv
venv\Scripts\activate

# Mac/Linux

python3 -m venv venv
source venv/bin/activate

```

3. **Install dependencies**
```

pip install -r requirements.txt

```

4. **Create PostgreSQL database**
```

CREATE DATABASE weather_monitoring;

```

5. **Configure environment variables**

Create a `.env` file in `weather-monitoring-backend/` folder:
```

DATABASE_URL=postgresql+asyncpg://postgres:YOUR_PASSWORD@localhost:5432/weather_monitoring
POSTGRES_USER=postgres
POSTGRES_PASSWORD=YOUR_PASSWORD
POSTGRES_DB=weather_monitoring
OPENWEATHER_API_KEY=YOUR_API_KEY_HERE
OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
CITY_NAME=Pune

```

6. **Start backend server**
```

python -m uvicorn src.main:app --reload --port 8000

```

Backend will run on `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend folder**
```

cd weather-monitoring-frontend

```

2. **Install dependencies**
```

npm install

```

3. **Start development server**
```

npm run dev

```

Frontend will run on `http://localhost:3000`

## 🔄 Automated Cron Jobs

The application runs the following automated tasks:

| Job | Frequency | Description |
|-----|-----------|-------------|
| **Weather Fetch** | Every 30 minutes | Fetches latest weather data from OpenWeatherMap API |
| **Dashboard Summary** | Every 1 hour | Computes trends, averages, and metrics |
| **Alert Check** | Every 15 minutes | Monitors conditions and generates alerts |
| **Data Cleanup** | Daily at midnight | Removes records older than 2 days |

All cron jobs start automatically when the backend server starts.

## 📱 Usage

1. **Access the application**: Open browser to `http://localhost:3000`

2. **Navigate between pages**:
- **Dashboard** - View summary statistics and trends
- **Current Weather** - See latest 10 weather records
- **Alerts** - Check weather alerts with filtering options

3. **Manual data fetch**: Click "Fetch Now" button on Current Weather page to immediately fetch new data

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/weather/current` | Get latest 10 weather records |
| GET | `/api/weather/dashboard` | Get dashboard summary with trends |
| GET | `/api/weather/alerts` | Get recent weather alerts |
| POST | `/api/weather/fetch-now` | Manually trigger weather data fetch |

## 🗄️ Database Schema

### Tables

- **weather_data** - Stores weather records with temperature, humidity, wind, etc.
- **dashboard_summary** - Stores computed hourly summaries
- **weather_alerts** - Stores alert notifications and logs

## 🎯 Assignment Requirements

This project fulfills all requirements of Weather Monitoring & Automation System Assignment:

- ✅ Weather Data Fetching Cron (30 min intervals)
- ✅ Dashboard Data Population Cron (hourly)
- ✅ Data Cleanup Cron (daily)
- ✅ Weather Alert Notification Cron (15 min intervals)
- ✅ APScheduler for cron scheduling
- ✅ OpenWeatherMap API integration
- ✅ PostgreSQL database
- ✅ FastAPI backend
- ✅ React frontend with dashboard

## 📸 Screenshots

### Dashboard
![Dashboard showing weather metrics and trends]

### Current Weather
![Current weather cards with real-time data]

### Alerts
![Weather alerts with filtering options]

## 🤝 Contributing

This is an academic project. For any questions or suggestions, please open an issue.

## 👤 Author

**Anirudh7090**
- GitHub: [@Anirudh7090](https://github.com/Anirudh7090)

## 📝 License

This project is created for educational purposes as part of Weather Monitoring & Automation System assignment.

---

⭐ If you found this project helpful, please give it a star!
```

