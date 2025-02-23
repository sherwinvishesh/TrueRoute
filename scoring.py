# scoring.py
from database import get_historical_flight_score
from weather import get_weather_forecast, calculate_weather_score
from config import AIRPORT_COORDINATES
import datetime

def get_user_review_score(userrev_collection, flight_number, origin, destination, date_str):
    """
    Query userrev collection to find the sentiment_score.
    We'll assume the userrev docs have fields:
      - FlightNumber
      - Departure
      - Arrival
      - Date (string, e.g. '26-02-2020')
      - sentiment_score
    Return 5.0 if not found.
    """
    query = {
        "FlightNumber": str(flight_number),    # or int if stored as int
        "Departure": origin,
        "Arrival": destination,
        "Date": date_str
    }
    print("Querying userrev with:", query)
    try:
        record = userrev_collection.find_one(query)
        if record and "sentiment_score" in record:
            print("Found userrev record:", record)
            return float(record["sentiment_score"])
        else:
            print("No userrev record found for:", query)
            return 5.0
    except Exception as e:
        print("Error querying userrev:", e)
        return 5.0

def compute_scores(flights_collection, userrev_collection, flight_data):
    """Compute flight, weather, user review, and TrueRoute scores."""
    flight_number = flight_data["flight_number"]
    operator = flight_data["operator"]
    origin = flight_data["origin"]
    destination = flight_data["destination"]
    departure_datetime = flight_data["departure_datetime"]
    arrival_datetime = flight_data["arrival_datetime"]

    # 1. Get historical flight score
    flight_score = get_historical_flight_score(flights_collection, flight_number, operator, origin, destination)
    
    # 2. Get weather scores
    weather_scores = []
    for airport, target_time in [(origin, departure_datetime), (destination, arrival_datetime)]:
        coords = AIRPORT_COORDINATES.get(airport)
        if not coords:
            print(f"No coordinates found for {airport}, using default weather score=5.0")
            weather_scores.append(5.0)
            continue
        
        weather_data = get_weather_forecast(coords[0], coords[1], target_time)
        weather_score = calculate_weather_score(weather_data)
        weather_scores.append(weather_score)
    
    origin_weather, dest_weather = weather_scores
    avg_weather = (origin_weather + dest_weather) / 2
    
    # 3. User review sentiment score
    # Convert departure date to "DD-MM-YYYY" if that's how userrev data is stored.
    date_str = departure_datetime.strftime("%d-%m-%Y")
    user_review_score = get_user_review_score(userrev_collection, flight_number, origin, destination, date_str)
    
    # 4. TrueRoute score is average of the three
    true_route_score = (flight_score + avg_weather + user_review_score) / 3.0
    
    return {
        "flight_score": round(flight_score, 1),
        "weather": {
            "origin": round(origin_weather, 1),
            "destination": round(dest_weather, 1),
            "average": round(avg_weather, 1)
        },
        "user_review_score": round(user_review_score, 1),
        "true_route_score": round(true_route_score, 1)
    }
