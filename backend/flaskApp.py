from flask import Flask, request, jsonify
from flask_cors import CORS
from generation import generate_response
from chunking import generate_chunks
from pymongo import MongoClient
import bcrypt
from dotenv import load_dotenv
import os
import requests

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

DB_PASSWORD = os.getenv("DB_PASSWORD")

access_string = f"mongodb+srv://jakebentley2001:{DB_PASSWORD}@athena-cluster.dpay7.mongodb.net/?retryWrites=true&w=majority&appName=Athena-Cluster"

client = MongoClient(access_string)

db = client["User_db"]
users_collection = db["Users"]
papers_collection = db["Papers"]

@app.route("/")
def home():
    return "Flask backend is running"

# Authentication ENPOINTs

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing fields"}), 400
    
    #Checks if the user exists
    existing_user = users_collection.find_one({"email":email})
    if existing_user:
        return jsonify({"error":"user already exists"}), 400
    
    new_user = {
        "email": email,
        "password": password,
        "papers": [] #an array of paper IDS or objects
    }

    users_collection.insert_one(new_user)

    return jsonify({"message": "user successfully added"}), 201


@app.route("/api/login", methods = ["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({"email":email})
    if not user:
        return jsonify({"error":"Invalid Credential, User does not exist"}), 401
    
    if password == user["password"]:
        return jsonify({"messages": "Login Successful"}), 200
    else:
        return jsonify({"error":"Invalid Password"}), 401
    


# GET PAPERS
@app.route("/api/papers/<string:user_email>", methods=["GET"])
def get_papers(user_email):
    #Find user by email
    user = users_collection.find_one({"email": user_email})
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    user_papers = user.get("papers", [])

    return jsonify({"papers": user_papers}), 200

SEMANTIC_SCHOLAR_BASE_URL = "https://www.semanticscholar.org/search"

# SEARCH FOR PAPRTS
@app.route("/api/search_papers", methods=["GET"])
def search_papers():
    query = request.args.get("query", "").strip()

    if not query:
        return jsonify({"results": []}), 200
    
    print(query)

    search_url = f"{SEMANTIC_SCHOLAR_BASE_URL}?q={query.replace(' ','+')}"

    response = requests.get(search_url)
    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch data from Sematic Scholare'}), response.status_code

    results = [{"_id":"Hello","name":"Jake"}]
    
    return jsonify({"results": results}), 200


if __name__ == "__main__":
    app.run(debug=True)

