// src/pages/Movies.js
import { useEffect, useState } from "react";
import { getMovies } from "../api/api";

function Movies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovies().then((res) => setMovies(res.data));
    }, []);

    return (
        <div>
            <h1>All Movies</h1>
            {movies.map((movie) => (
                <div key={movie._id}>
                    <h2>{movie.title}</h2>
                    <p>{movie.description}</p>
                </div>
            ))}
        </div>
    );
}

export default Movies;
