from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from generation import generate_response
from chunking import generate_chunks
from pymongo import MongoClient
import bcrypt
from dotenv import load_dotenv
import os
import requests
import bson
import base64, io
from sift import get_papers_from_topic

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

base_url = "https://api.semanticscholar.org/graph/v1/paper/search"

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


# SEARCH FOR PAPRTS
@app.route("/api/search_papers", methods=["GET"])
def search_papers():
    query = request.args.get("query", "").strip()

    if not query:
        return jsonify({"results": []}), 200
    
    params = {
        "query": query,
        "limit": 6,
        "fields": "title,externalIds,year"
    }

    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status() # raise HTTPError if status != 200
        data = response.json()

        papers = data.get("data", [])

        results = []

        for paper in papers:
            results.append({
                "title": paper.get("title", "No title"),
                "ArXiv": paper.get("externalIds",{}).get("ArXiv", ""),
                "year": paper.get("year","")
            })

        return jsonify({"results": results}), 200
    
    except requests.exceptions.RequestException as e:

        return jsonify({"error": str(e)}), 500


@app.route("/api/save-paper/<string:user_email>", methods=["POST"])
def save_papers(user_email):
    try:
        # Get the ArXiv ID and title from the request
        data = request.json
        arxiv_id = data.get('arxivId')
        title = data.get('title')
     
        if not arxiv_id:
            return jsonify({"error": "ArXiv ID is requires"}), 400
        
        pdf_url = f"https://arxiv.org/pdf/{arxiv_id}.pdf"
        
        response = requests.get(pdf_url)

        if response.status_code != 200:
            return jsonify({'error': "Failed to download PDF"}), 400
        
        document = {
            "title": title,
            "arxiv_id": arxiv_id,
            "pdf_binary": bson.Binary(response.content)
        }
        
        papers_collection.insert_one(document)
        
        users_collection.update_one(
            {"email":user_email},
            {"$addToSet": {"papers": {"name": title, "arxiv_id": arxiv_id}}}
        )
        print(4)
        return jsonify({"message":"Paper saved successfully"}), 201
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route("/api/papers/<paperName>/pdf", methods=["GET"])
def get_paper_pdf(paperName):

    paper_doc = papers_collection.find_one({"title": paperName})
    
    if not paper_doc:
        print("1")
        return jsonify({"error": "Paper not found"}), 404
    
    if "pdf_binary" not in paper_doc:
        print(2)
        return jsonify({"error": "no PDF data stored for this paper"}), 401
    
    pdf_bytes = paper_doc["pdf_binary"]

    pdf_stream = io.BytesIO(pdf_bytes)

    return send_file(pdf_stream, mimetype='application/pdf')


@app.route("/api/papers/learning", methods=["GET","POST"])
def get_papers_from_llm():

    topic = None

    if request.method == "GET":
        topic = request.args.get("topic")
    elif request.method == "POST":
        data =  request.get_json()
        if data:
            topic = data.get("topic", None)

    if not topic:
        return jsonify({"error":"No topic provided"}), 400

    global papers_list_topic
    papers_list_topic = get_papers_from_topic(topic)

    return jsonify(papers_list_topic), 200

@app.route("/api/papers/find_paper/<string:user_email>", methods=["POST"])
def find_paper(user_email):

    print("HELLLOOOO JAKE")

    find_this_paper = request.get_json()
    paper_title = find_this_paper.get('title','')
    print(paper_title)
    if not paper_title:
        return jsonify({"results": []}), 200

    params = {
        "query": paper_title,
        "limit": 1,
        "fields": "title,externalIds,year"
    }


    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status() # raise HTTPError if status != 200
        data = response.json()

        paper = data.get("data", [])[0]
        print(f"JAKKKKKE:{paper}")

        results = []

        arxiv_id = (paper.get("externalIds",{}).get("ArXiv",""))
        if not arxiv_id:
            id = paper.get("externalIds",{}).get("DOI","")
            paper_url = f"https://dl.acm.org/doi/pdf/{id}"
        else:
            id = arxiv_id
            paper_url = f"https://arxiv.org/pdf/{arxiv_id}.pdf"

        pdf_response = requests.get(paper_url)

        if pdf_response.status_code != 200:
            return jsonify({"error": "Failed to download PDF"}), 400

        document = ({
                "title": paper_title,
                "arxiv_id": id,
                "pdf_binary": bson.Binary(pdf_response.content)
        })

        papers_collection.insert_one(document)

        users_collection.update_one(
            {"email":user_email},
            {"$addToSet": {"papers": {"name": paper_title, "arxiv_id": id}}}
        )


        # paper_doc = papers_collection.find_one({"title": paper_title})

        # pdf_bytes = paper_doc["pdf_binary"]

        # pdf_stream = io.BytesIO(pdf_bytes)

        # return send_file(pdf_stream, mimetype='application/pdf')

        return jsonify({"results": {"title":paper_title}}), 200
    
    except requests.exceptions.RequestException as e:

        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)

