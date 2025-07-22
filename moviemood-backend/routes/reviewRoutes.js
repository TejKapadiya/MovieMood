const express = require("express");
const Review = require("../models/Review"); // ✅ Make sure you have a Review model
const User = require("../models/User");
const Movie = require("../models/Movie");
const jwt = require("jsonwebtoken");
const { addReview, updateReview, deleteReview, getMovieReviews, getUserReviews } = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// ✅ Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// ✅ Submit a Review & rating
// router.post("/:movieId/review", verifyToken, async (req, res) => {
router.post("/:movieId", verifyToken, async (req, res) => {
    try {
        const { rating, comment } = req.body;
        // const { comment } = req.body;
        const { movieId } = req.params;

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const movie = await Movie.findById(movieId);
        if (!movie) return res.status(404).json({ message: "Movie not found" });

        const newReview = new Review({
            user: user._id,
            movie: movieId,
            rating,
            comment,
            // userName: user.name, // ✅ Store the reviewer's name
        }); 
        await newReview.save();
        console.log(newReview);
        // res.status(201).json(newReview);
        res.status(201).json({ message: "Review submitted", review: newReview });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
// router.get("/:movieId", getMovieReviews);
// router.get("/:movieId/user", protect, 

// ✅ Get reviews by user
router.get("/user/:userId", async (req, res) => {
    try {
        const reviews = await Review.find({ userId: req.params.userId });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ Edit a review
router.put("/:reviewId", async (req, res) => {
    try {
        const { text } = req.body;
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.reviewId,
            { text },
            { new: true }
        );
        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ Delete a review
router.delete("/:reviewId", async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.reviewId);
        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ Get Reviews for a Movie
router.get("/:movieId/reviews", async (req, res) => {
    try {
        const { movieId } = req.params;
        const reviews = await Review.find({ movie: movieId }).populate("user", "name");
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.post("/:movieId", verifyToken, addReview);
router.put("/:movieId", verifyToken, updateReview);



// ✅ Get all reviews for a movie
router.get("/:movieId", getMovieReviews);

// ✅ Get all reviews by a user (for "My Reviews" page)
router.get("/user/:userId", protect, getUserReviews);

// ✅ Submit a review (or update existing)
router.post("/:movieId", protect, addReview);

// ✅ Update a review
router.put("/:reviewId", protect, updateReview);

// ✅ Delete a review
router.delete("/:reviewId", protect, deleteReview);


module.exports = router;
