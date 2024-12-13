"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard, { Movie } from "./components/MovieCard";
import { fetchMovies } from "./utils/fetchMovies";

export default function Home() {
  const [defaultMovies, setDefaultMovies] = useState<Movie[]>([]);
  const [searchMovies, setSearchMovies] = useState<Movie[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // Kategori seçimi
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAllMovies, setShowAllMovies] = useState(false);


  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      setError(null);
      const fetchedMovies = await fetchMovies(query);
      setSearchMovies(fetchedMovies);
    } catch(err) {
      setError((err as Error).message);
      setSearchMovies([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchDefaultMovies = async () => {
      setLoading(true);
      try {
        setError(null);
        const movies = await fetchMovies("Avengers");
        setDefaultMovies(movies);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultMovies();
  }, []);

  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      if (!selectedCategory) return;

      setLoading(true);
      try {
        setError(null);
        const movies = await fetchMovies(selectedCategory);
        setSearchMovies(movies);
      } catch (err) {
        setError((err as Error).message);
        setSearchMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByCategory();
  }, [selectedCategory]);

  const displayedMovies = showAllMovies ? (searchMovies.length > 0 ? searchMovies : defaultMovies)
  : (searchMovies.length > 0 ? searchMovies.slice(0,4) : defaultMovies.slice(0,4));

  const categories = ["Action", "Comedy", "Drama", "Horror", "Romance"];

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value.toLowerCase());
  };

  const moviesToShow = searchMovies.length > 0 ? searchMovies : defaultMovies;

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <img
            src="/netflix.png"
            alt="Nesfliks Logo"
            className="h-12 w-12 object-contain"
          />
          <h1 className="text-2xl font-bold">Nesfliks</h1>
        </div>
        <div className="flex items-center space-x-6 justify-center w-full max-w-3xl mx-auto ">
          <SearchBar onSearch={handleSearch}/>
          <select
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="bg-transparent text-white px-4 py-2 rounded-lg focus:outline-none"
          >
            <option value="">Kategori Seç</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      
      <main className="p-6">
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {loading ? (
          <p className="text-gray-500 text-center mt-4">Yükleniyor...</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">
              {selectedCategory
                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Filmleri`
                : "Popüler Filmler"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 px-4">
              {moviesToShow.length === 0 ? (
                <p className="text-gray-500 text-center col-span-2">
                  Gösterilecek film bulunamadı.
                </p>
              ) : (
                displayedMovies.map((movie, index) => (
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
                ))
              )}
            </div>
          </>
        )}
      </main>
    {(searchMovies.length > 4 || defaultMovies.length > 4) && !showAllMovies && (
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
