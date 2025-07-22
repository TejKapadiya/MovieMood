import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, postReview, getMovieReview } from "../api/api";
import AuthContext from "../context/AuthContext";
import StarRating from "../components/StarRating";
import "./MovieDetails.css";

function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rating, setRating] = useState(0);
    // const [review, setReview] = useState([]);
    // const [review, setReview] = useState([]);
    const [reviewError, setReviewError] = useState("");
    const [review, setReview] = useState(null);
    const [review1,setreview1]=useState("");

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const   data = await getMovieDetails(id);
                setMovie(data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
                setError("Failed to load movie details.");
            }
        };
    
    const fetchReview = async () => {
        try {
            const reviewData = await getMovieReview(id);
            console.log("Review fetched:", reviewData);  // Check if this logs the correct review data
            setReview(Array.isArray(reviewData) ? reviewData : []);  // Ensure it's an array
        } catch (error) {
            console.error("Error fetching review:", error);
            setReview([]);  // Handle error by setting review to an empty array
        }
    };
    
    
        const fetchData = async () => {
            await fetchMovie();
            await fetchReview();
            setLoading(false);
        };
    
        fetchData();
    }, [id]);
    

    const submitReview = async () => {
        if (!user) {
            alert("You must be logged in to submit a review.");
            return;
        }
        if (rating === 0) {
            setReviewError("Please select a rating before submitting.");
            return;
        }

        const response = await postReview(id, rating, review1);

        if (response.error) {
            setReviewError(response.error);
        } else {
            // setReview([...review, response.review]);
            const reviewData = await getMovieReview(id);
            setReview(reviewData);
            setreview1("")
            setRating(0);
            setReviewError("");
        }
    };

// Log the review state to check if it's updated
useEffect(() => {
    console.log("Review state:", review);
}, [review]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!movie) return <p>No movie data available.</p>;

    return (
        <div className="movie-details">
            <img src={movie.poster} alt={movie.title} className="details-poster" />
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>
            {/* <h3>Genres: {Array.isArray(movie.genre) ? movie.genre.join(", ") : "N/A"}</h3> */}
            <h3>Genres: {movie.genres || "N/A"}</h3>

            <h3>Vote count: {movie.vote_count || "Unknown"}</h3>

            {/* <h3>Rating: {movie.avgRating ? `${movie.avgRating} ⭐` : "No rating yet"}</h3> */}
            <h3>Rating: {movie["average rating"] ? `${movie["average rating"]} ⭐` : "No rating yet"}</h3>

            {/* ✅ Review Section */}
            <div className="review-section">
                <h3>Your Rating:</h3>
                <StarRating rating={rating} setRating={setRating} />
                <textarea
                    placeholder="Write your review here (optional)..."
                    value={review1}
                    onChange={(e) => setreview1(e.target.value)}
                />
                <button onClick={submitReview}>Submit</button>
                {reviewError && <p className="error">{reviewError}</p>}
            </div>

           {/* ✅ Display Existing Review */}
           <div className="review-list">
    <h2>User Review</h2>
    {review.length === 0 ? (
        <p>No review yet.</p>
    ) : (
        review.map((rev, index) => (
            <div key={index} className="review">
                <p><strong>{rev.user?.name || "Anonymous"}:</strong></p>
                <p>Rating: <StarRating rating={rev.rating} setRating={() => {}} /></p>
                {rev.comment && <p>{rev.comment}</p>}
            </div>
        ))
    )}
</div>



            <button className="back-button" onClick={() => navigate("/")}>
                Back to Home
            </button>
            <button className="my-review-button" onClick={() => navigate("/myreviews")}>
                My Review
            </button>
        </div>
    );
}

export default MovieDetails;
