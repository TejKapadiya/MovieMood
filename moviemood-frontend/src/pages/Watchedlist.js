import { useEffect, useState } from "react";
import { getwatchlist, removewatchlist } from "../api/api"; // ✅ Import API functions
import { useNavigate } from "react-router-dom";
import "./Watchlist.css"; // ✅ Ensure you have CSS for styling

function Watchlist() {
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        console.log("this is here");
        const fetchWatchlist = async () => {
            try {
                const data = await getwatchlist();
                setWatchlist(data || []);
            } catch (error) {
                console.error("Error fetching watchlist:", error);
                setError("Failed to load watchlist.");
            } finally {
                setLoading(false);
            }
        };

        fetchWatchlist();
    }, []);

    const handleRemoveFromWatchlist = async (movieId) => {
        try {
            await removewatchlist(movieId);
            // ✅ Update the state by removing the movie from the local state
            setWatchlist((prevWatchlist) => prevWatchlist.filter(movie => movie._id !== movieId));
        } catch (error) {
            console.error("Error removing movie from watchlist:", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="movie-container">
            <h2>Your Watched List</h2>
            {watchlist.length === 0 ? (
                <p>No movies in your Watched List.</p>
            ) : (
                watchlist.map((movie) => (
                    <div key={movie._id} className="movie-card">
                        <img src={movie.poster} alt={movie.title} className="movie-poster" />
                        <h3 className="movie-title">{movie.title}</h3>
                        <button
                            className="details-button"
                            onClick={() => navigate(`/movies/${movie._id}`)}
                        >
                            View Details
                        </button>

                        <button
                            className="remove-button"
                            onClick={() => handleRemoveFromWatchlist(movie._id)}
                        >
                            ❌ Remove
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default Watchlist;
