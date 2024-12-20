"use client";

import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import { Movie } from "./components/MovieCard";
import { useMovies } from "./hooks/useMovies";
import { fetchMovies } from "./utils/fetchMovies";
import CategoriesDropdown from "./components/CategoriesDropDown";
import MoviesList from "./components/MoviesList";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";

export default function Home() {

  const [, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    selectedCategory,
    setSelectedCategory,
  } = useMovies("Avengers");

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

  const { items: infiniteMovies, observerRef } = useInfiniteScroll<Movie>({
    fetchItems: (page) => fetchMovies(selectedCategory ? `${selectedCategory}&page=${page}` : `Avengers&page=${page}`),
  });

  const categories = ["Action", "Comedy", "Drama", "Horror", "Romance"];

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value.toLowerCase());
  };

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
        <div className="flex items-center space-x-6 justify-center w-full max-w-3xl mx-auto">
          <SearchBar onSearch={handleSearch}/>
          <CategoriesDropdown
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>

      <main className="p-6">
        {error && (
          <div className="bg-red-500 text-white text-center py-2 rounded-md">
            {error}
          </div>
        )}
        {loading ? (
          <div className="text-gray-300 text-center py-2">
            <span className="animate-spin">🔄</span> Yükleniyor...
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">
              {selectedCategory
                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Filmleri`
                : "Popüler Filmler"}
            </h2>
            <MoviesList movies={infiniteMovies} />
          </>
        )}
      </main>

      <div ref={observerRef} className="h-1"></div>
    </div>
  );
}
