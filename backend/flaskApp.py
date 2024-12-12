from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# In-memory storage for notes and highlights
notes_and_highlights = []

@app.route('/save', methods=['POST'])
def save_note():
    data = request.json  # Get JSON data from the request
    if not data or 'note' not in data or 'highlights' not in data:
        return jsonify({'error': 'Invalid data'}), 400
    
    # Append the note and highlights to the in-memory list
    notes_and_highlights.append(data)
    print(data['note'])
    return jsonify({'message': 'Note saved successfully', 'data': data}), 200

@app.route('/notes', methods=['GET'])
def get_notes():
    # Return all saved notes and highlights
    return jsonify(notes_and_highlights), 200

if __name__ == '__main__':
    app.run(debug=True)
