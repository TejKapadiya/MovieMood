// routes/movieRoutes.js
const express = require("express");
const { upload } = require("../config/cloudinary");
const { protect } = require("../middleware/authMiddleware");
const { isManager, isAdmin } = require("../middleware/roleMiddleware");
const {addMovie,getMovieByTitle,MovieByTitle, updateMovie, deleteMovie, getMovies, getMovieById, searchMovies} = require("../controllers/movieController");

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.get("/title/:title", getMovieByTitle);
router.post("/titles", MovieByTitle); // POST method for array of titles

router.post("/search", searchMovies);

router.post("/", protect, isAdmin, upload.single("poster"), addMovie);
router.put("/:id", protect, isAdmin, upload.single("poster"), updateMovie);
router.delete("/:id", protect, isAdmin, deleteMovie);  // Only Admins can delete

module.exports = router;
