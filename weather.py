import requests
from config import OPEN_METEO_URL, AIRPORT_COORDINATES
from utils import format_time_for_open_meteo

def get_weather_forecast(lat, lon, target_time):
    """Fetch weather forecast from Open-Meteo API"""
    try:
        formatted_time = format_time_for_open_meteo(target_time)
        params = {
            "latitude": lat,
            "longitude": lon,
            "hourly": "temperature_2m,precipitation,rain,showers,snowfall,wind_speed_10m",
            "start_hour": formatted_time,
            "end_hour": formatted_time,
            "timezone": "UTC"
        }
        
        print(f"Fetching weather for {lat},{lon} at {formatted_time}")
        response = requests.get(OPEN_METEO_URL, params=params)
        response.raise_for_status()
        return response.json().get("hourly", {})
    except Exception as e:
        print(f"Weather API error: {e}")
        return None

def calculate_weather_score(weather_data):
    """Calculate weather score based on forecast parameters"""
    if not weather_data or not all(len(weather_data[key]) > 0 for key in weather_data):
        return 5.0  # Default score if no data
    
    score = 10.0  # Start with perfect score
    
    try:
        # Extract first hour's data
        precipitation = sum([
            weather_data.get("rain", [0])[0] or 0,
            weather_data.get("showers", [0])[0] or 0,
            weather_data.get("snowfall", [0])[0] or 0
        ])
        
        wind_speed = weather_data.get("wind_speed_10m", [0])[0] or 0
        
        # Apply penalties
        if precipitation > 5:  # mm
            score -= 4
        elif precipitation > 2:
            score -= 2
            
        if wind_speed > 15:  # m/s
            score -= 3
        elif wind_speed > 8:
            score -= 1
            
        return max(0, min(10, round(score, 1)))
    except Exception as e:
        print(f"Error calculating weather score: {e}")
        return 5.0