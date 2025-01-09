import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


function PapersPage() {

    // Insert Functionality here
    const [papers, setPapers] = useState([]);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("userEmail");

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

    const handlePaperClick = (paperName) => {
        navigate(`/papers/${paperName}`);
    };

    const handleButtoneClick = () => {
        navigate("/search")
    };

    return (

        <div style={{margin: "50px"}}>
            <h2>Available Papers</h2>
            {papers.length === 0 ? (
                <p>No papers found</p>
            ) : (
                papers.map((paper, index) => (
                    <button
                        key={index}
                        onClick={() => handlePaperClick(paper.name)}
                        style = {{ display: "block", margin: "10px 0", width: "200px"}}
                    >
                        {paper.name}
                    </button>
                ))
            )}
            <button onClick={handleButtoneClick}>Add Papers</button>
        </div>
    );
}

export default PapersPage;