# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from database import get_db_connection, get_userrev_collection
from scoring import compute_scores
from utils import parse_flight_data

app = Flask(__name__)
CORS(app)

# Initialize MongoDB connections
flights_collection = get_db_connection()       # for flights_raw
userrev_collection = get_userrev_collection()  # for userrev

@app.route('/compute_route_score', methods=['POST'])
def compute_route_score():
    print("\n=== Received request ===")
    
    try:
        data = request.get_json()
        print("Request data:", data)
    except Exception as e:
        print("JSON parse error:", e)
        return jsonify({"error": "Invalid JSON format"}), 400

    # Parse and validate flight data
    flight_data = parse_flight_data(data)
    if not flight_data:
        return jsonify({"error": "Invalid flight data format"}), 400

    # Compute scores (now includes user review)
    scores = compute_scores(flights_collection, userrev_collection, flight_data)
    
    print("\nFinal scores:")
    print(f"Flight score: {scores['flight_score']}")
    print(f"Origin weather: {scores['weather']['origin']}")
    print(f"Destination weather: {scores['weather']['destination']}")
    print(f"User review score: {scores['user_review_score']}")
    print(f"TrueRoute score: {scores['true_route_score']}")

    return jsonify(scores), 200

if __name__ == '__main__':
    print("Starting Flask server")
    app.run(debug=False, use_reloader=False)
