import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage()  {

    // Add functionality here
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({email, password})
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

    return (

        <div style={{margin: "50px"}} >
            <h2> Signup Page</h2>
            <form onSubmit={handleSignup}>
                <div>
                    <label>Email: </label>
                    <input  
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Sign up </button>
            </form>
        </div>
    );

}

export default SignupPage;