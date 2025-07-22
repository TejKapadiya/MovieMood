import { createContext, useState, useEffect } from "react";
import { loginUser } from "../api/api";
import { jwtDecode } from "jwt-decode";
// import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            return decoded; // Store decoded token info (including role)
        }
        return null;
    });

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");

            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    setUser(decoded); // Store user info, including role
                } catch (error) {
                    console.error("Invalid Token:", error);
                    localStorage.removeItem("token");
                    setUser(null);
                }
            }
        };

        fetchUser();
    }, []);

    const login = async (email, password) => {
        const data = await loginUser(email, password);
        localStorage.setItem("token", data.token);
        const decoded = jwtDecode(data.token);
        setUser(decoded);  // Store user info including role
    };
    const adminlogin = async (email, password) => {
        const data = await loginUser(email, password);
        localStorage.setItem("token", data.token);
        const decoded = jwtDecode(data.token);
        setUser(decoded);  // Store user info including role
    };
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login,adminlogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
