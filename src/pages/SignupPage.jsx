import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("User created! You can now login");
        navigate("/");
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Inline styles (you can move them to a .css file)
  const pageStyle = {
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // Swap this out for your own custom background or image:
    backgroundColor: "#000000",
    backgroundImage: `url("https://via.placeholder.com/1200x800?text=Dark+Background")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "'Poppins', sans-serif",
  };

  const signupBoxStyle = {
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

  return (
    <div style={pageStyle}>
      <div style={signupBoxStyle}>
        <h2 style={titleStyle}>Sign Up</h2>
        <form onSubmit={handleSignup}>
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;


// import React, { useState} from 'react';
// import { useNavigate } from 'react-router-dom';

// function SignupPage()  {

//     // Add functionality here
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch("http://localhost:5000/api/signup", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json"},
//                 body: JSON.stringify({email, password})
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 alert("User created! You can now login");
//                 navigate("/");
//             } else {
//                 alert(data.error);
//             }
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     return (

//         <div style={{margin: "50px"}} >
//             <h2> Signup Page</h2>
//             <form onSubmit={handleSignup}>
//                 <div>
//                     <label>Email: </label>
//                     <input  
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>Password: </label>
//                     <input 
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit">Sign up </button>
//             </form>
//         </div>
//     );

// }

// export default SignupPage;