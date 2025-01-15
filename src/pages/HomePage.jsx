import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleFirstButton = () => {
    navigate("/papers");
  };

  const handleSecondButton = () => {
    navigate("/learning");
  };

  // Inline styles for demonstration (feel free to move them into a separate CSS file)
  const pageStyle = {
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    // Replace the placeholder below with your own dark background image or gradient
    backgroundImage: 'url("https://via.placeholder.com/1200x800?text=Dark+Background")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "'Poppins', sans-serif",
  };

  const containerStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "10px",
    padding: "40px 30px",
    width: "400px",
    boxShadow: "0 0 30px rgba(0, 0, 0, 0.8)",
    textAlign: "center",
    color: "#ffffff",
  };

  const titleStyle = {
    fontSize: "2rem",
    marginBottom: "30px",
  };

  const buttonsWrapperStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  };

  const buttonStyle = {
    border: "none",
    backgroundColor: "#ffffff",
    color: "#000",
    borderRadius: "5px",
    fontSize: "1rem",
    fontWeight: "bold",
    padding: "1rem 2rem",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  };

  // Optional hover style (if you move to a CSS file, you can use :hover).
  // For inline demonstration, you'd do it via a small onMouseEnter/onMouseLeave effect.
  // But we’ll keep it simple here.

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2 style={titleStyle}>Home Page</h2>
        <div style={buttonsWrapperStyle}>
          <button onClick={handleFirstButton} style={buttonStyle}>
            Papers
          </button>
          <button onClick={handleSecondButton} style={buttonStyle}>
            Learning
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// function HomePage() {
//     const navigate = useNavigate();

//     const handleFirstButton = () => {
//         navigate("/papers");
//     };

//     const handleSecondButton = () => {
//         navigate("/learning");
//     }

//     return (
//         <div style={{ margin: "50px"}}>
//             <h2>Home Page</h2>
//             <button onClick={handleFirstButton} style = {{width: "200px", height: "100px", marginRight: "10px"}}>
//                 Papers
//             </button>
//             <button onClick={handleSecondButton} style = {{width: "200px", height: "100px", marginRight: "10px"}}>
//                 Learning
//             </button>
//         </div>
//     );

// }

// export default HomePage;

