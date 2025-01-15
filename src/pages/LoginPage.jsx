import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        // login successful
        localStorage.setItem("userEmail", email);
        navigate("/home");
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Inline styles for convenience. You could move these into a separate .css file
  const pageStyle = {
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // You can swap backgroundColor for your own image or gradient:
    backgroundColor: "#000000", 
    backgroundImage: `url("https://via.placeholder.com/1200x800?text=Dark+Background")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "'Poppins', sans-serif",
  };

  const loginBoxStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "10px",
    padding: "40px 30px",
    width: "350px",
    boxShadow: "0 0 30px rgba(0, 0, 0, 0.8)",
    color: "#ffffff",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "1.8rem",
    marginBottom: "20px",
  };

  const inputWrapperStyle = {
    textAlign: "left",
    marginBottom: "20px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "5px",
    border: "none",
    fontSize: "1rem",
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "10px",
    backgroundColor: "#ffffff",
    color: "#000000",
    fontWeight: "bold",
  };

  const linkStyle = {
    color: "#ffffff",
    textDecoration: "underline",
  };

  const footerStyle = {
    marginTop: "20px",
    fontSize: "0.9rem",
    color: "#bbbbbb",
  };

  return (
    <div style={pageStyle}>
      <div style={loginBoxStyle}>
        <h2 style={titleStyle}>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={inputWrapperStyle}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div style={inputWrapperStyle}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" style={buttonStyle}>
            Log In
          </button>
        </form>
        <p style={footerStyle}>
          Don’t have an account?{" "}
          <a href="/signup" style={linkStyle}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'

// function LoginPage() {

//     // Add functionality here
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch("http://localhost:5000/api/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json "},
//                 body: JSON.stringify({ email, password })
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 // login was successful YAY
//                 // store user email in localStorage
//                 localStorage.setItem("userEmail", email);
//                 navigate("/home");
//             } else {
//                 alert(data.error);
//             }
//         } catch (err) {
//             console.error(err);
//         }
//     };


//     return (
//         <div style = {{ margin: "50px"}}>
//             <h2>Login Page</h2>
//             <form onSubmit={handleLogin}>
//                 <div>
//                     <label> Email: </label>
//                     <input 
//                         type = "email" 
//                         value = {email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>Password: </label>
//                     <input 
//                         type = "password"
//                         value = {password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit">Login</button>
//             </form>

//             <p> Don't have an account? <a href="/signup">Sign up </a></p>
//         </div>
//     );
// }

// export default LoginPage;