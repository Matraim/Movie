import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { List, ListItem, Typography } from '@mui/material';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get('https://worried-tux-toad.cyclic.app/api/v1/get-movies')
      .then((response) => setMovies(response.data))
      .catch((error) => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Todo Movie List
      </Typography>
      <List>
        {movies.map((movie) => (
          <ListItem
            key={movie.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MovieList;
