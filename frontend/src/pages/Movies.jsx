import React, { useEffect, useState } from 'react';
import { getAllMovies } from '../api/movies';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getAllMovies();
        setMovies(moviesData);
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

  return (
    <div style={{minHeight: "100vh"}} className="container">
      <h1>Movies</h1>
      <div className="row">
        {movies.map((movie) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={movie._id}>
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
  );
};

export default MovieList;
