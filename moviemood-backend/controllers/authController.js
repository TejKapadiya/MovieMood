// controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, name: user.name, email: user.email },  // ✅ Include `name`
        process.env.JWT_SECRET,
    );
};


//register user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, preferences, phone, address } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Email already registered" });

        const newUser = await User.create({ name, email, password, preferences, phone, address });

        res.status(201).json({
            token: generateToken(newUser), // ✅ Pass entire user object
            user: { id: newUser._id, name: newUser.name, email: newUser.email }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Backend Error" });
    }
};
