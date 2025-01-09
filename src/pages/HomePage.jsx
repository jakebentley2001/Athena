import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    const handleFirstButton = () => {
        navigate("/papers");
    };

    const handleSecondButton = () => {
        navigate("/learning");
    }

    return (
        <div style={{ margin: "50px"}}>
            <h2>Home Page</h2>
            <button onClick={handleFirstButton} style = {{width: "200px", height: "100px", marginRight: "10px"}}>
                Papers
            </button>
            <button onClick={handleSecondButton} style = {{width: "200px", height: "100px", marginRight: "10px"}}>
                Learning
            </button>
        </div>
    );

}

export default HomePage;
