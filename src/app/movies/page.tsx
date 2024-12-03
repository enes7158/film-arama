'use client';

import React, { useEffect, useState } from 'react';
import MovieCard , { Movie } from '../components/MovieCard';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('movies') || '[]');
    setMovies(savedMovies);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Tüm Filmler</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.title}
            year={movie.year}
            poster={movie.poster}
            imdbRating={movie.imdbRating}
            actors={movie.actors}
            language={movie.language}
            plot={movie.plot}
          />
        ))}
      </div>
    </div>
  );
}


