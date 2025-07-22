// src/api/api.js
import { jwtDecode } from "jwt-decode";
import axios from "axios";
// import { Search } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: API_URL,
});

export const registerUser = async (name, email, password) => {
    const response = await api.post("/auth/register", { name, email, password });
    return response.data;
};

export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/auth/login", { email, password });
        return response.data;
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        return { error: error.response?.data?.message || "Login failed" };
    }
};

// export const getMovies = () => api.get("/movies");
export const getMovies = async () => {
    const response = await api.get("/movies");
    // console.log("response",response.data);
    return response.data;
};


// export const getMovieDetails = (id) => api.get(`/movies/${id}`);
export const getMovieDetails = async (id) => {
    try {
        const response = await api.get(`/movies/${id}`);
        return response.data;
    } catch (error) {
        console.error("API Error fetching movie:", error.response?.data || error.message);
        throw error;
    }
};

// Function to update user profile
export const updateUserProfile = async (userId, userData, token) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Send token for authentication
            },
        };

        const response = await axios.put(`/profile/${userId}`, userData, config);
        return response.data;
    } catch (error) {
        console.error("Error updating profile:", error.response?.data?.message || error.message);
        throw error.response?.data || { message: "Something went wrong" };
    }
};



// export const editReview = async (reviewId, text) => {
//     const response = await api.put(`/reviews/${reviewId}`, { text });
//     return response.data;
// };

export const deleteReview = async (reviewId) => {
    await api.delete(`/reviews/${reviewId}`);
};

