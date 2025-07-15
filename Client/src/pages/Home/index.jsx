// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMovies } from "../../redux/moviesSlice";
// // Assuming you have this slice created

// const Home = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.users); // Get user info from Redux
//   const { movies, loading, error } = useSelector((state) => state.movies); // Access movies data from Redux

//   useEffect(() => {
//     dispatch(fetchMovies()); // Dispatch the action to fetch movies when the component mounts
//   }, [dispatch]);

//   if (loading) return <div>Loading movies...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       {user?.name && <div>Welcome, {user.name}!</div>}
//       <div className="max-w-7xl mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-6 text-center">Movies</h1>
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//           {movies.map((movie) => (
//             <div key={movie._id} className="text-center">
//               {/* Check if movie has posters and display the first one */}
//               {movie.posters?.length > 0 ? (
//                 <img
//                   src={movie.posters[0]} // Display the first poster
//                   alt={movie.name}
//                   className="w-full h-auto rounded-lg shadow-md mb-2"
//                 />
//               ) : (
//                 <div className="w-full h-48 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
//                   <span>No Poster Available</span>
//                 </div>
//               )}
//               <h3 className="text-lg font-semibold">{movie.name}</h3>
//               {/* Optionally display other movie details like genre, director, etc. */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


// import React from 'react'
// import { useDispatch, useSelector } from "react-redux";

// // Sample movie data (you could fetch this from an API or CDN)
// const movies = [
//   {
//     name: 'Movie 1',
//     poster: 'https://res.cloudinary.com/de3s4ogbo/image/upload/v1737993426/movie-recommendation/lndhwprwtwzjf3ypohn2.png', // Replace with real CDN URLs
//   },
//   {
//     name: 'Movie 2',
//     poster: 'https://res.cloudinary.com/de3s4ogbo/image/upload/v1737993426/movie-recommendation/lndhwprwtwzjf3ypohn2.png',
//   },
//   {
//     name: 'Movie 3',
//     poster: 'https://res.cloudinary.com/de3s4ogbo/image/upload/v1737993426/movie-recommendation/lndhwprwtwzjf3ypohn2.png',
//   },
//   {
//     name: 'Movie 4',
//     poster: 'https://res.cloudinary.com/de3s4ogbo/image/upload/v1737993426/movie-recommendation/lndhwprwtwzjf3ypohn2.png',
//   },
//   // Add more movie objects as needed
// ];

// const Home = () => {
//   const {user}=useSelector((state)=>state.users)
//   return (
//       <div>{user?.name}
//     <div className="max-w-7xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">Movies</h1>
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//         {movies.map((movie, index) => (
//           <div key={index} className="text-center">
//             <img
//               src={movie.poster}
//               alt={movie.name}
//               className="w-full h-auto rounded-lg shadow-md mb-2"
//             />
//             <h3 className="text-lg font-semibold">{movie.name}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//     </div>
//   )
// }

// export default Home


// // src/pages/Home/index.jsx
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchMovies } from '../../redux/moviesSlice'; // Import fetchMovies action

// const Home = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.users); // Get user info from Redux
//   const { movies, loading, error } = useSelector((state) => state.movies); // Access movies data from Redux

//   // Fetch movies on component mount
//   useEffect(() => {
//     dispatch(fetchMovies());
//   }, [dispatch]);

//   if (loading) return <div>Loading movies...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       {user?.name && <div>Welcome, {user.name}!</div>}
//       <div className="max-w-7xl mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-6 text-center">Movies</h1>
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//           {movies.map((movie) => (
//             <div key={movie._id} className="text-center">
//               {/* Display movie poster */}
//               {movie.posters?.length > 0 ? (
//                 <img
//                   src={movie.posters[0]} // Display first poster
//                   alt={movie.name}
//                   className="w-full h-auto rounded-lg shadow-md mb-2"
//                 />
//               ) : (
//                 <div className="w-full h-48 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
//                   <span>No Poster Available</span>
//                 </div>
//               )}
//               {/* Display movie name */}
//               <h3 className="text-lg font-semibold">{movie.name}</h3>
//               {/* Optionally display other movie details like genre, director, etc. */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;



// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMovies } from "../../redux/moviesSlice"; // Import fetchMovies action

// const Home = () => {
//   const dispatch = useDispatch();
//   const { movies, loading, error } = useSelector((state) => state.movies);

//   console.log("Rendering Home Page..."); // ✅ Check if the component renders

//   useEffect(() => {
//     console.log("Dispatching fetchMovies...");
//     dispatch(fetchMovies());
//   }, [dispatch]);

//   console.log("Movies from Redux:", movies); // ✅ Check if movies exist in Redux state

