const Review = require("../models/Review");
const Movie = require("../models/Movie");

// Get all reviews for a movie
exports.getMovieReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ movie: req.params.movieId })
            .populate("user", "name"); // ✅ Populate user's name

        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Server Error" });
    }
};


// ✅ Get all reviews by a user (for "My Reviews" page)
exports.getUserReviews = async (req, res) => {
    try {
        const reviews1 = await Review.find({ user: req.user.id }).populate("movie");

        const reviews = await Review.find({ user: req.user._id }).populate("movie", "title");
        res.status(200).json(reviews);
        console.log(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// ✅ Submit or Update a Review
exports.addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const movieId = req.params.movieId;
        const userId = req.user.id;  // ✅ Extract userId from JWT

        if (!rating) {
            return res.status(400).json({ message: "Rating is required." });
        }

        // ✅ Check if user already reviewed this movie
        let review = await Review.findOne({ movie: movieId, user: userId });

        if (review) {
            // ✅ If review exists, update it
            review.rating = rating;
            review.comment = comment || "";  // Allow empty comment
            await review.save();
        } else {
            // ✅ If no review, create a new one
            review = await Review.create({ 
                movie: movieId, 
                user: userId, 
                rating, 
                comment 
            });
        }

        // // ✅ Recalculate movie's average rating
        // const reviews = await Review.find({ movie: movieId });
        // const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
        // await Movie.findByIdAndUpdate(movieId, { avgRating: avgRating.toFixed(1) });

        res.status(201).json(review);
    } catch (error) {
        console.error("Review Submission Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};


// ✅ Update a review
exports.updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const review = await Review.findById(req.params.reviewId);

        if (!review || review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        review.rating = rating;
        review.comment = comment;
        await review.save();

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// ✅ Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId);

        if (!review || review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await review.remove();

        // ✅ Recalculate movie's average rating
        const reviews = await Review.find({ movie: review.movie });
        const avgRating = reviews.length ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0;
        await Movie.findByIdAndUpdate(review.movie, { avgRating: avgRating.toFixed(1) });

        res.status(200).json({ message: "Review deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
