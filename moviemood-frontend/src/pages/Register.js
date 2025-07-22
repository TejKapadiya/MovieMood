import { useState, useEffect,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";
import AuthContext from "../context/AuthContext";

import "./Auth.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
       const { user } = useContext(AuthContext);

    const navigate = useNavigate();
    useEffect(() => {
        if (user) navigate("/dashboard"); // ✅ Redirect if already logged in
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(name, email, password);
            navigate("/dashboard"); // Redirect to login after registering
        } catch (error) {
            alert("Registration failed.");
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
