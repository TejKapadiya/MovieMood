import { useContext } from "react";
import { useEffect, useState } from "react";
import { getMovies } from "../api/api";
import AuthContext from "../context/AuthContext";
import ThemeContext from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const { darkMode } = useContext(ThemeContext);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const navigate = useNavigate(); // ✅ Hook for navigation
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getMovies();
                setMovies(data || []);
            } catch (error) {
                console.error("Error fetching movies:", error);
                setError("Failed to load movies.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleAddToWatchlist = (movieId) => {
        // TODO: Implement add to watchlist functionality
        console.log(`Add to Watchlist: ${movieId}`);
    };

    const handleLikeMovie = (movieId) => {
        // TODO: Implement like movie functionality
        console.log(`Like Movie: ${movieId}`);
    };
    return (
        <div className={`dashboard ${darkMode ? "dark-mode" : ""}`}>
            <div className="dashboard-card">
                <h1>🎬 MovieMood Dashboard</h1>
                <div className="user-info">
                    {/* <img src="https://via.placeholder.com/100" alt="User Avatar" className="user-avatar" /> */}
                    <h2>{user.name || "Guest"}</h2>
                    <p>Welcome back, {user?.name || "Guest"}! Manage your movies & reviews.</p>
                </div>
               
                <div className="dashboard-actions">
                    <button className="dashboard-btn" onClick={() => navigate("/my-reviews")}>📜 My Reviews</button>
                    <button className="dashboard-btn" onClick={() => navigate("/movies")}>🎥 Browse Movies</button>
                    <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
                </div>
            </div>
            <div className="movie-container">
                    {movies.length === 0 ? (
                        <p>No movies found.</p>
                    ) : (
                        movies.map((movie) => (
                            <div key={movie._id} className="movie-card">
                                <img src={movie.poster} alt={movie.title} className="movie-poster" />
                                <h3 className="movie-title">{movie.title}</h3>
                                <button
                                    className="details-button"
                                    onClick={() => navigate(`/movies/${movie._id}`)} // ✅ Navigate to details page
                                >
                                    View Details
                                </button>

                                <button
                                    className="watchlist-button"
                                    onClick={() => handleAddToWatchlist(movie._id)}
                                >
                                    ➕ Add to Watchlist
                                </button>
                                <button
                                    className="like-button"
                                    onClick={() => handleLikeMovie(movie._id)}
                                >
                                    ❤️ Like
                                </button>
                            </div>
                        ))
                    )}
                </div>
        </div>
    );
}

export default Dashboard;
