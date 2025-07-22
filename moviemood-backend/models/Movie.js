// models/Movie.js
const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: [String], required: true },
    releaseYear: { type: Number, required: true },
    poster: { type: String, required: true,default:"https://static.vecteezy.com/system/resources/previews/031/974/996/large_2x/modern-illustration-of-404-error-page-template-for-website-electric-plug-and-socket-unplugged-concept-of-electrical-theme-web-banner-disconnection-loss-of-connect-yellow-vector.jpg"}, // Cloudinary URL
    cast: [{ name: String, photo: String }], // Array of cast members
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who liked
}, { timestamps: true });


module.exports = mongoose.model("Movie", MovieSchema);
