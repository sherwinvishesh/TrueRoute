# database.py
from pymongo import MongoClient
from config import MONGODB_URI, DATABASE_NAME, COLLECTION_NAME

def get_db_connection():
    """Establish connection to MongoDB for flights_raw collection"""
    try:
        client = MongoClient(MONGODB_URI)
        db = client[DATABASE_NAME]
        collection = db[COLLECTION_NAME]
        print("MongoDB flights collection connection established")
        return collection
    except Exception as e:
        print("Error connecting to MongoDB (flights):", e)
        raise

def get_userrev_collection():
    """Establish connection to MongoDB for userrev collection"""
    try:
        client = MongoClient(MONGODB_URI)
        db = client[DATABASE_NAME]
        userrev_coll = db["userrev"]  # collection name for user reviews
        print("MongoDB userrev collection connection established")
        return userrev_coll
    except Exception as e:
        print("Error connecting to MongoDB (userrev):", e)
        raise

def get_historical_flight_score(collection, flight_number, operator, origin, destination):
    """Query MongoDB for historical flight score"""
    query = {
        "OP_CARRIER_FL_NUM": flight_number,
        "OP_UNIQUE_CARRIER": operator,
        "ORIGIN": origin,
        "DEST": destination
    }
    
    print("Database query (flight_scores):", query)
    
    try:
        record = collection.find_one(query)
        if record:
            print("Found database record")
            return float(record.get("PredictedScore", 5.0))
        else:
            print("No matching record found")
            return 5.0
    except Exception as e:
        print("Database error:", e)
        return 5.0
