    import { useContext, useEffect, useRef, useState } from "react";
    import { Link, useNavigate } from "react-router-dom";
    import AuthContext from "../context/AuthContext";
    import ThemeContext from "../context/ThemeContext";
    import { Search, updateUserProfile } from "../api/api.js"; // 👈 update path as needed
    import "./Navbar.css";



    function Navbar() {
        const { user, logout } = useContext(AuthContext);
        const { darkMode, setDarkMode } = useContext(ThemeContext);
        const navigate = useNavigate();
        const [dropdownOpen, setDropdownOpen] = useState(false);
        const [keyword, setKeyword] = useState("");
        const [results, setResults] = useState([]);
        const searchRef = useRef(null);

        const handleLogout = () => {
            logout();
            navigate("/login");
        };

    // Handle outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setResults([]);  // Clear search results when clicked outside the search box
                setKeyword("");   // Clear the keyword
                // Only navigate away if the click is not on any of the nav items
                if (!event.target.closest(".nav-links")) {
                    navigate("/");  // Return to home/dashboard only if clicked outside the navbar
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [navigate]);


        // Handle search
        const handleSearchChange = async (e) => {
            const value = e.target.value;
            setKeyword(value);

            if (value.trim() === "") {
                setResults([]);
                return;
            }

            try {
                const response = await Search(value); // Pass keyword
                setResults(response); // Expecting an array of movie objects
            } catch (error) {
                console.error("Search error:", error);
                setResults([]);
            }
        };
        // const timeout = setTimeout(async (e) => {
        //     try {
        //         const value = e.target.value;
        //         const response = await Search(value);
        //         setResults(response); 
        //     } catch (error) {
        //         console.error("Search error:", error);
        //         setResults([]);
        //     }
        // }, 5000); // 500ms debounce time
        
       
        const handleMovieClick = (movieId) => {
            setResults([]);  // Clear search results
            setKeyword("");  // Clear the search bar
            navigate(`/movies/${movieId}`); // Navigate to the movie page
        };
        
        return (
            <nav className={`navbar ${darkMode ? "dark" : "light"}`}>
            <Link to="/" className="logo">🎬 MovieMood</Link>
        
            <div className="search-container">
        <input
            type="text"
            className="search-bar"
            placeholder="Search movies..."
            value={keyword}
            onChange={handleSearchChange}
        />
        {results.length > 0 && (
            <ul className="search-dropdown">
            {results.map((movie) => (
                <li key={movie._id}>
                <button onClick={() => handleMovieClick(movie._id)}>
                    {movie.title}
                </button>
                
                </li>
            ))}
            </ul>
        )}
        </div>
        
            <div className="nav-links">
            <Link to="/" className="nav-button">Movies</Link>
            {user && <Link to="/watchlist" className="nav-button">Watched List</Link>}
            {user && <Link to="/likedlist" className="nav-button">Liked Movies</Link>}
            {user && <Link to="/myreviews" className="nav-button">My Reviews</Link>}
        
            <button className="dark-mode-btn" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
        
            {user ? (
                <div className="user-section">
                <button className="user-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    👤 {user.name} ▼
                </button>
                {dropdownOpen && (
                    <div className="dropdown-menu">
                {/* <button className="logout-button" onClick={updateUserProfile}>profile</button> */}
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </div>
                )}
                </div>
            ) : (
                <div className="auth-links">
                <Link to="/login" className="nav-button">Login</Link>
                <Link to="/register" className="nav-button register-btn">Register</Link>
                </div>
            )}
            </div>
        </nav>
        
        );
    }

    export default Navbar;