//   if (loading) return <div>Loading movies...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1>Movies</h1>
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//         {movies.length > 0 ? (
//           movies.map((movie) => (
//             <div key={movie._id} className="text-center">
//               <h3>{movie.name}</h3>
//             </div>
//           ))
//         ) : (
//           <div>No movies found</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;



// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMovies } from "../../redux/moviesSlice"; // Import fetchMovies action

// const Home = () => {
//   const dispatch = useDispatch();
//   const { movies, loading, error } = useSelector((state) => state.movies);

//   useEffect(() => {
//     dispatch(fetchMovies());
//   }, [dispatch]);

//   if (loading) return <div>Loading movies...</div>;
//   if (error) return <div>Error: {error}</div>;
//   const movieList = Array.isArray(movies) ? movies.slice(0, 10) : [];

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">Movies</h1>

//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//         {movies.slice(0, 10).map((movie) => (
//           <div key={movie._id} className="text-center bg-white p-4 shadow-lg rounded-lg">
//             {/* Display Movie Poster */}
//             {movie.posters.length > 0 ? (
//               <img
//                 src={movie.posters[0]} // Use the first poster if available
//                 alt={movie.name}
//                 className="w-full h-48 object-cover rounded-md shadow-md mb-2"
//               />
//             ) : (
//               <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center">
//                 <span className="text-gray-500">No Poster Available</span>
//               </div>
//             )}

//             {/* Display Movie Name */}
//             <h3 className="text-lg font-semibold mt-2">{movie.name}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


// // const Home = () => {
// //   const dispatch = useDispatch();
// //   const { movies, loading, error } = useSelector((state) => state.movies);

// //   useEffect(() => {
// //     dispatch(fetchMovies());
// //   }, [dispatch]);

// //   console.log("Movies in Redux:", movies); // ✅ Debugging log

// //   if (loading) return <div>Loading movies...</div>;
// //   if (error) return <div>Error: {error}</div>;

// //   // ✅ Ensure `movies` is always an array
// //   const movieList = Array.isArray(movies) ? movies.slice(0, 10) : [];

// //   return (
// //     <div className="max-w-7xl mx-auto p-6">
// //       <h1 className="text-3xl font-bold mb-6 text-center">Movies</h1>

// //       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
// //         {movieList.length > 0 ? (
// //           movieList.map((movie) => (
// //             <div key={movie._id} className="text-center bg-white p-4 shadow-lg rounded-lg">
// //               {/* Display Movie Poster */}
// //               {movie.posters?.length > 0 ? (
// //                 <img
// //                   src={movie.posters[0]}
// //                   alt={movie.name}
// //                   className="w-full h-48 object-cover rounded-md shadow-md mb-2"
// //                 />
// //               ) : (
// //                 <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center">
// //                   <span className="text-gray-500">No Poster Available</span>
// //                 </div>
// //               )}

// //               {/* Display Movie Name */}
// //               <h3 className="text-lg font-semibold mt-2">{movie.name}</h3>
// //             </div>
// //           ))
// //         ) : (
// //           <div className="text-center col-span-4 text-gray-500">No movies available</div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// export default Home;




import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../redux/moviesSlice";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 


const Home = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  // console.log("Movies in Redux:", movies); 
  
  if (loading) return <div>Loading movies...</div>;
  if (error) return <div>Error: {error}</div>;

  const movieList = Array.isArray(movies) ? movies.slice(0, 10) : [];

  const sliderSettings = {
    dots: true,       // Show navigation dots
    infinite: true,   // Loop slides
    speed: 500,       // Transition speed
    slidesToShow: 1,  // Show one slide at a time
    slidesToScroll: 1, // Scroll one at a time
    autoplay: true,   // Auto-slide
    autoplaySpeed: 3000, // Slide every 3 seconds
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Movies</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {movieList.map((movie) => (
          <div key={movie._id} className="text-center bg-white p-4 shadow-lg rounded-lg">
            {movie.posters.length > 1 ? (
              <Slider {...sliderSettings}>
                {movie.posters.map((poster, index) => (
                  <img
                    key={index}
                    src={poster}
                    alt={`Slide ${index + 1} for ${movie.name}`}
                    className="w-full h-48 object-cover rounded-md"
                  />
                ))}
              </Slider>
            ) : movie.posters.length === 1 ? (
              <img
                src={movie.posters[0]}
                alt={movie.name}
                className="w-full h-48 object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center rounded-md">
                <span className="text-gray-500">No Poster Available</span>
              </div>
            )}

            <h3 className="text-lg font-semibold mt-2">{movie.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
