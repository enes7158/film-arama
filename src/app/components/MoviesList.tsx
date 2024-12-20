"use client";
import React from "react";
import MovieCard, { Movie } from "./MovieCard";

interface MoviesListProps {
  movies: Movie[];
}

const MoviesList: React.FC<MoviesListProps> = ({ movies }) => {
  if (movies.length === 0) {
    return (
      <p className="text-gray-500 text-center col-span-2">
        Gösterilecek film bulunamadı.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 px-4">
      {movies.map((movie, index) => (
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
  );
};

export default MoviesList;
