'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from './components/SearchBar';
import MovieCard, { Movie } from './components/MovieCard';
import { fetchMovies } from './utils/fetchMovies';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSearch = async (query: string) => {
    try {
      setError('');
      const fetchedMovies = await fetchMovies(query);
      setMovies(fetchedMovies);

      localStorage.setItem('movies', JSON.stringify(fetchedMovies));
    } catch (err) {
      setError((err as Error).message);
      setMovies([]);
    }
  };

  const handleShowMore = () => {
    router.push('/movies');
  };

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Film Arama Uygulaması</h1>
      <div className="max-w-2xl mx-auto">
        <SearchBar onSearch={handleSearch} />
      </div>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 px-4">
        {movies.slice(0, 2).map((movie, index) => (
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
      {movies.length > 2 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-gray-500 transition-colors"
          >
            Daha Fazla Göster
          </button>
        </div>
      )}
    </div>
  );
}
