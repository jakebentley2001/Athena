
// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom'

// function LearningPage() {
//     const [topic, setTopic] = useState("");
//     const [papers, setPapers] = useState([]);
//     const [errorMsg, setErrorMsg] = useState("");
//     const [addedPapers, setAddedPapers] = useState([]);

//     const userEmail = localStorage.getItem("userEmail");

//     const navigate = useNavigate();

//     const handlePaperClick = (paperTitle) => {
//         navigate(`/papers/${paperTitle}`)
//     }

//     const handleFetchPapers = () => { 

//         fetch("http://localhost:5000/api/papers/learning", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({topic}),
//         })
//             .then((res) => {
//                 if (!res.ok) {
//                     return res.json().then((data) => {
//                         throw new Error(data.error || "Unknown error");
//                     });
//                 }
//                 return res.json();
//             })
//             .then((data) => {
//                 setPapers(data);
//                 setErrorMsg("");
//             })
//             .catch((err) => {
//                 setPapers([]);
//                 setErrorMsg(err.message);
//             });

//     };

//     const handleButtonClick = async (paperTitle) => {
//         try {
//             console.log("HELLL0", userEmail);
//             const response = await fetch(
//                 `http://localhost:5000/api/papers/find_paper/${userEmail}`, 
//                 {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({title: paperTitle}),
//                 });

//             console.log("Goodbye");

//             if (!response.ok) {
//                 throw new Error("Failed to send paper title to the backend");
//             }

//             setAddedPapers((prev) => [...prev, paperTitle]);

//             const data = await response.json();
//             console.log("Backend response", data);
//             //alert(`Succesffully sent: ${paperTitle}`);
//         } catch (error) {
//             console.error("error", error);
//             alert("Error sending paper");
//         }
//     };

//     return (
//         <div style={{ margin: "20px"}} >
//             <h2>Fetch Papers by Topic</h2>
//             <input
//                 type = "text"
//                 placeholder="Enter a topic..."
//                 value = {topic}
//                 onChange={(e) => setTopic(e.target.value)}
//                 style={{marginRight:"10pox"}}
//             />
//             <button onClick={handleFetchPapers}>Get Papers</button>
//             {errorMsg && <p style={{color:"red"}}>{errorMsg}</p>}

//             <div style = {{ marginTop: "20px"}}>
//                 <h3> Papers for topic: {topic}</h3>
//                 <div style = {{display: "flex", flexDirection: "column", gap: "10px"}}>
//                     {papers.map((paper,index) => {
//                         const isAdded = addedPapers.includes(paper.title);
//                         return ( 
//                     <div key={index} style={{ display: "flex", gap: "10px" }}>            
//                         <button
//                             onClickCapture={() => {
//                                 if (isAdded) {
//                                     handlePaperClick(paper.title)
//                                 }
//                             }}
//                             style={{
//                             padding: "10px 20px",
//                             backgroundColor: isAdded ? "orange" : "#007BFF",
//                             color: "#fff",
//                             border: "none",
//                             borderRadius: "5px",
//                             cursor: "pointer",
//                             }}
//                         >
//                             {paper.title} ({paper.authors})
//                         </button>

//                         {/* Add button that calls the "add" backend route */}
//                         {!isAdded && (
//                         <button
//                             onClick={() => handleButtonClick(paper.title)}
//                             style={{
//                             padding: "8px 15px",
//                             backgroundColor: "#28a745",
//                             color: "#fff",
//                             border: "none",
//                             borderRadius: "5px",
//                             cursor: "pointer",
//                             }}
//                         >
//                             Add
//                         </button>
//                         )}
//                         </div>
//                     );
//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default LearningPage;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function LearningPage() {
//   const [topic, setTopic] = useState("");
//   const [papers, setPapers] = useState([]);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [addedPapers, setAddedPapers] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const userEmail = localStorage.getItem("userEmail");
//   const navigate = useNavigate();

//   // Navigate to specific paper's details
//   const handlePaperClick = (paperTitle) => {
//     navigate(`/papers/${paperTitle}`);
//   };

//   // Fetch papers by topic
//   const handleFetchPapers = () => {
//     setIsLoading(true); // Start loading state

//     fetch("http://localhost:5000/api/papers/learning", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ topic }),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           return res.json().then((data) => {
//             throw new Error(data.error || "Unknown error");
//           });
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setPapers(data);
//         setErrorMsg("");
//       })
//       .catch((err) => {
//         setPapers([]);
//         setErrorMsg(err.message);
//       })
//       .finally(() => setIsLoading(false)); // End loading state
//   };

