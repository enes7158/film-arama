"use client";

import React, { useState , useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard, { Movie } from "./components/MovieCard";
import { fetchMovies } from "./utils/fetchMovies";
import {useRouter} from "next/navigation";


export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const handleShowMore = () => {
    router.push('/movies');
  };

  
  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      setError(null);
      const fetchedMovies = await fetchMovies(query);
      setMovies(fetchedMovies);
      localStorage.setItem("movies", JSON.stringify(fetchedMovies));
    } catch (err) {
      setError((err as Error).message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Dizi-Film Bulucu
      </h1>
      <div className="max-w-2xl mx-auto">
        <SearchBar onSearch={handleSearch} />
      </div>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {loading ? (
        <p className="text-gray-500 text-center mt-4">Yükleniyor...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 px-4">
            {movies.length === 0 ? (
              <p className="text-gray-500 text-center col-span-2">
                Dizi-Film bulunamadı. Lütfen arama yapın.
              </p>
            ) : (
              movies.slice(0, 2).map((movie, index) => (
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
              ))
            )}
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
        </>
      )}
    </div>
  );  
}
