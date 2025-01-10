import React, { useState } from "react";

function SearchPage() {

    // add functionality here 
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const userEmail = localStorage.getItem("userEmail");
   

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        try {

            const response = await fetch(
                `http://localhost:5000/api/search_papers?query=${encodeURIComponent(searchTerm)}`
            );
            if (!response.ok) {
                throw new Error(`Failed to fetch. Status: $(response.status)`);
            }
            const data = await response.json();

            setSearchResults(data.results || [] );
        } catch (error) {
            console.error("Error searching papers: ", error);
        }
    };

    const sendToBackend = async (paper) => {
        try {
            const response = await fetch(`http://localhost:5000/api/save-paper/${userEmail}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ arxivId: paper.ArXiv, title: paper.title }),
            });

            const result = await response.json();
            alert(result.message || 'Paper saved successfully!');
        } catch (error) {
            console.error('Error saving papers:', error);
            alert('Failed to save the paper');
        }
    };

    return (

        <div style={{margin: "50px"}}> 
            <h2> Search Papers</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Search Papers: </label>
                    <input
                        type="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button type="submit">Search</button>
            </form>
            {searchResults.length > 0 && (
                <div style={{ marginTop: "20px"}}>
                    <h3>Results: </h3>
                    <ul>
                        {searchResults.map((paper) => (
                            <li key={paper.title}>
                                <button onClick={() => sendToBackend(paper)}
                                > 
                                    {paper.title} 
                                </button>   
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SearchPage;