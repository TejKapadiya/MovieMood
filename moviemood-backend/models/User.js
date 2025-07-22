// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    preferences: { type: [String], default: [] }, // User-selected 5 genres
    watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }], // Movies watched
    likedlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }], // Liked movies
    role: { type: String, enum: ["user", "admin", "manager"], default: "user" },
}, { timestamps: true });


// Hash password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


module.exports = mongoose.model("User", UserSchema);
