// src/App.js
import React from "react"; // ✅ Required for JSX

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "./context/AuthContext.js";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";  // ✅ Ensure correct import
import AuthContext from "./context/AuthContext"; // ✅ Ensure this is imported
import { useContext } from "react";

import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import AdminLogin from "./pages/AdminLogin.js";
import Register from "./pages/Register";
// import { AuthProvider } from "./context/AuthContext";

import Movies from "./pages/Movies.js";
import MovieDetails from "./pages/MovieDetails";
import Dashboard from "./pages/Dashboard.js";
import MyReviews from "./pages/MyReviews.js";
import LikeList from "./pages/Likelist.js";
import Profile  from "./pages/Profile";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";  // ✅ Import ProtectedRoute
import Watchlist from "./pages/Watchedlist.js";
// import Profile from "./pages/Profile.js";
function App() {
    return (

        <AuthProvider>
            <ThemeProvider>

                <Router>
                    <Navbar />
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin" element={<AdminLogin />} />
                        <Route path="/register" element={<Register />} />

                        {/* Protected Routes */}
                        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/myreviews" element={<ProtectedRoute><MyReviews /></ProtectedRoute>} />
                        <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
                        <Route path="/likedlist" element={<ProtectedRoute><LikeList /></ProtectedRoute>} />
                        <Route path="/movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
                        {/* <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}

                        <Route path="/movies/:id" element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
                    </Routes>
                </Router>
            </ThemeProvider>

        </AuthProvider>



    );
}


export default App;

