import React from "react";
import "./StarRating.css";

const StarRating = ({ rating, setRating }) => {
    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={star <= rating ? "star filled" : "star"}
                    onClick={() => setRating(star)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