export const postReview = async (movieId,rating, comment) => {
    const token = localStorage.getItem("token");
    if (!token) return { error: "Unauthorized" };

    try {
        const response = await api.post(
            `/reviews/${movieId}`,
            { rating,comment },  // ✅ Fix: Only send comment, user ID comes from token
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error submitting review:", error.response?.data && error.message);
        console.error("Error submitting review:", error);
        return { error: error.response?.data?.message || "Failed to submit review" };

    }
};


export const getMovieReview = async (movieId) => {
    try {
        const response = await api.get(`/reviews/${movieId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching reviews:", error.response?.data || error.message);
        return [];
    }
};





// ✅ Edit review function
export const editReview = async (reviewId, rating, comment) => {
    const token = localStorage.getItem("token");
    if (!token) return { error: "Unauthorized" };

    try {
        const response = await api.put(
            `/reviews/${reviewId}`,
            { rating, comment },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("Error editing review:", error.response?.data || error.message);
        return { error: error.response?.data?.message || "Failed to edit review" };
    }
};

export const getUserReviews = async () => {
    const token = localStorage.getItem("token");
    if (!token) return [];
    const decoded = jwtDecode(token);   
    const userid = decoded.id; 
    try {
        const response = await api.get(`/users/reviews/${userid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("review",response);
        return Array.isArray(response.data) ? response.data : []; // Ensuring it's an array
    } catch (error) {
        console.error("Error fetching user reviews:", error.response?.data || error.message);
        return []; // Return an empty array if there's an error
    }
};

export const getwatchlist=async ()=> {
    const token = localStorage.getItem("token");
    var response="";
    const decoded = jwtDecode(token);
    const userid = decoded.id; 
    console.log(userid);
    console.log("hello friends");
    if (!token) return [];
    try{
         response = await fetch("http://localhost:5000/api/watchlist/", {
            headers: { Authorization: `Bearer ${token}` }, // Send token for authentication
        });
        console.log("hello")
    let data = await response.json();
    console.log("hii data recieved");
    console.log(data);
    return data;
    }
    catch(e){
       throw new Error("Failed to fetch watchlist");
    }
    
    
};


export const setwatchlist=async (movieId)=> {
    const token = localStorage.getItem("token");
    var response="";
    const decoded = jwtDecode(token);
    const userid = decoded.id; 
    console.log(userid);
    console.log("hello friends");
    if (!token) return [];
    try {
        // ✅ Decode token to extract user ID
        const decoded = jwtDecode(token);
        const userId = decoded.id; 
        console.log("User ID:", userId);

        // ✅ Make a POST request to add the movie to the watchlist
        const response = await fetch(`http://localhost:5000/api/watchlist/${movieId}`, {
            method: "POST", // ✅ Use POST to add to watchlist
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to update watchlist: ${response.statusText}`);
        }

        // ✅ Parse response
        const data = await response.json();
        console.log("✅ Movie added to watchlist:", data);
        return data;
    } catch (error) {
        console.error("Error updating watchlist:", error.message);
        return null; // ✅ Return null instead of throwing an error
    }
};



export const removewatchlist = async (movieId) => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No token found. User not authenticated.");
        return null;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/watchlist/${movieId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to remove movie: ${response.statusText}`);
        }

        console.log("✅ Movie removed from watchlist");
        return true; // ✅ Successfully removed
    } catch (error) {
        console.error("Error removing movie:", error.message);
        return null;
    }
};

// Get the liked movies list
export const getLikelist = async () => {
    const token = localStorage.getItem("token");
    var response = "";
    const decoded = jwtDecode(token);
    const userid = decoded.id;
    console.log(userid);
    console.log("Fetching liked movies...");
    if (!token) return [];
    
    try {
        response = await fetch("http://localhost:5000/api/likelist", {
            headers: { Authorization: `Bearer ${token}` }, // Send token for authentication
        });
        console.log("Fetching data...");
        let data = await response.json();
        console.log("hii data recieved");
        console.log(data);
        return data;
    } catch (e) {
        throw new Error("Failed to fetch likelist");
    }
};

// Add a movie to the likelist
export const setLikelist = async (movieId) => {
    const token = localStorage.getItem("token");
    var response = "";
    const decoded = jwtDecode(token);
    const userid = decoded.id;
    console.log(userid);
    console.log("Adding to like list...");
    if (!token) return [];
    
    try {
        // Decode token to extract user ID
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        console.log("User ID:", userId);

        // Make a POST request to add the movie to the likelist
        response = await fetch(`http://localhost:5000/api/likelist/${movieId}`, {
            method: "POST", // Use POST to add to likelist
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to update likelist: ${response.statusText}`);
        }

        // Parse response
        const data = await response.json();
        console.log("✅ Movie added to likelist:", data);
        return data;
    } catch (error) {
        console.error("Error updating likelist:", error.message);
        return null; // Return null if something goes wrong
    }
};

// Remove a movie from the likelist
export const removelike = async (movieId) => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No token found. User not authenticated.");
        return null;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/likelist/${movieId}`, {
            method: "DELETE", // Use DELETE method
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to remove movie from likelist: ${response.statusText}`);
        }

        console.log("✅ Movie removed from likelist");
        return true; // Successfully removed
    } catch (error) {
        console.error("Error removing movie from likelist:", error.message);
        return null;
    }
};

export const Search = async (keyword) => {
    const response = await api.post("http://localhost:5000/api/movies/search/", { keyword });
    return response.data;
};
export const getRecommendations = async () => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found. User not authenticated.");
            return null;
        }
       
        // Fetch the watchlist
        let likelist = await getLikelist();
        let allmovies = await getMovies();
        // If likelist is empty, return an empty array
        if (!likelist || likelist.length === 0) {
            return allmovies;
        }
        
        // Get the last watched movie
        let lastMovie = likelist[likelist.length - 1];
        
        // Fetch recommended movies from the API
        const response = await fetch(`http://127.0.0.1:5000/recommend/${lastMovie.title}/10`,{
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        
        // // Check if response is OK
        if (!response.ok) {
            throw new Error("Failed to fetch recommendations");
        }
        
        // // Parse JSON response
        const recommendedMovies = await response.json();
        // // Extract only the titles
        const movieTitles = recommendedMovies.map(movie => movie.title);
        // Fetch recommended movies from the API
        const response1 = await fetch("http://localhost:5000/api/movies/titles",{
            method: "POST", // Use POST method for sending the titles
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body:  JSON.stringify({ titles: movieTitles })  
        });
        const recommendedMovies1 = await response1.json();

        // // Log or return the titles
        // console.log("in recommend ",recommendedMovies);
        console.log("in movie title  ",movieTitles);
        // recommendedMovies=[]
        const combinedMovies = [...recommendedMovies1,...allmovies];
        // Return the recommended movies
        console.log("type",typeof recommendedMovies); 
        console.log("allmovie", recommendedMovies); 
        
        return combinedMovies;
        return allmovies;

    } catch (error) {
        console.error("Error fetching recommendations:", error);
        return [];
    }
};



export default api;
