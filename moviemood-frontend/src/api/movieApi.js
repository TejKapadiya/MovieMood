import axios from "axios";

const API_URL = "http://localhost:5000/api/movies";

// Fetch all movies
export const fetchMovies = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
};

// Fetch a movie by ID
export const fetchMovieById = async (movieId) => {
    try {
        const response = await axios.get(`${API_URL}/${movieId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
};

// Search movies
export const searchMovies = async (keyword) => {
    try {
        const response = await axios.post(`${API_URL}/search`, { keyword });
        return response.data;
    } catch (error) {
        console.error("Error searching movies:", error);
        return [];
    }
};

// Add a movie (Admin/Manager only)
export const addMovie = async (movieData, token) => {
    try {
        const formData = new FormData();
        Object.keys(movieData).forEach((key) => formData.append(key, movieData[key]));

        const response = await axios.post(API_URL, formData, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error) {
        console.error("Error adding movie:", error);
    }
};

// Update a movie (Admin/Manager only)
export const updateMovie = async (movieId, updatedData, token) => {
    try {
        const formData = new FormData();
        Object.keys(updatedData).forEach((key) => formData.append(key, updatedData[key]));

        const response = await axios.put(`${API_URL}/${movieId}`, formData, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error) {
        console.error("Error updating movie:", error);
    }
};

// Delete a movie (Admin only)
export const deleteMovie = async (movieId, token) => {
    try {
        await axios.delete(`${API_URL}/${movieId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error("Error deleting movie:", error);
    }
};
