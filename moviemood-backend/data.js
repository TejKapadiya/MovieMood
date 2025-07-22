const mongoose = require('mongoose');
const Movie = require('./models/Movie'); // Path to your Movie model

// Sample movie data
const movies = [
  {
];

// Connect to MongoDB
  .then(() => {
    console.log("Connected to MongoDB");

    // Insert the sample data into the 'movies' collection
    Movie.insertMany(movies)
      .then((result) => {
        console.log("Movies inserted:", result);
        mongoose.connection.close(); // Close the connection once done
      })
      .catch((err) => {
        console.error("Error inserting movies:", err);
      });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
