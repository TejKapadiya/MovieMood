// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Thunk to fetch movies from the backend
// export const fetchMovies = createAsyncThunk(
//   'movies/fetchMovies',
//   async () => {
//     const response = await fetch('/api/movies'); // Update URL as needed
//     const data = await response.json();
//     return data;
//   }
// );

// const moviesSlice = createSlice({
//   name: 'movies',
//   initialState: {
//     movies: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMovies.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchMovies.fulfilled, (state, action) => {
//         state.loading = false;
//         state.movies = action.payload;
//       })
//       .addCase(fetchMovies.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//       // console.log("Movies from Redux:", movies);
//   },
  
// });

// export default moviesSlice.reducer;



// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // Fetch movies from the backend
// export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
//   try {
//     console.log("Fetching movies from API...");
//     const response = await fetch("/api/movies");

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("Movies fetched:", data);
//     return data;
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//     throw error; 
//   }
// });

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


//working movie fetch
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async (_, { getState, rejectWithValue }) => {
  try {
    console.log("Fetching movies from API...");

    // Get token from Redux store (if stored there)
    const token = getState().users.user?.token || localStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found! Please log in.");
    }

    // Add token in Authorization header
    const response = await fetch("/api/movies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` 
        // Add the token here
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Movies fetched:", data.movies);
    return data.movies || []; 
    // Ensure it's always an array
  } catch (error) {
    console.error("Error fetching movies:", error);
    return rejectWithValue(error.message);
  }
});

// export const fetchMovies = createAsyncThunk("movies/fetchMovies", async (_, { getState, rejectWithValue }) => {
//   try {
//     console.log("Fetching movies from API...");
//     const response = await fetch("/api/movies");

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("Movies fetched:", data);

//     return data.movies || []; // ✅ Ensure it's always an array
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//     return rejectWithValue(error.message);
//   }
// });



const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null; // ✅ Fix: Reset error on new request
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
        console.log("Movies from Redux:", state.movies); // ✅ Corrected placement
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch movies";
        console.error("Fetch Movies Error:", action.error);
      });
  },
});

export default moviesSlice.reducer;
