// import React, { useState } from "react";

// function SearchPage() {

//     // add functionality here 
//     const [searchTerm, setSearchTerm] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const userEmail = localStorage.getItem("userEmail");
   

//     const handleSubmit = async (e) => {
//         e.preventDefault(); // Prevent page reload

//         try {

//             const response = await fetch(
//                 `http://localhost:5000/api/search_papers?query=${encodeURIComponent(searchTerm)}`
//             );
//             if (!response.ok) {
//                 throw new Error(`Failed to fetch. Status: $(response.status)`);
//             }
//             const data = await response.json();

//             setSearchResults(data.results || [] );
//         } catch (error) {
//             console.error("Error searching papers: ", error);
//         }
//     };

//     const sendToBackend = async (paper) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/save-paper/${userEmail}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ arxivId: paper.ArXiv, title: paper.title }),
//             });

//             const result = await response.json();
//             alert(result.message || 'Paper saved successfully!');
//         } catch (error) {
//             console.error('Error saving papers:', error);
//             alert('Failed to save the paper');
//         }
//     };

//     return (

//         <div style={{margin: "50px"}}> 
//             <h2> Search Papers</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Search Papers: </label>
//                     <input
//                         type="Search"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit">Search</button>
//             </form>
//             {searchResults.length > 0 && (
//                 <div style={{ marginTop: "20px"}}>
//                     <h3>Results: </h3>
//                     <ul>
//                         {searchResults.map((paper) => (
//                             <li key={paper.title}>
//                                 <button onClick={() => sendToBackend(paper)}
//                                 > 
//                                     {paper.title} 
//                                 </button>   
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default SearchPage;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  // add functionality here
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  // Handle search form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await fetch(
        `http://localhost:5000/api/search_papers?query=${encodeURIComponent(searchTerm)}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch. Status: ${response.status}`);
      }
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Error searching papers:", error);
    }
  };

  // Save paper to backend
  const sendToBackend = async (paper) => {
    try {
      const response = await fetch(`http://localhost:5000/api/save-paper/${userEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ arxivId: paper.ArXiv, title: paper.title }),
      });
      const result = await response.json();
      alert(result.message || "Paper saved successfully!");
    } catch (error) {
      console.error("Error saving papers:", error);
      alert("Failed to save the paper");
    }
  };

  const handleHomeClick = () => {
    navigate("/home");
  };

  return (
    <div style={styles.pageContainer}>
      {/* Top Bar */}
      <header style={styles.headerBar}>
        <h1 style={styles.headerTitle}>Search Papers</h1>
        <button style={styles.homeButton} onClick={handleHomeClick}>
          Home
        </button>
      </header>

      {/* Main Content */}
      <div style={styles.mainSection}>
        <div style={styles.searchContainer}>
          <form onSubmit={handleSubmit} style={styles.searchForm}>
            <div style={styles.formRow}>
              <label style={styles.formLabel}>Search Papers:</label>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
                placeholder="Enter Title..."
              />
            </div>
            <button type="submit" style={styles.searchButton}>
              Search
            </button>
          </form>

          {/* Results Section */}
          {searchResults.length > 0 && (
            <div style={styles.resultsBox}>
              <h3 style={styles.resultsTitle}>Results:</h3>
              <ul style={styles.resultsList}>
                {searchResults.map((paper) => (
                  <li key={paper.title} style={styles.resultsItem}>
                    <button
                      onClick={() => sendToBackend(paper)}
                      style={styles.resultButton}
                    >
                      {paper.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* If no results yet, you could optionally show something else */}
        </div>
      </div>
    </div>
  );
}

// Inline styles (move to a CSS/SCSS file if desired)
const styles = {
  pageContainer: {
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#1F1F1F", // Dark background
    fontFamily: "'Poppins', sans-serif",
  },
  headerBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(8px)",
    padding: "15px 20px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.8)",
  },
  headerTitle: {
    margin: 0,
    fontSize: "1.5rem",
    color: "#fff",
  },
  homeButton: {
    backgroundColor: "#444",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "opacity 0.2s",
  },
  mainSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    overflowY: "auto",
  },
  searchContainer: {
    width: "90%",
    maxWidth: "600px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(8px)",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0 0 30px rgba(0, 0, 0, 0.8)",
    color: "#fff",
  },
  searchForm: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "20px",
  },
  formRow: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  formLabel: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  searchInput: {
    padding: "0.75rem",
    borderRadius: "5px",
    border: "none",
    fontSize: "1rem",
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    outline: "none",
  },
  searchButton: {
    alignSelf: "flex-start",
    padding: "10px 16px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#1E90FF",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  resultsBox: {
    marginTop: "20px",
  },
  resultsTitle: {
    margin: "0 0 10px 0",
    fontSize: "1.2rem",
    color: "#fff",
  },
  resultsList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  resultsItem: {
    margin: 0,
  },
  resultButton: {
    width: "100%",
    textAlign: "left",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    fontWeight: "bold",
    color: "#000",
    backgroundColor: "#fff",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
};

export default SearchPage;
