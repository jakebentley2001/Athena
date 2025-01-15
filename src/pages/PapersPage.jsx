// import React, { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';


// function PapersPage() {

//     // Insert Functionality here
//     const [papers, setPapers] = useState([]);
//     const navigate = useNavigate();
//     const userEmail = localStorage.getItem("userEmail");

//     useEffect(() => {
//         const fetchPapers = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/api/papers/${userEmail}`);
//                 const data = await response.json();
//                 if (response.ok) {
//                     setPapers(data.papers);
//                 } else {
//                     console.error(data.error);
//                 }
//             } catch (err) {
//                 console.error(err);
//             }
//         };

//         fetchPapers();
//     }, [userEmail]);

//     const handlePaperClick = (paperName) => {
//         navigate(`/papers/${paperName}`);
//     };

//     const handleButtoneClick = () => {
//         navigate("/search")
//     };

//     return (

//         <div style={{margin: "50px"}}>
//             <h2>Available Papers</h2>
//             {papers.length === 0 ? (
//                 <p>No papers found</p>
//             ) : (
//                 papers.map((paper, index) => (
//                     <button
//                         key={index}
//                         onClick={() => handlePaperClick(paper.name)}
//                         style = {{ display: "block", margin: "10px 0", width: "200px"}}
//                     >
//                         {paper.name}
//                     </button>
//                 ))
//             )}
//             <button onClick={handleButtoneClick}>Add Papers</button>
//         </div>
//     );
// }

// export default PapersPage;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PapersPage() {
  const [papers, setPapers] = useState([]);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  // Fetch papers on mount
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/papers/${userEmail}`);
        const data = await response.json();
        if (response.ok) {
          setPapers(data.papers);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPapers();
  }, [userEmail]);

  // Handlers
  const handlePaperClick = (paperName) => {
    navigate(`/papers/${paperName}`);
  };

  const handleAddPaperClick = () => {
    navigate("/search");
  };

  const handleHomeClick = () => {
    navigate("/home");
  };

  return (
    <div style={styles.pageContainer}>
      {/* Top Navigation Bar */}
      <header style={styles.headerBar}>
        <h1 style={styles.headerTitle}>Papers</h1>
        <button style={styles.homeButton} onClick={handleHomeClick}>
          Home
        </button>
      </header>

      {/* Main Content Section */}
      <div style={styles.mainSection}>
        <div style={styles.innerContainer}>
          <div style={styles.tableContainer}>
            {/* Title */}
            <h2 style={styles.title}>Available Papers</h2>

            {/* Papers Table or "No Papers" message */}
            {papers.length === 0 ? (
              <p style={styles.noPapersText}>No papers found</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Paper Name</th>
                  </tr>
                </thead>
                <tbody>
                  {papers.map((paper, index) => (
                    <tr
                      key={index}
                      style={styles.tableRow}
                      onClick={() => handlePaperClick(paper.name)}
                    >
                      <td style={styles.tableData}>{paper.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Add Paper Button */}
          <button style={styles.addButton} onClick={handleAddPaperClick}>
            Add paper
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Inline Styles (Move to a CSS file if you prefer) ---
const styles = {
  pageContainer: {
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    backgroundColor: "#1F1F1F", // Dark background
    fontFamily: "'Poppins', sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  headerBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(8px)",
    padding: "15px 20px",
    boxShadow: "0 0 20px rgba(0,0,0,0.8)",
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
    overflowY: "auto",
  },
  innerContainer: {
    width: "90%",
    maxWidth: "800px",
    marginTop: "30px",
    marginBottom: "30px",
  },
  tableContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 0 30px rgba(0, 0, 0, 0.8)",
  },
  title: {
    margin: "0 0 20px 0",
    fontSize: "1.2rem",
    color: "#fff",
    textAlign: "center",
  },
  noPapersText: {
    margin: "20px 0",
    textAlign: "center",
    color: "#ccc",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#bbb",
    textAlign: "left",
    padding: "12px",
    fontSize: "0.9rem",
  },
  tableRow: {
    cursor: "pointer",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "background-color 0.2s",
  },
  tableData: {
    padding: "12px",
    fontSize: "0.95rem",
    color: "#eee",
  },
  addButton: {
    display: "block",
    width: "100%",
    marginTop: "20px",
    padding: "12px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#1E90FF",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    textTransform: "uppercase",
    transition: "opacity 0.2s",
  },
};

export default PapersPage;
