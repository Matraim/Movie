import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@mui/material';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`https://worried-tux-toad.cyclic.app/api/v1/get-movie/${id}`)
      .then((response) => setMovie(response.data))
      .catch((error) => console.error('Error fetching movie details:', error));
  }, [id]);

  if (!movie) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        {movie.title}
      </Typography>
      <Typography variant="subtitle1">Author: {movie.author}</Typography>
      <img
        src={movie.image}
        alt={movie.title}
        style={{ maxWidth: '100%', marginTop: '10px' }}
      />
    </div>
  );
};

export default MovieDetails;
