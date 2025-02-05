# Project Athena

Project Athena is a web-based learning platform designed to help users efficiently navigate and understand academic research papers. The platform leverages AI-driven insights and structured roadmaps to facilitate deep learning and exploration of complex topics in machine learning and artificial intelligence.

## Features

- **Interactive Paper Viewing:** Users can view research papers with an AI-powered assistant providing explanations and answering queries.
- **Paper Summarization:** Summarizes key insights from research papers.
- **Structured Learning Paths:** Organizes papers into foundational, core techniques, and advanced topics.
- **Query-based Learning:** Allows users to ask questions about the content and get AI-generated responses.
- **Paper Recommendation Engine:** Fetches relevant papers based on user input.

## Screenshots

### Interactive Paper Viewer
![Interactive Paper Viewer](Screenshot%202025-02-05%20at%2010.45.28%E2%80%AFAM.png)
*Users can view research papers with an interactive AI-powered assistant providing explanations and answering queries.*

### Query-based Learning
![Query-based Learning](images/Screenshot 2025-02-05 at 10.45.28 AM.png)
*Users can type questions related to the research paper, and the AI provides responses based on the content.*

### Paper Summarization & Learning Paths
![Paper Summarization & Learning Paths](Screenshot%202025-02-05%20at%2010.55.56%E2%80%AFAM.png)
*Papers are categorized into foundational knowledge, core techniques, and advanced research topics to facilitate structured learning.*

### Paper Recommendation Engine
![Paper Recommendation Engine](Screenshot%202025-02-05%20at%2010.57.40%E2%80%AFAM.png)
*Users can search for papers on a given topic and get recommendations grouped into different learning categories.*

## How It Works
1. **Enter a research topic** – Users input a keyword or topic of interest.
2. **Fetch research papers** – The platform retrieves relevant academic papers.
3. **Explore papers** – Users can read the full paper, get AI-generated explanations, and ask questions.
4. **Follow structured learning paths** – The AI organizes papers into different categories for a smooth learning experience.
5. **Refine knowledge** – Users can dive deeper into selected papers based on recommendations and insights.

## Technologies Used
- **Frontend:** React.js for a dynamic and interactive UI
- **Backend:** FastAPI for handling API requests and AI-driven responses
- **Machine Learning:** NLP models to summarize content and provide intelligent responses
- **Database:** MongoDB to store user preferences and search history

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/jakebentley2001/project-athena.git
   cd project-athena
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt  # Backend dependencies
   cd frontend && npm install  # Frontend dependencies
   ```
3. Start the backend server:
   ```sh
   python backend/flaskApp.py
   ```
4. Start the frontend:
   ```sh
   cd frontend
   npm start
   ```
5. Open the web app in your browser at `http://localhost:3000`

## Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

## License
This project is licensed under the MIT License.

