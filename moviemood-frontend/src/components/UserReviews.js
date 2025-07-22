import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode'; // Import jwt-decode

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to get user ID from JWT token
    const getUserIdFromToken = () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      if (token) {
        const decoded = jwt_decode(token); // Decode the token
        return decoded.userId; // Assuming the user ID is stored as `userId` in the token
      }
      return null;
    };

    const fetchReviews = async () => {
      const userId = getUserIdFromToken(); // Get the user ID from the JWT token
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/reviews/${userId}`);
          setReviews(response.data);
          setLoading(false);
        } catch (err) {
          setError('Error fetching reviews.');
          setLoading(false);
        }
      } else {
        setError('User is not authenticated.');
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>User Reviews</h1>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              <h3>{review.movie.title}</h3>
              <p><strong>Rating:</strong> {review.rating}</p>
              <p><strong>Comment:</strong> {review.comment || 'No comment provided'}</p>
              <p><strong>Reviewed on:</strong> {new Date(review.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserReviews;
