import { useState, useContext, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
// import axios from "axios";
import "./Auth.css";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { adminlogin, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.role === "admin") {
            navigate("/admindashboard"); // ✅ Redirect to admin dashboard if already logged in and user is admin
        } else if (user) {
            navigate("/dashboard"); // Redirect to regular dashboard if user is logged in but not admin
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await adminlogin(email, password);
            if (user?.role !=="admin") {
                toast.error("You do not have permission to access the admin dashboard.");
                return;
            }
            toast.success("Login successful! Redirecting to admin dashboard...");
            setTimeout(() => navigate("/admindashboard"));
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid credentials!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default AdminLogin;