//   // “Add” paper on the backend
//   const handleButtonClick = async (paperTitle) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/papers/find_paper/${userEmail}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ title: paperTitle }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to send paper title to the backend");
//       }

//       // Mark paper as added locally
//       setAddedPapers((prev) => [...prev, paperTitle]);
//       const data = await response.json();
//       console.log("Backend response:", data);
//       // Optional: alert(`Successfully added: ${paperTitle}`);
//     } catch (error) {
//       console.error("Error adding paper:", error);
//       alert("Error adding paper");
//     }
//   };

//   // Navigate back home
//   const handleHomeClick = () => {
//     navigate("/home");
//   };

//   return (
//     <div style={styles.pageContainer}>
//       {/* Inline keyframes for the spinner (we can’t do keyframes purely inline) */}
//       <style>
//         {`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}
//       </style>

//       {/* Top Bar */}
//       <header style={styles.headerBar}>
//         <h1 style={styles.headerTitle}>Learning Page</h1>
//         <button style={styles.homeButton} onClick={handleHomeClick}>
//           Home
//         </button>
//       </header>

//       {/* Main Content */}
//       <div style={styles.mainSection}>
//         <div style={styles.contentContainer}>
//           {/* If loading, show spinner & message */}
//           {isLoading ? (
//             <div style={styles.loadingContainer}>
//               <div style={styles.spinner}></div>
//               <p style={styles.loadingText}>Generating learning plan...</p>
//             </div>
//           ) : (
//             <>
//               {/* Topic Input & Fetch Button */}
//               <div style={styles.formRow}>
//                 <input
//                   type="text"
//                   placeholder="Enter a topic..."
//                   value={topic}
//                   onChange={(e) => setTopic(e.target.value)}
//                   style={styles.formInput}
//                 />
//                 <button onClick={handleFetchPapers} style={styles.fetchButton}>
//                   Get Learning Plan
//                 </button>
//               </div>

//               {/* Error Message */}
//               {errorMsg && <p style={styles.errorText}>{errorMsg}</p>}

//               {/* Papers List */}
//               <div style={styles.papersContainer}>
//                   <div style={styles.papersList}>
//                     {papers.map((paper, index) => {
//                       const isAdded = addedPapers.includes(paper.title);
//                       return (
//                         <div key={index} style={styles.paperRow}>
//                           <button
//                             onClickCapture={() => {
//                               if (isAdded) {
//                                 handlePaperClick(paper.title);
//                               }
//                             }}
//                             style={{
//                               ...styles.paperButton,
//                               backgroundColor: isAdded ? "orange" : "#007BFF",
//                             }}
//                           >
//                             {paper.title} ({paper.authors})
//                           </button>

