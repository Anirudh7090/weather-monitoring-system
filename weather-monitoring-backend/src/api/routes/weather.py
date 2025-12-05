from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from src.database.connection import get_db
from src.services.weather_service import WeatherService
from src.services.alert_service import AlertService
from src.schemas.weather import (
    WeatherDataResponse, 
    DashboardSummaryResponse,
    WeatherAlertResponse
)
from typing import List

router = APIRouter(prefix="/api/weather", tags=["weather"])

@router.get("/current", response_model=List[WeatherDataResponse])
async def get_current_weather(db: AsyncSession = Depends(get_db)):
    """Get latest weather data"""
    try:
        weather_data = await WeatherService.get_latest_weather(db)
        if not weather_data:
            raise HTTPException(status_code=404, detail="No weather data found")
        return weather_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/dashboard", response_model=DashboardSummaryResponse)
async def get_dashboard_summary(db: AsyncSession = Depends(get_db)):
    """Get dashboard summary data"""
    try:
        summary = await WeatherService.get_dashboard_summary(db)
        if not summary:
            raise HTTPException(status_code=404, detail="No dashboard summary available")
        return summary
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/alerts", response_model=List[WeatherAlertResponse])
async def get_alerts(db: AsyncSession = Depends(get_db)):
    """Get recent weather alerts"""
    try:
        alerts = await AlertService.get_recent_alerts(db)
        return alerts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/fetch-now")
async def fetch_weather_now(db: AsyncSession = Depends(get_db)):
    """Manually trigger weather data fetch"""
    try:
        weather_data = await WeatherService.fetch_weather_from_api()
        saved_data = await WeatherService.save_weather_data(db, weather_data)
        return {"message": "Weather data fetched successfully", "data": saved_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
