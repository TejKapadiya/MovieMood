import React from 'react'
import { useDispatch, useSelector } from "react-redux";

// Sample movie data (you could fetch this from an API or CDN)
const movies = [
  {
    name: 'Movie 1',
    poster: 'https://via.placeholder.com/200x300.png?text=Movie+1', // Replace with real CDN URLs
  },
  {
    name: 'Movie 2',
    poster: 'https://via.placeholder.com/200x300.png?text=Movie+2',
  },
  {
    name: 'Movie 3',
    poster: 'https://via.placeholder.com/200x300.png?text=Movie+3',
  },
  {
    name: 'Movie 4',
    poster: 'https://via.placeholder.com/200x300.png?text=Movie+4',
  },
  // Add more movie objects as needed
];

const Home = () => {
  const {user}=useSelector((state)=>state.users)
  return (
      <div>{user?.name}
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie, index) => (
          <div key={index} className="text-center">
            <img
              src={movie.poster}
              alt={movie.name}
              className="w-full h-auto rounded-lg shadow-md mb-2"
            />
            <h3 className="text-lg font-semibold">{movie.name}</h3>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Home



