"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchMovieDetails } from '@/app/utils/fetchMovies';
import { fetchTMDBTrailer } from '@/app/utils/fetchTMDB';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [trailerUrl , setTrailerUrl] = useState<string | null>(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchMovieDetails(id as string);
        setMovie(data);

        const tmdbTrailer = await fetchTMDBTrailer(data.id);
        setTrailerUrl(tmdbTrailer);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getMovieDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 text-black p-4 flex items-center justify-center">
        <p className="text-xl text-gray-500">Yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return ( 
      <div className="min-h-screen bg-gray-50 text-black p-4 flex items-center justify-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-50 text-black p-4 flex items-center justify-center">
        <p className="text-xl text-gray-500">Film bilgisi bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-black p-4 flex items-center justify-center">
  <div className="bg-black border border-white rounded-lg shadow-lg p-6 max-w-4xl w-full hover:shadow-2xl hover:scale-105 transition-shadow transition-transform duration-300 ease-in-out">
    <div className="flex flex-col sm:flex-row gap-6">
      <div className="w-full sm:w-1/3 flex-shrink-0">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-auto rounded-lg"
        />
      </div>

      <div className="flex-grow">
        <h1 className="text-2xl font-bold text-white mb-4">{movie.title}</h1>
        <p className="text-sm text-white mb-2">
          <strong>Yıl:</strong> {movie.year}
        </p>
        <p className="text-sm text-white mb-2">
          <strong>IMDb Puanı:</strong> {movie.imdbRating}
        </p>
        <p className="text-sm text-white mb-2">
          <strong>Oyuncular:</strong> {movie.actors}
        </p>
        <p className="text-sm text-white mb-2">
          <strong>Dil:</strong> {movie.language}
        </p>
        <p className="text-sm text-white">
          <strong>Konusu:</strong> {movie.plot}
        </p>
        <p className="text-sm text-white">
          <strong>Yönetmen:</strong> {movie.director}
        </p>
      </div>
    </div>
    {trailerUrl ? (
          <div className="mt-6">
            <h2 className="text-xl font-bold">Fragman</h2>
            <iframe
              src={trailerUrl}
              className="w-full h-64 md:h-96 rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Film Fragmanı"
            ></iframe>
          </div>
        ) : (
          <p className="text-sm text-gray-400 mt-4">Fragman bulunamadı.</p>
        )}
  </div>
</div>

  );
};

export default MovieDetailsPage;


