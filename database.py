from pymongo import MongoClient
from config import MONGODB_URI, DATABASE_NAME, COLLECTION_NAME

def get_db_connection():
    """Establish connection to MongoDB"""
    try:
        client = MongoClient(MONGODB_URI)
        db = client[DATABASE_NAME]
        collection = db[COLLECTION_NAME]
        print("MongoDB connection established")
        return collection
    except Exception as e:
        print("Error connecting to MongoDB:", e)
        raise

def get_historical_flight_score(collection, flight_number, operator, origin, destination):
    """Query MongoDB for historical flight score"""
    query = {
        "OP_CARRIER_FL_NUM": flight_number,
        "OP_UNIQUE_CARRIER": operator,
        "ORIGIN": origin,
        "DEST": destination
    }
    
    print("Database query:", query)
    
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