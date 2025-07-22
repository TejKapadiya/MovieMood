const User = require("../models/User");

exports.getlikelist = async (req, res) => {
    const user = await User.findById(req.user._id).populate("likedlist");
    res.status(200).json(user.likedlist);
};


exports.addToLikelist = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user.likedlist.includes(req.params.movieId)) {
        user.likedlist.push(req.params.movieId);
        await user.save();
    }
    res.status(200).json({ message: "Added to likelist" });
};

// Remove a movie from the likelist
exports.removeFromLikelist = async (req, res) => {
    try {
        // Find the user by their ID
        const user = await User.findById(req.user._id);
        // Ensure likelist is initialized as an empty array if it doesn't exist
        if (!user.likedlist) {
            return res.status(400).json({ message: "User has no likelist" });
        }
        // Remove the movie from the likelist using the movieId
        user.likedlist = user.likedlist.filter((id) => id.toString() !== req.params.movieId);
        // Save the updated user object to the database
        await user.save();
        // Respond with a success message
        res.status(200).json({ message: "Removed from likelist" });
    } catch (error) {
        console.error("Error removing from likelist:", error);
        res.status(500).json({ message: "Failed to remove from likelist" });
    }
};


