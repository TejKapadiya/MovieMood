import { useEffect, useState } from "react";
import { getUserReviews, editReview, deleteReview } from "../api/api";
import StarRating from "../components/StarRating";
import "./MyReviews.css";

function MyReviews() {
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(0);

        useEffect(() => {
        const fetchReviews = async () => {
        const data = await getUserReviews();
        console.log(data); // Log the data to verify its format
        setReviews(data);    
};

        fetchReviews();
    }, []);

    const startEdit = (review) => {
        setEditingReview(review._id);
        setNewComment(review.comment || ""); // Ensure comment is set to an empty string if undefined
        setNewRating(review.rating || 0); // Ensure rating is set to 0 if undefined
    };

    const handleEdit = async () => {
        // Make sure the review is edited only if there are changes
        if (newRating === 0 && !newComment.trim()) {
            return; // Don't save empty reviews
        }
        await editReview(editingReview, newRating, newComment);
        setReviews(reviews.map(r =>
            r._id === editingReview ? { ...r, rating: newRating, comment: newComment } : r
        ));
        setEditingReview(null);
    };

    const handleDelete = async (reviewId) => {
        await deleteReview(reviewId);
        setReviews(reviews.filter(r => r._id !== reviewId));
    };

    return (
        <div className="my-reviews">
            <h1>My Reviews</h1>
            {reviews.length === 0 ? (
                <p>No reviews yet.</p>
            ) : (
                reviews.map((review) => (
                    <div key={review._id} className="review">
                        <h3>{review.movie.title}</h3>
                        {editingReview === review._id ? (
                            <div>
                                <StarRating rating={newRating} setRating={setNewRating} />
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <button onClick={handleEdit}>Save</button>
                                <button onClick={() => setEditingReview(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <p>
                                    Rating: <StarRating rating={review.rating} setRating={() => {}} />
                                </p>
                                {review.comment && <p>{review.comment}</p>}
                                <button onClick={() => startEdit(review)}>Edit</button>
                                <button onClick={() => handleDelete(review._id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default MyReviews;
