import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';

const App = () => {
  return (
    <Router>
      <div
        style={{
          justifyContent: 'center',
          display: 'flex',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <Routes>
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/" element={<TodoList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
