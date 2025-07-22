import { useEffect, useState } from "react";
import { getMovies, getwatchlist,setwatchlist ,setLikelist,getRecommendations } from "../api/api";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { set } from "mongoose";

function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedin1, setIslogedin1] = useState(!!localStorage.getItem("token")); // Directly set from localStorage

    const navigate = useNavigate(); // ✅ Hook for navigation

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const allmov = await getMovies();


                if (!isLoggedin1) {
                    const data = await getMovies();
                    setMovies(data || []);
                } else {
                    try {
                        const data =await  getRecommendations();
                        const watchedMovies = await getwatchlist();
                        const data1 = await getMovies();
                        // Subtract watchedMovies from data
                        const remainingMovies = data.filter(
                            (movie) => !watchedMovies.some((watched) => movie._id === watched._id)
                        );
                        console.log(data1);
                        setMovies(remainingMovies);
                        // setMovies(data1);
                    } catch (error) {
                        console.error("Error fetching watchlist:", error);
                        setError("Failed to load movies.");
                    }
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
                setError("Failed to load movies.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [isLoggedin1]); // ✅ `isLoggedin1` as a dependency

    const handleAddToWatchlist = (movieId) => {
        console.log(`Add to Watchlist: ${movieId}`);
        setwatchlist(movieId);
    };

    const handleLikeMovie = (movieId) => {
        console.log(`Like Movie: ${movieId}`);
        setLikelist(movieId);
    };
    console.log("movie",movies);
    if (movies.poster=="")
        {movies.poster="https://static.vecteezy.com/system/resources/previews/031/974/996/large_2x/modern-illustration-of-404-error-page-template-for-website-electric-plug-and-socket-unplugged-concept-of-electrical-theme-web-banner-disconnection-loss-of-connect-yellow-vector.jpg"}
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
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
                            onClick={() => navigate(`/movies/${movie._id}`)}
                        >
                            View Details
                        </button>

                        {/* ✅ Show buttons only if the user is logged in */}
                        {isLoggedin1 && (
                            <>
                                <button
                                    className="watchlist-button"
                                    onClick={() => handleAddToWatchlist(movie._id)}
                                >
                                    ➕
                                </button>
                                <button
                                    className="like-button"
                                    onClick={() => handleLikeMovie(movie._id)}
                                >
                                    ❤️
                                </button>
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;
