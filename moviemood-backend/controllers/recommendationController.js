// controllers/recommendationController.js
const Movie = require("../models/Movie");
const User = require("../models/User");

// Personalized Recommendations
exports.getRecommendations = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("watchlist likedMovies");
        
        if (!user) return res.status(404).json({ message: "User not found" });

        const genres = user.preferences;
        const likedMovieIds = user.likedMovies.map(m => m._id);
        const watchedMovieIds = user.watchlist.map(m => m._id);

        let recommendedMovies = await Movie.find({
            genre: { $in: genres },
            _id: { $nin: [...likedMovieIds, ...watchedMovieIds] }, // Exclude watched/liked movies
        }).limit(10);

        res.status(200).json(recommendedMovies);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Guest Recommendations (Top-rated movies by genre)
exports.getGuestRecommendations = async (req, res) => {
    try {
        const topMovies = await Movie.find().sort({ avgRating: -1 }).limit(10);
        res.status(200).json(topMovies);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
