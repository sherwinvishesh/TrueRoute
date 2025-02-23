from database import get_historical_flight_score
from weather import get_weather_forecast, calculate_weather_score
from config import AIRPORT_COORDINATES

def compute_scores(collection, flight_data):
    """Compute flight, weather, and TrueRoute scores"""
    flight_number = flight_data["flight_number"]
    operator = flight_data["operator"]
    origin = flight_data["origin"]
    destination = flight_data["destination"]
    departure_datetime = flight_data["departure_datetime"]
    arrival_datetime = flight_data["arrival_datetime"]

    # Get historical flight score
    flight_score = get_historical_flight_score(collection, flight_number, operator, origin, destination)
    
    # Get weather scores
    weather_scores = []
    for airport, target_time in [(origin, departure_datetime), (destination, arrival_datetime)]:
        coords = AIRPORT_COORDINATES.get(airport)
        if not coords:
            print(f"No coordinates found for {airport}, using default score")
            weather_scores.append(5.0)
            continue
            
        weather_data = get_weather_forecast(coords[0], coords[1], target_time)
        weather_score = calculate_weather_score(weather_data)
        weather_scores.append(weather_score)
    
    origin_weather, dest_weather = weather_scores
    avg_weather = (origin_weather + dest_weather) / 2
    
    # Calculate TrueRoute score
    true_route_score = (flight_score + avg_weather) / 2
    
    return {
        "flight_score": round(flight_score, 1),
        "weather": {
            "origin": round(origin_weather, 1),
            "destination": round(dest_weather, 1),
            "average": round(avg_weather, 1)
        },
        "true_route_score": round(true_route_score, 1)
    }