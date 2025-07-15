import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice } from "./loadersSlice";
import { userSlice } from "./usersSlice";
import moviesReducer from "./moviesSlice"; // ✅ Correct

const store=configureStore({
    reducer:{
        loaders:loaderSlice.reducer,
        users:userSlice.reducer,
        movies: moviesReducer, // Add movies slice here

    }
})
export default store;

// // src/redux/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import moviesReducer from './moviesSlice';
// import usersReducer from './usersSlice'; // Assuming you have usersSlice for user data

// const store = configureStore({
//   reducer: {
//     movies: moviesReducer,
//     users: usersReducer, // Ensure usersReducer is also in your store if it's managing user data
//   },
// });

// export default store;
