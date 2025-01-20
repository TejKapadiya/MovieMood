const User = require('../models/userModels.js')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();  // Add this line at the very top of your file
const jwt = require('jsonwebtoken');
const authMiddlewares = require('../middlewares/authMiddlewares.js');

// Register Endpoint
router.post('/register', async (req, res) => {
    try {
        console.log("called api==========", req.body);
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) throw new Error("User with this email id already exists");

        req.body.password = await bcrypt.hash(req.body.password, 10);

        await User.create(req.body);
        res.status(200).json({ message: "User successfully registered", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// Login Endpoint
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error("User does not exist");

        const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrectPassword) throw new Error("Invalid password");

        const token = jwt.sign({ userId: user._id }, "yoursecretkey", { expiresIn: "1d" });
        res.status(200).json({ message: "User logged in successfully", success: true, token });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// Protected Route: Get Current User
router.get('/get-current-user', authMiddlewares, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        res.status(200).json({ message: "User fetched successfully", success: true, data: user });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// Update User Details Endpoint (NEW ROUTE)
router.put('/update-user', authMiddlewares, async (req, res) => {
    try {
        // Get the data from request body
        const { name, email, phone, address } = req.body;

        // Check if the user exists
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Check if the new email is already taken by someone else
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: "Email is already in use", success: false });
            }
        }

        // Update the user's details (except password)
        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { name, email, phone, address }, // Only update fields provided
            { new: true, runValidators: true }  // `new: true` returns the updated user, `runValidators: true` ensures validation is applied
        );

        res.status(200).json({
            message: "User details updated successfully",
            success: true,
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

module.exports = router;
