import { useEffect, useState } from "react";
import { getLikelist, removelike } from "../api/api"; // ✅ Import API functions for like list
import { useNavigate } from "react-router-dom";
import "./LikeList.css"; // ✅ Ensure you have CSS for styling

function LikeList() {
    const [likelist, setLikelist] = useState([]); // Change to likelist
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("Fetching liked movies...");
        const fetchLikelist = async () => {
            try {
                const data = await getLikelist(); // Fetch liked movies
                console.log(data);
                setLikelist(data || []); // Set the liked movies
            } catch (error) {
                console.error("Error fetching liked list:", error);
                setError("Failed to load liked movies.");
            } finally {
                setLoading(false);
            }
        };

        fetchLikelist();
    }, []);

    const handleRemoveFromLikelist = async (movieId) => {
        try {
            await removelike(movieId); // Remove movie from the like list
            // ✅ Update the state by removing the movie from the local state
            setLikelist((prevLikelist) => prevLikelist.filter(movie => movie._id !== movieId));
        } catch (error) {
            console.error("Error removing movie from like list:", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="movie-container">
            <h2>Your Like List</h2>
            {likelist.length === 0 ? (
                <p>No movies in your like list.</p>
            ) : (
                likelist.map((movie) => (
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
                            onClick={() => handleRemoveFromLikelist(movie._id)}
                        >
                            ❤️ Remove Like
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default LikeList;
