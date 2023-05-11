import axios from 'axios';

const API_BASE_URL = 'http://localhost:8030';


export const createMovie = async (movieData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/movies`, movieData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create movie');
  }
};


export const getAllMovies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movies`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch movies');
  }
};


export const getMovieById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movies/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch movie');
  }
};


export const updateMovieById = async (id, movieData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/movies/${id}`, movieData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update movie');
  }
};


export const deleteMovieById = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/movies/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete movie');
  }
};


export const searchMoviesByTitle = async (title) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movies/search?title=${title}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to search movies');
  }
};
