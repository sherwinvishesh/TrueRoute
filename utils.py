import datetime

def format_time_for_open_meteo(target_time):
    """Convert datetime object to Open-Meteo's required format (yyyy-mm-ddThh:mm)"""
    return target_time.strftime("%Y-%m-%dT%H:%M")

def parse_flight_data(data):
    """Parse and validate flight data from request"""
    try:
        flight_number = int(data["flight_number"])
        operator = data["operator"]
        origin = data["origin"]
        destination = data["destination"]
        departure_datetime = datetime.datetime.fromisoformat(
            data["departure_datetime"].replace("Z", "+00:00"))
        arrival_datetime = datetime.datetime.fromisoformat(
            data["arrival_datetime"].replace("Z", "+00:00"))
        
        return {
            "flight_number": flight_number,
            "operator": operator,
            "origin": origin,
            "destination": destination,
            "departure_datetime": departure_datetime,
            "arrival_datetime": arrival_datetime
        }
    except Exception as e:
        print(f"Error parsing flight data: {e}")
        return None