from flask import Flask, request, jsonify
from flask_cors import CORS
from generation import generate_response
from chunking import generate_chunks


app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# In-memory storage for notes and highlights
notes_and_highlights_questions = []
notes_and_highlights = {
    'yellow': [],
    'blue': [],
    'green': []
}

global chunks
global chunk_embeddings
chunks, chunk_embeddings = generate_chunks('../public/dpo.pdf')

@app.route('/question', methods=['POST'])
def save_note():
    data = request.json  # Get JSON data from the request
    if not data or 'note' not in data or 'highlights' not in data:
        return jsonify({'error': 'Invalid data'}), 400
    
    # Append the note and highlights to the in-memory list
    notes_and_highlights_questions.append(data)
    openai_response = generate_response(data['note'], chunks, chunk_embeddings, color = 'red')
    return jsonify({'message': 'Note saved successfully', 'data': openai_response}), 200


def save_highlight(color):
    data = request.json  # Get JSON data from the request
    if not data or 'note' not in data or 'highlights' not in data:
        return jsonify({'error': 'Invalid data'}), 400

    # Save the highlight under the corresponding color
    notes_and_highlights[color].append(data)

    if color == 'yellow':
        return "Jake"
    openai_response = generate_response(data['note'], chunks, chunk_embeddings, color)  # Replace with actual params if needed
    return jsonify({'message': f'Highlight saved successfully for {color}', 'data': openai_response}), 200


@app.route('/save-yellow', methods=['POST'])
def save_yellow():
    print('Jake')
    return save_highlight('yellow')

@app.route('/save-blue', methods=['POST'])
def save_blue():
    print("Jake 2")
    return save_highlight('blue')

@app.route('/save-green', methods=['POST'])
def save_green():
    print("Jake 3")
    return save_highlight('green')



@app.route('/notes', methods=['GET'])
def get_notes():
    # Return all saved notes and highlights
    return jsonify(notes_and_highlights), 200

if __name__ == '__main__':
    app.run(debug=True)
