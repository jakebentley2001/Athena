import React, { useState } from "react";

function SearchPage() {

    // add functionality here 
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

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
                            <li key={paper._id || paper.id}>{paper.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SearchPage;