// controllers/userController.js
const User = require("../models/User");
const express = require("express");
const Review = require("../models/Review"); // ✅ Make sure you have a Review model
const Movie = require("../models/Movie");
const jwt = require("jsonwebtoken");
const { addReview, updateReview, deleteReview, getMovieReviews, getUserReviews } = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Get all users (Admin only)
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Update user profile (Authenticated users only)
exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params._id); // Get user from DB

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Update fields if provided
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.address = req.body.address || user.address;
        user.preferences = req.body.preferences || user.preferences; // Array of genres
        // Update password if provided
        if (req.body.password) {
            user.password = req.body.password; // Will be hashed by UserSchema.pre("save")
        }
        await user.save();
        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                preferences: user.preferences,
            },
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update user role (Admin only)
exports.updateUserRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.role = req.body.role;
        await user.save();

        res.status(200).json({ message: `User role updated to ${user.role}` });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete user (Admin only)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


exports.getUserReviews = async (req, res) => {
    console.log('hi1'); // Check if the function is being called

    try{
        // Check if req.user exists and has _id
        console.log('User:', req.user);
        
        if (!req.user || !req.user._id) {
            return res.status(400).json({ message: "User is not authenticated." });
        }
        // Query reviews for the logged-in user
        const reviews = await Review.find({ user: req.user._id }).populate("movie", "title");
        // Log reviews to verify
        console.log('Fetched reviews:', reviews);
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error); // Log the error for debugging
        res.status(500).json({ message: "Server error while fetching reviews." });
    }
};
