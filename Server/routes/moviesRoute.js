const Movie = require("../models/movieModels");
const express = require("express");
const router = express.Router();
const authMiddlewares = require("../middlewares/authMiddlewares");



// // GET route to fetch all movies with populated artists (hero, heroine, director)
// router.get("/api/movies", async (req, res) => {
//   try {
//     const movies = await Movie.find()
//       .populate("hero", "name") // Only include 'name' field for hero
//       .populate("heroine", "name") // Only include 'name' field for heroine
//       .populate("director", "name") // Only include 'name' field for director
//       .populate("createdBy", "name"); // Only include 'name' field for createdBy user
//     res.json(movies);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to fetch movies" });
//   }
// });


//Add movie

router.post("/add-movie", authMiddlewares, async (req, res) => {
  try {
    req.body.createdBy = req.userId;
    await Movie.create(req.body);
    res.status(200).json({ message: "Movie added sucessfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//get all movie
router.get("/", authMiddlewares, async (req, res) => {
  try {
    const movies = await Movie.find()
      .populate("hero", "name")
      .populate("heroine", "name")
      .populate("director", "name")
      .populate("createdBy", "name");
  //   const movies = await Movie.find().lean(); // Convert Mongoose documents to plain objects
  //   movies.forEach(movie => {
  // if (movie.createdBy && movie.createdBy.password) {
  //   delete movie.createdBy.password;
  // }});

    res.status(200).json({ movies, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//get movies by id

router.get("/:id", authMiddlewares, async (req, res) => {
  console.log("Hello========")
  try {
    console.log("movie",req.params)
    const movie = await Movie.findById(req.params.id)
      .populate("hero")
      .populate("heroine")
      .populate("director")
      .populate("createdBy");
      console.log("movieID=========",movie)
    res.status(200).json({ data:movie, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//Update movie
router.put("/:id", authMiddlewares, async (req, res) => {
  try {
    await Movie.findByIdAndUpdate(req.params.id);
    res
      .status(200)
      .json({ message: "Movie Updated sucessfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//Delete movie
router.delete("/:id", authMiddlewares, async (req, res) => {
  console.log("delete called")
    try {
      console.log("id in delete movie route",req.params.id)
      await Movie.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ message: "Movie Deleted sucessfully", success: true });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  });

  module.exports=router