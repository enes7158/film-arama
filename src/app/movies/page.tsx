'use client';

import React, { useEffect, useState } from 'react';
import MovieCard , { Movie } from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { fetchMovies } from '../utils/fetchMovies';
import Link from 'next/link';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAllMovies, setShowAllMovies] = useState(false); // Tüm filmleri gösterme durumu

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('movies') || '[]');
    setMovies(savedMovies);
  }, []);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      setError(null);
      const fetchedMovies = await fetchMovies(query);
      setMovies(fetchedMovies);
      localStorage.setItem('movies' , JSON.stringify(fetchedMovies))
    } catch (err) {
      setError((err as Error).message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const displayedMovies = showAllMovies ? movies : movies.slice(0, 4);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="flex items-center justify-between space-x-4 mb-8">
        <div className="bg-black p-2 rounded-md">
          <img src="/netflix.png" className="h-12 w-12 object-contain" alt="Logo" />
        </div>
        <Link href="/">
          <h1 className="text-white font-bold text-2xl">Nesfliks</h1>
        </Link>
        <div className="flex-grow">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-8 text-center pt-4">Tüm Filmler</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 px-4">
        {displayedMovies.map((movie, index) => (
          <MovieCard
            id={movie.id}
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
      {movies.length > 4 && !showAllMovies && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAllMovies(true)}
            className="bg-transparent text-white px-4 py-2 rounded-lg shadow hover:bg-gray-900 transition"
          >
            Daha Fazla Göster
          </button>
        </div>
      )}
    </div>
  );
}



