// import React from "react";

// function LearningPage() {

//     // add functionality here 

//     return (

//         <div style={{margin: "50px"}}> 
//             <h2> LEARNING PAGE!!!</h2>
//             <form>
//                 <div>
//                     <label>What do you want to learn about: </label>
//                     <input
//                         type="Search"
//                     />
//                 </div>
//             </form>
//         </div>

//     );
// }

// export default LearningPage;

// import React, { useState } from "react";

// function LearningPage() {
//   const [topic, setTopic] = useState("");
//   const [papers, setPapers] = useState([]);
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleFetchPapers = () => {
//     // Example using a GET request with query param
//     // fetch(`http://localhost:5000/api/papers?topic=${encodeURIComponent(topic)}`)

//     // Or if you prefer POST:
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
//         // data should be the array of papers
//         setPapers(data);
//         setErrorMsg("");
//       })
//       .catch((err) => {
//         setPapers([]);
//         setErrorMsg(err.message);
//       });
//   };

//   return (
//     <div style={{ margin: "20px" }}>
//       <h2>Fetch Papers by Topic</h2>
//       <input
//         type="text"
//         placeholder="Enter a topic..."
//         value={topic}
//         onChange={(e) => setTopic(e.target.value)}
//         style={{ marginRight: "10px" }}
//       />
//       <button onClick={handleFetchPapers}>Get Papers</button>

//       {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

//       <div style={{ marginTop: "20px" }}>
//         <h3>Papers for topic: {topic}</h3>
//         <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//           {papers.map((paper, index) => (
//             <a
//               key={index}
//               href={paper.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               style={{
//                 display: "inline-block",
//                 padding: "10px 20px",
//                 backgroundColor: "#007BFF",
//                 color: "#fff",
//                 textDecoration: "none",
//                 borderRadius: "5px",
//                 fontWeight: "bold",
//                 width: "fit-content",
//               }}
//             >
//               {paper.title} ({paper.authors})
//             </a>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LearningPage;


import React, { useState } from "react";

function LearningPage() {
    const [topic, setTopic] = useState("");
    const [papers, setPapers] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    const handleFetchPapers = () => {
        
    }
}