//                           {!isAdded && (
//                             <button
//                               onClick={() => handleButtonClick(paper.title)}
//                               style={styles.addButton}
//                             >
//                               Add
//                             </button>
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- Inline Styles ---
// const styles = {
//   pageContainer: {
//     minHeight: "100vh",
//     margin: 0,
//     padding: 0,
//     display: "flex",
//     flexDirection: "column",
//     backgroundColor: "#1F1F1F", // Dark background
//     fontFamily: "'Poppins', sans-serif",
//   },
//   headerBar: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "rgba(255, 255, 255, 0.1)",
//     backdropFilter: "blur(8px)",
//     padding: "15px 20px",
//     boxShadow: "0 0 20px rgba(0, 0, 0, 0.8)",
//   },
//   headerTitle: {
//     margin: 0,
//     fontSize: "1.5rem",
//     color: "#fff",
//   },
//   homeButton: {
//     backgroundColor: "#444",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     padding: "10px 16px",
//     cursor: "pointer",
//     fontWeight: "bold",
//     transition: "opacity 0.2s",
//   },
//   mainSection: {
//     flex: 1,
//     display: "flex",
//     justifyContent: "center",
//     padding: "20px",
//     overflowY: "auto",
//   },
//   contentContainer: {
//     width: "90%",
//     maxWidth: "800px",
//     backgroundColor: "rgba(255, 255, 255, 0.1)",
//     backdropFilter: "blur(8px)",
//     borderRadius: "10px",
//     padding: "30px",
//     boxShadow: "0 0 30px rgba(0, 0, 0, 0.8)",
//     color: "#fff",
//   },
//   loadingContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     gap: "12px",
//     marginTop: "40px",
//   },
//   spinner: {
//     width: "40px",
//     height: "40px",
//     border: "4px solid #444",
//     borderTop: "4px solid #1E90FF",
//     borderRadius: "50%",
//     animation: "spin 1s linear infinite",
//   },
//   loadingText: {
//     color: "#ccc",
//     fontSize: "1.1rem",
//   },
//   formRow: {
//     display: "flex",
//     gap: "10px",
//     marginBottom: "20px",
//   },
//   formInput: {
//     flex: 1,
//     padding: "10px",
//     borderRadius: "5px",
//     border: "none",
//     fontSize: "1rem",
//     backgroundColor: "rgba(255,255,255,0.2)",
//     color: "#fff",
//     outline: "none",
//   },
//   fetchButton: {
//     padding: "10px 20px",
//     borderRadius: "5px",
//     border: "none",
//     backgroundColor: "#1E90FF",
//     color: "#fff",
//     fontWeight: "bold",
//     cursor: "pointer",
//     textTransform: "uppercase",
//   },
//   errorText: {
//     color: "#FF4444",
//     marginBottom: "20px",
//   },
//   papersContainer: {
//     marginTop: "10px",
//   },
//   papersTitle: {
//     marginBottom: "10px",
//     fontSize: "1.2rem",
//   },
//   noPapersText: {
//     margin: "20px 0",
//     color: "#ccc",
//   },
//   papersList: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//   },
//   paperRow: {
//     display: "flex",
//     gap: "10px",
//   },
//   paperButton: {
//     flex: 1,
//     padding: "10px 20px",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     fontWeight: "bold",
//     transition: "background-color 0.2s",
//   },
//   addButton: {
//     padding: "10px 20px",
//     backgroundColor: "#28a745", // green
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };

// export default LearningPage;










// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';

// function LearningPage() {
//   const [topic, setTopic] = useState("");
//   const [papers, setPapers] = useState({});
//   const [errorMsg, setErrorMsg] = useState("");
//   const [addedPapers, setAddedPapers] = useState([]);

//   const userEmail = localStorage.getItem("userEmail");
//   const navigate = useNavigate();

//   // Desired category order
//   const categoriesOrder = [
//     "Foundational and Overview Works",
//     "Core Techniques or Key Methods",
//     "Important Subtopics / Subfields",
//     "Advanced Topics and Ongoing Research",
//   ];

//   const handlePaperClick = (paperTitle) => {
//     navigate(`/papers/${paperTitle}`);
//   };

//   const handleFetchPapers = () => {
//     fetch("http://localhost:5000/api/papers/learning", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ topic }),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           return res.json().then((data) => {
//             throw new Error(data.error || "Unknown error");
//           });
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setPapers(data);
//         setErrorMsg("");
//       })
//       .catch((err) => {
//         setPapers({});
//         setErrorMsg(err.message);
//       });
//   };

//   const handleButtonClick = async (paperTitle) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/papers/find_paper/${userEmail}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ title: paperTitle }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to send paper title to the backend");
//       }

//       setAddedPapers((prev) => [...prev, paperTitle]);
//       const data = await response.json();
//       console.log("Backend response", data);
//     } catch (error) {
//       console.error("error", error);
//       alert("Error sending paper");
//     }
//   };

//   const handleHomeClick = () => {
//     navigate("/home");
//   };

//   return (
//     <div style={styles.pageContainer}>
//       {/* Top Navigation Bar */}
//       <header style={styles.headerBar}>
//         <h1 style={styles.headerTitle}>Learning</h1>
//         <button style={styles.homeButton} onClick={handleHomeClick}>
//           Home
//         </button>
//       </header>

//       <h2 style={styles.mainHeading}>Fetch Papers by Topic</h2>

//       {/* Input + Get Papers */}
//       <div style={styles.searchContainer}>
//         <input
//           type="text"
//           placeholder="Enter a topic..."
//           value={topic}
//           onChange={(e) => setTopic(e.target.value)}
//           style={styles.searchInput}
//         />
//         <button onClick={handleFetchPapers} style={styles.fetchButton}>
//           Get Papers
//         </button>
//       </div>

//       {/* Error message */}
//       {errorMsg && <p style={styles.errorMessage}>{errorMsg}</p>}

