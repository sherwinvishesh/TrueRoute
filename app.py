import requests
import pandas as pd
from datetime import datetime, timedelta

def get_opensky_data(days=7, username=None, password=None):
    """
    Get flight departure data from OpenSky's API for a given airport.
    Note: The OpenSky departures endpoint allows a maximum interval of 7 days per request.
    """
    end_date = datetime.now()
    start_date = end_date - timedelta(days=days)
    
    params = {
        "airport": "KLAX",  # ICAO code for LAX
        "begin": int(start_date.timestamp()),
        "end": int(end_date.timestamp())
    }
    
    try:
        response = requests.get(
            "https://opensky-network.org/api/flights/departure",
            params=params,
            auth=(username, password)
        )
        response.raise_for_status()
        
        flights = []
        for flight in response.json():
            callsign = flight.get('callsign')
            flights.append({
                "date": datetime.fromtimestamp(flight['firstSeen']).strftime('%Y-%m-%d'),
                "airline": callsign[:3].strip() if callsign else None,  # Extract airline code (first three characters)
                "flight_number": callsign.strip() if callsign else None,
                "departure_time": datetime.fromtimestamp(flight['firstSeen']),
                "arrival_time": datetime.fromtimestamp(flight['lastSeen']),
                "duration_min": (flight['lastSeen'] - flight['firstSeen']) // 60,
                "aircraft": flight.get('icao24')
            })
            
        return pd.DataFrame(flights)
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return pd.DataFrame()

# Replace these with your actual OpenSky username and password
username = "rkhatta"
password = "RaajHere@2k25"

# Retrieve data for a 7-day interval (remember, the departures endpoint accepts up to 7 days per request)
df_opensky = get_opensky_data(days=7, username=username, password=password)

# Check if the DataFrame is not empty before saving
if not df_opensky.empty:
    # Save to CSV
    df_opensky.to_csv("opensky_departures.csv", index=False)
    print("Data saved to opensky_departures.csv")
    
    # Save to JSON (records-oriented; one JSON object per line)
    df_opensky.to_json("opensky_departures.json", orient="records", lines=True)
    print("Data saved to opensky_departures.json")
else:
    print("No data to save.")
