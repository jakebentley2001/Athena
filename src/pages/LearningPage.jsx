
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

function LearningPage() {
    const [topic, setTopic] = useState("");
    const [papers, setPapers] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    const [addedPapers, setAddedPapers] = useState([]);

    const userEmail = localStorage.getItem("userEmail");

    const navigate = useNavigate();

    const handlePaperClick = (paperTitle) => {
        navigate(`/papers/${paperTitle}`)
    }

    const handleFetchPapers = () => { 

        fetch("http://localhost:5000/api/papers/learning", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({topic}),
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
            })
            .catch((err) => {
                setPapers([]);
                setErrorMsg(err.message);
            });

    };

    const handleButtonClick = async (paperTitle) => {
        try {
            console.log("HELLL0", userEmail);
            const response = await fetch(
                `http://localhost:5000/api/papers/find_paper/${userEmail}`, 
                {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({title: paperTitle}),
                });

            console.log("Goodbye");

            if (!response.ok) {
                throw new Error("Failed to send paper title to the backend");
            }

            setAddedPapers((prev) => [...prev, paperTitle]);

            const data = await response.json();
            console.log("Backend response", data);
            alert(`Succesffully sent: ${paperTitle}`);
        } catch (error) {
            console.error("error", error);
            alert("Error sending paper");
        }
    };


    return (
        <div style={{ margin: "20px"}} >
            <h2>Fetch Papers by Topic</h2>
            <input
                type = "text"
                placeholder="Enter a topic..."
                value = {topic}
                onChange={(e) => setTopic(e.target.value)}
                style={{marginRight:"10pox"}}
            />
            <button onClick={handleFetchPapers}>Get Papers</button>
            {errorMsg && <p style={{color:"red"}}>{errorMsg}</p>}

            <div style = {{ marginTop: "20px"}}>
                <h3> Papers for topic: {topic}</h3>
                <div style = {{display: "flex", flexDirection: "column", gap: "10px"}}>
                    {papers.map((paper,index) => {
                        const isAdded = addedPapers.includes(paper.title);
                        return ( 
                    <div key={index} style={{ display: "flex", gap: "10px" }}>            
                        <button
                            onClickCapture={() => {
                                if (isAdded) {
                                    handlePaperClick(paper.title)
                                }
                            }}
                            style={{
                            padding: "10px 20px",
                            backgroundColor: isAdded ? "orange" : "#007BFF",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            }}
                        >
                            {paper.title} ({paper.authors})
                        </button>

                        {/* Add button that calls the "add" backend route */}
                        {!isAdded && (
                        <button
                            onClick={() => handleButtonClick(paper.title)}
                            style={{
                            padding: "8px 15px",
                            backgroundColor: "#28a745",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            }}
                        >
                            Add
                        </button>
                        )}
                        </div>
                    );
                    })}
                </div>
            </div>
        </div>
    );
}

export default LearningPage;