//       {/* Topic Heading */}
//       <div style={styles.topicWrapper}>
//         <h3 style={styles.topicHeading}>Papers for topic: {topic}</h3>

//         {/* Categories Container (centered) */}
//         <div style={styles.categoriesContainer}>
//           {categoriesOrder.map((category) => {
//             if (!papers[category]) {
//               return null;
//             }
//             const paperList = papers[category].papers || [];

//             return (
//               <div key={category} style={styles.categorySection}>
//                 <h4 style={styles.categoryTitle}>{category}</h4>

//                 {/* Paper Cards */}
//                 <div style={styles.paperCardsContainer}>
//                   {paperList.map((paper, index) => {
//                     const isAdded = addedPapers.includes(paper.title);
//                     return (
//                       <div key={index} style={styles.paperCard}>
//                         <button
//                           onClickCapture={() => {
//                             if (isAdded) {
//                               handlePaperClick(paper.title);
//                             }
//                           }}
//                           style={{
//                             ...styles.titleButton,
//                             backgroundColor: isAdded
//                               ? "#2196F3" // Blue if added
//                               : "#FFFFFF", // White if not added
//                             color: isAdded ? "#FFFFFF" : "#000000",
//                           }}
//                         >
//                           {paper.title}
//                         </button>

//                         {/* "Add" button if not already added */}
//                         {!isAdded && (
//                           <button
//                             onClick={() => handleButtonClick(paper.title)}
//                             style={styles.addButton}
//                             title="Add this paper"
//                           >
//                             Add
//                           </button>
//                         )}

//                         {/* Bullet Points */}
//                         {paper.bullet_points && paper.bullet_points.length > 0 && (
//                           <ul style={styles.bulletList}>
//                             {paper.bullet_points.map((point, bulletIndex) => (
//                               <li key={bulletIndex} style={styles.bulletItem}>
//                                 {point}
//                               </li>
//                             ))}
//                           </ul>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LearningPage;

// const styles = {
//   pageContainer: {
//     minHeight: "100vh",
//     margin: 0,
//     padding: 0,
//     backgroundColor: "#1E1E1E", // Dark background
//     color: "#FFFFFF",
//     fontFamily: "'Open Sans', sans-serif",
//   },
//   headerBar: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "rgba(255, 255, 255, 0.1)",
//     backdropFilter: "blur(8px)",
//     padding: "15px 20px",
//     boxShadow: "0 0 20px rgba(0, 0, 0, 0.8)",
//   },
//   headerTitle: {
//     margin: 0,
//     fontSize: "1.5rem",
//     color: "#fff",
//   },
//   homeButton: {
//     backgroundColor: "#444",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     padding: "10px 16px",
//     cursor: "pointer",
//     fontWeight: "bold",
//     transition: "opacity 0.2s",
//   },
//   mainHeading: {
//     marginBottom: "20px",
//     color: "#BBDEFB",
//     textAlign: "center",
//     marginTop: "20px",
//   },
//   searchContainer: {
//     marginBottom: "20px",
//     textAlign: "center",
//   },
//   searchInput: {
//     marginRight: "10px",
//     padding: "8px",
//     borderRadius: "4px",
//     border: "1px solid #444",
//     backgroundColor: "#2A2A2A",
//     color: "#FFFFFF",
//   },
//   fetchButton: {
//     padding: "8px 20px",
//     border: "none",
//     borderRadius: "4px",
//     backgroundColor: "#2196F3",
//     color: "#FFF",
//     cursor: "pointer",
//     fontWeight: "bold",
//   },
//   errorMessage: {
//     color: "#FF4E42",
//     textAlign: "center",
//   },
//   topicWrapper: {
//     marginTop: "20px",
//     textAlign: "center",
//     paddingBottom: "40px",
//   },
//   topicHeading: {
//     color: "#BBDEFB",
//     marginBottom: "20px",
//   },
//   categoriesContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   categorySection: {
//     width: "80%",
//     maxWidth: "1000px",
//     margin: "30px 0",
//     backgroundColor: "#2A2A2A",
//     borderRadius: "8px",
//     padding: "15px",
//   },
//   categoryTitle: {
//     marginBottom: "10px",
//     color: "#90CAF9",
//     textAlign: "center",
//   },
//   paperCardsContainer: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "20px",
//     justifyContent: "center",
//     marginTop: "10px",
//   },
//   paperCard: {
//     flex: "0 0 250px", // ~250px wide card
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     gap: "10px",
//     padding: "10px",
//     border: "1px solid #3A3A3A",
//     borderRadius: "6px",
//     backgroundColor: "#1F1F1F",
//   },
//   titleButton: {
//     width: "100%",
//     height: "50px", // Fixed height
//     border: "none",
//     borderRadius: "3px",
//     cursor: "pointer",
//     fontWeight: "bold",
//     fontFamily: "'Open Sans', sans-serif",
//     textAlign: "center",
//     overflow: "hidden",
//     whiteSpace: "nowrap",
//     textOverflow: "ellipsis", // Truncates if text is too long
//     transition: "background-color 0.3s ease",
//   },
//   addButton: {
//     backgroundColor: "transparent",
//     color: "#2196F3",
//     border: "none",
//     fontSize: "0.9rem",
//     cursor: "pointer",
//     fontWeight: "bold",
//   },
//   bulletList: {
//     margin: 0,
//     paddingLeft: "20px",
//     listStyleType: "disc",
//     textAlign: "left",
//     width: "100%",
//   },
//   bulletItem: {
//     marginBottom: "6px",
//     lineHeight: "1.4",
//   },
// };



