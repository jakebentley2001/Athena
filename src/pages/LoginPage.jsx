import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function LoginPage() {

    // Add functionality here
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json "},
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                // login was successful YAY
                // store user email in localStorage
                localStorage.setItem("userEmail", email);
                navigate("/home");
            } else {
                alert(data.error);
            }
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div style = {{ margin: "50px"}}>
            <h2>Login Page</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label> Email: </label>
                    <input 
                        type = "email" 
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input 
                        type = "password"
                        value = {password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>

            <p> Don't have an account? <a href="/signup">Sign up </a></p>
        </div>
    );
}

export default LoginPage;

// <form onSubmit={handleLogin}>
// <div>
//     <label> Email: </label>
//     <input 
//         type="email"
//         value = {email}
//         onChange={(e) => setEmail(e.target.value)}
//     />        
// </div>
// <div>
//     <label> Password: </label>
//     <input 
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//     />
// </div>
// <button type="submit">Login</button>
// </form> 