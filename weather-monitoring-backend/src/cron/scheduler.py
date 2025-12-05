from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from datetime import datetime
from src.database.connection import AsyncSessionLocal
from src.services.weather_service import WeatherService
from src.services.alert_service import AlertService
from src.schemas.weather import AlertThreshold
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

scheduler = AsyncIOScheduler()

# Job 1: Fetch weather data every 30 minutes
async def fetch_weather_job():
    """Cron job to fetch weather data from OpenWeatherMap API"""
    logger.info(f"[{datetime.now()}] Starting weather fetch job...")
    async with AsyncSessionLocal() as db:
        try:
            weather_data = await WeatherService.fetch_weather_from_api()
            await WeatherService.save_weather_data(db, weather_data)
            logger.info(f"Weather data fetched and saved successfully for {weather_data['name']}")
        except Exception as e:
            logger.error(f"Error in fetch_weather_job: {e}")

# Job 2: Compute dashboard summary every hour
async def dashboard_summary_job():
    """Cron job to compute dashboard summary data"""
    logger.info(f"[{datetime.now()}] Starting dashboard summary job...")
    async with AsyncSessionLocal() as db:
        try:
            summary = await WeatherService.compute_dashboard_summary(db)
            if summary:
                logger.info(f"Dashboard summary computed successfully")
            else:
                logger.warning("No data available for dashboard summary")
        except Exception as e:
            logger.error(f"Error in dashboard_summary_job: {e}")

# Job 3: Cleanup old data daily
async def cleanup_data_job():
    """Cron job to cleanup old weather records"""
    logger.info(f"[{datetime.now()}] Starting data cleanup job...")
    async with AsyncSessionLocal() as db:
        try:
            deleted_count = await WeatherService.cleanup_old_data(db, days=2, hard_delete=False)
            logger.info(f"Data cleanup completed. {deleted_count} records cleaned")
        except Exception as e:
            logger.error(f"Error in cleanup_data_job: {e}")

# Job 4: Check weather alerts every 15 minutes
async def weather_alert_job():
    """Cron job to check weather conditions and send alerts"""
    logger.info(f"[{datetime.now()}] Starting weather alert check...")
    async with AsyncSessionLocal() as db:
        try:
            # You can customize thresholds here
            thresholds = AlertThreshold(
                high_temperature=35.0,  # 35°C
                high_humidity=80,  # 80%
                extreme_weather_conditions=["Thunderstorm", "Heavy Rain", "Storm", "Tornado", "Hurricane"]
            )
            
            alerts = await AlertService.check_weather_alerts(db, thresholds)
            if alerts:
                logger.info(f"Created {len(alerts)} weather alerts")
                # Here you can add email/SMS notification logic
                for alert in alerts:
                    logger.warning(f"ALERT: {alert.message}")
            else:
                logger.info("No alerts triggered")
        except Exception as e:
            logger.error(f"Error in weather_alert_job: {e}")

def start_scheduler():
    """Initialize and start all cron jobs"""
    
    # Job 1: Fetch weather every 30 minutes
    scheduler.add_job(
        fetch_weather_job,
        trigger=CronTrigger(minute="*/30"),  # Every 30 minutes
        id="fetch_weather_job",
        name="Fetch weather data from API",
        replace_existing=True
    )
    
    # Job 2: Compute dashboard summary every hour
    scheduler.add_job(
        dashboard_summary_job,
        trigger=CronTrigger(minute="0"),  # Every hour at 0 minutes
        id="dashboard_summary_job",
        name="Compute dashboard summary",
        replace_existing=True
    )
    
    # Job 3: Cleanup data daily at midnight
    scheduler.add_job(
        cleanup_data_job,
        trigger=CronTrigger(hour="0", minute="0"),  # Daily at midnight
        id="cleanup_data_job",
        name="Cleanup old weather data",
        replace_existing=True
    )
    
    # Job 4: Check alerts every 15 minutes
    scheduler.add_job(
        weather_alert_job,
        trigger=CronTrigger(minute="*/15"),  # Every 15 minutes
        id="weather_alert_job",
        name="Check weather alerts",
        replace_existing=True
    )
    
    scheduler.start()
    logger.info("Scheduler started successfully with all cron jobs")

def shutdown_scheduler():
    """Shutdown the scheduler gracefully"""
    if scheduler.running:
        scheduler.shutdown()
        logger.info("Scheduler shut down successfully")