import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function LearningPage() {
  const [topic, setTopic] = useState("");
  const [papers, setPapers] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [addedPapers, setAddedPapers] = useState([]);

  // Loading-related states
  const [isLoading, setIsLoading] = useState(false);
  const loadingMessages = [
    "Working on your learning journey",
    "Gathering Resources",
    "Become an expert in everything",
  ];
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  // Desired category order
  const categoriesOrder = [
    "Foundational and Overview Works",
    "Core Techniques or Key Methods",
    "Important Subtopics / Subfields",
    "Advanced Topics and Ongoing Research",
  ];

  // Cycle through loading messages every 4 seconds
  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
      }, 4000);
    } else {
      setLoadingMessageIndex(0);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isLoading, loadingMessages]);

  const handlePaperClick = (paperTitle) => {
    navigate(`/papers/${paperTitle}`);
  };

  const handleFetchPapers = () => {
    // Turn loading on
    setIsLoading(true);

    fetch("http://localhost:5000/api/papers/learning", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.error || "Unknown error");
          });
        }
        return res.json();
      })
      .then((data) => {
        setPapers(data);
        setErrorMsg("");
        // Turn loading off on success
        setIsLoading(false);
      })
      .catch((err) => {
        setPapers({});
        setErrorMsg(err.message);
        // Turn loading off on error
        setIsLoading(false);
      });
  };

  const handleButtonClick = async (paperTitle) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/papers/find_paper/${userEmail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: paperTitle }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send paper title to the backend");
      }

      setAddedPapers((prev) => [...prev, paperTitle]);
      const data = await response.json();
      console.log("Backend response", data);
    } catch (error) {
      console.error("error", error);
      alert("Error sending paper");
    }
  };

  const handleHomeClick = () => {
    navigate("/home");
  };

  return (
    <div style={styles.pageContainer}>
      {/* Top Navigation Bar */}
      <header style={styles.headerBar}>
        <h1 style={styles.headerTitle}>Learning</h1>
        <button style={styles.homeButton} onClick={handleHomeClick}>
          Home
        </button>
      </header>

      <h2 style={styles.mainHeading}>Fetch Papers by Topic</h2>

      {/* Input + Get Papers */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Enter a topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={handleFetchPapers} style={styles.fetchButton}>
          Get Papers
        </button>
      </div>

      {/* Error message */}
      {errorMsg && <p style={styles.errorMessage}>{errorMsg}</p>}

      {/* Loading Indicator */}
      {isLoading && (
        <div style={styles.loadingContainer}>
          {/* Spinner */}
          <div style={styles.spinner} />
          {/* Cycling text */}
          <p style={styles.loadingText}>
            {loadingMessages[loadingMessageIndex]}
          </p>
        </div>
      )}

      {/* Topic and Papers (only show if NOT loading) */}
      {!isLoading && (
        <div style={styles.topicWrapper}>
          <h3 style={styles.topicHeading}>Papers for topic: {topic}</h3>

          {/* Categories Container (centered) */}
          <div style={styles.categoriesContainer}>
            {categoriesOrder.map((category) => {
              if (!papers[category]) return null;

              const paperList = papers[category].papers || [];

              return (
                <div key={category} style={styles.categorySection}>
                  <h4 style={styles.categoryTitle}>{category}</h4>

                  {/* Paper Cards */}
                  <div style={styles.paperCardsContainer}>
                    {paperList.map((paper, index) => {
                      const isAdded = addedPapers.includes(paper.title);
                      return (
                        <div key={index} style={styles.paperCard}>
                          <button
                            onClickCapture={() => {
                              if (isAdded) {
                                handlePaperClick(paper.title);
                              }
                            }}
                            style={{
                              ...styles.titleButton,
                              backgroundColor: isAdded
                                ? "#2196F3" // Blue if added
                                : "#FFFFFF", // White if not added
                              color: isAdded ? "#FFFFFF" : "#000000",
                            }}
                          >
                            {paper.title}
                          </button>

                          {/* "Add" button if not already added */}
                          {!isAdded && (
                            <button
                              onClick={() => handleButtonClick(paper.title)}
                              style={styles.addButton}
                              title="Add this paper"
                            >
                              Add
                            </button>
                          )}

                          {/* Bullet Points */}
                          {paper.bullet_points &&
                            paper.bullet_points.length > 0 && (
                              <ul style={styles.bulletList}>
                                {paper.bullet_points.map(
                                  (point, bulletIndex) => (
                                    <li key={bulletIndex} style={styles.bulletItem}>
                                      {point}
                                    </li>
                                  )
                                )}
                              </ul>
                            )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default LearningPage;

// Styling
const styles = {
  pageContainer: {
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    backgroundColor: "#1E1E1E", // Dark background
    color: "#FFFFFF",
    fontFamily: "'Open Sans', sans-serif",
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
  mainHeading: {
    marginBottom: "20px",
    color: "#BBDEFB",
    textAlign: "center",
    marginTop: "20px",
  },
  searchContainer: {
    marginBottom: "20px",
    textAlign: "center",
  },
  searchInput: {
    marginRight: "10px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #444",
    backgroundColor: "#2A2A2A",
    color: "#FFFFFF",
  },
  fetchButton: {
    padding: "8px 20px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#2196F3",
    color: "#FFF",
    cursor: "pointer",
    fontWeight: "bold",
  },
  errorMessage: {
    color: "#FF4E42",
    textAlign: "center",
  },
  // Loading Styles
  loadingContainer: {
    textAlign: "center",
    margin: "20px 0",
  },
  spinner: {
    display: "inline-block",
    width: "50px",
    height: "50px",
    border: "4px solid #ffffff",
    borderBottomColor: "transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite", // keyframes reference
  },
  loadingText: {
    marginTop: "10px",
    fontSize: "1rem",
    color: "#BBDEFB",
  },
  topicWrapper: {
    marginTop: "20px",
    textAlign: "center",
    paddingBottom: "40px",
  },
  topicHeading: {
    color: "#BBDEFB",
    marginBottom: "20px",
  },
  categoriesContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  categorySection: {
    width: "80%",
    maxWidth: "1000px",
    margin: "30px 0",
    backgroundColor: "#2A2A2A",
    borderRadius: "8px",
    padding: "15px",
  },
  categoryTitle: {
    marginBottom: "10px",
    color: "#90CAF9",
    textAlign: "center",
  },
  paperCardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    marginTop: "10px",
  },
  paperCard: {
    flex: "0 0 250px", // ~250px wide card
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    border: "1px solid #3A3A3A",
    borderRadius: "6px",
    backgroundColor: "#1F1F1F",
  },
  titleButton: {
    width: "100%",
    height: "50px", // Fixed height
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    fontWeight: "bold",
    fontFamily: "'Open Sans', sans-serif",
    textAlign: "center",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis", // Truncates if text is too long
    transition: "background-color 0.3s ease",
  },
  addButton: {
    backgroundColor: "transparent",
    color: "#2196F3",
    border: "none",
    fontSize: "0.9rem",
    cursor: "pointer",
    fontWeight: "bold",
  },
  bulletList: {
    margin: 0,
    paddingLeft: "20px",
    listStyleType: "disc",
    textAlign: "left",
    width: "100%",
  },
  bulletItem: {
    marginBottom: "6px",
    lineHeight: "1.4",
  },

  /* 
   * Keyframes for spinner rotation 
   * Note: Inline styles don't directly support "@keyframes".
   *       To make this work seamlessly, place this in your CSS file 
   *       or within a global <style> block.
   */
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)"
    },
    "100%": {
      transform: "rotate(360deg)"
    },
  },
};
