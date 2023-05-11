import React, { useEffect, useState } from 'react';
import { getAllMovies } from '../api/movies';

export default function Homepage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviesData = await getAllMovies();
                setMovies(moviesData.slice(0, 3)); // Limit to three movies
            } catch (error) {
                console.log(error);
            }
        };

        fetchMovies();
    }, []);

    const truncateOverview = (overview, maxLength) => {
        if (overview.length > maxLength) {
            return overview.substring(0, maxLength) + '...';
        }
        return overview;
    };
    return <div className="container">
        <h1>Homepage</h1>
        <div className="row">
            {movies.map((movie) => (
                <div className="col-md-4" key={movie._id}>
                    <div className="card mb-4">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        className="card-img-top"
                        alt={movie.title}
                    />
                        <div className="card-body">
                            <h5 className="card-title">{movie.title}</h5>
                            <p className="card-text">{truncateOverview(movie.overview, 100)}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
}