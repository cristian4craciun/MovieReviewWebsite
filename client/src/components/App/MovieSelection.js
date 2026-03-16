import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function MovieSelection({ movies, selectedMovie, handleMovieChange }) {

  const handleMovieSelect = (event) => {
    const selectedMovieId = event.target.value;
    const selectedMovie = movies.find((movie) => movie.id === selectedMovieId);
    handleMovieChange(selectedMovie);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel
        id="movie-select-label"
        sx={{
          color: 'white',
          '&.Mui-focused': {
            color: 'white',
          },
          '&:hover': {
            color: 'white',
          },
          '&.MuiInputLabel-shrink': {
            color: 'white !important',
          },
        }}
      >
        Select a movie
      </InputLabel>
      <Select
        value={selectedMovie ? selectedMovie.id : ''}
        onChange={handleMovieSelect}
        labelId="movie-select-label"
        id="movie-select"
        label="Select a movie"
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '& .MuiSelect-select': {
            color: 'white', // Text color of the selected item
          },
          '& .MuiMenu-paper': {
            backgroundColor: '#333', // Background color of the dropdown menu
          },
        }}
      >
        {movies.map((movie) => (
          <MenuItem key={movie.id} value={movie.id} sx={{ color: 'black' }}>
            {movie.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MovieSelection;
