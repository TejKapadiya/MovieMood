// controllers/movieController.js
const Movie = require("../models/Movie");
const { cloudinary } = require("../config/cloudinary");

// Get all movies
exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find().sort({ createdAt: -1 }).limit(50);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Get movie by ID
exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: "Movie not found" });
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getMovieByTitle = async (req, res) => {
    try {
        const movie = await Movie.findOne( {title: req.params.title });
        if (!movie) return res.status(404).json({ message: "Movie not found" });
        console.log("hi",movie);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


exports.MovieByTitle = async (req, res) => {
    try {
        // Extract the array of titles from the request body or query
        const titles = req.body.titles; // Assuming the titles are passed in the request body
        console.log("titles",titles);
        // Validate that the titles array is not empty
        if (!titles || !Array.isArray(titles) || titles.length === 0) {
            return res.status(400).json({ message: "Please provide a valid array of movie titles." });
        }

        // Find movies where the title matches any of the titles in the provided array
        const movies = await Movie.find({ title: { $in: titles } });

        // If no movies are found, return a 404 error
        if (movies.length === 0) {
            return res.status(404).json({ message: "No movies found for the given titles." });
        }

        // Return the found movies
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


// Add a movie
exports.addMovie = async (req, res) => {
    try {
        if (req.user.role !== "admin" && req.user.role !== "manager") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const { title, description, genre, releaseYear, cast } = req.body;
        if (!req.file) return res.status(400).json({ message: "Movie poster is required" });

        const newMovie = await Movie.create({
            title,
            description,
            genre: genre.split(","),  // Convert genre string to array
            releaseYear,
            poster: req.file.path,  // Cloudinary image URL
            cast: JSON.parse(cast), // [{ name, photo }]
        });

        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Update a movie
exports.updateMovie = async (req, res) => {
    try {
        if (req.user.role !== "admin" && req.user.role !== "manager") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: "Movie not found" });

        let updatedData = req.body;
        if (req.file) {
            await cloudinary.uploader.destroy(movie.poster);
            updatedData.poster = req.file.path;
        }

        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: "Movie not found" });

        await cloudinary.uploader.destroy(movie.poster);
        await movie.remove();
        
        res.status(200).json({ message: "Movie deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.searchMovies = async (req, res) => {
    try {
        const keyword = req.body.keyword;
        // console.log("Search Keyword:", keyword);

        if (!keyword || typeof keyword !== "string" || keyword.trim() === "") {
            return res.status(400).json({ message: "Keyword must be a non-empty string" });
        }

        // Prepare regex queries
        const searchQuery = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },          // Search in title
                // { genres: { $regex: keyword, $options: "i" } },         // Search in genres (string)
                // { cast: { $regex: keyword, $options: "i" } },           // Search in cast (string)
                // { director: { $regex: keyword, $options: "i" } },       // Search in director
                // { keywords: { $regex: keyword, $options: "i" } },       // Search in keywords
                // { overview: { $regex: keyword, $options: "i" } },       // Search in overview
                // { releaseYear: Number(keyword) || 0 }                   // Exact match for releaseYear (if number)
            ],
        };

        // Add releaseYear match only if keyword is a valid number
        const numericYear = Number(keyword);
        if (!isNaN(numericYear)) {
            searchQuery.$or.push({ releaseYear: numericYear });
        }
        const movies = await Movie.find(searchQuery);

        // Send matching movies as response
        res.status(200).json(movies);
    } catch (error) {
        console.error("Error searching movies:", error.message || error);
        res.status(500).json({ message: "Server Error", error: error.message || error });
    }
};
