"use client";


export const fetchMovies = async (query: string) => {
  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;

  if (!apiKey) {
    throw new Error("OMDb API key is missing. Please set NEXT_PUBLIC_OMDB_API_KEY in your environment variables.");
  }

  if (query.length < 2) {
    return[];
  }

  const searchUrl = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

  try {
    const response = await fetch(searchUrl);
    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    if (data.Response === "False") {
      throw new Error(data.Error);
    }
  
  
    const movies = await Promise.all(
      data.Search.map(async (movie: any) => {
        const detailsUrl = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`;
        const detailsResponse = await fetch(detailsUrl);

        if (!detailsResponse.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const details = await detailsResponse.json();
        return {
          title: movie.Title,
          year: movie.Year,
          id: movie.imdbID,
          poster: movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg",
          imdbRating: details.imdbRating || "N/A",
          actors: details.Actors || "N/A",
          language: details.Language || "N/A",
          plot: details.Plot || "N/A",
          director: details.Director || "N/A",
          type: details.Genre || "N/A",
        };
      })
    );
    return movies;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (id: string) => {
  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;

  if (!apiKey) {
    throw new Error("OMDb API key is missing. Please set NEXT_PUBLIC_OMDB_API_KEY in your environment variables.");
  }

  const detailsUrl = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;

  try {
    const response = await fetch(detailsUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }

    const data = await response.json();

    if (data.Response === "False") {
      throw new Error(data.Error || "No details found.");
    }

    return {
      title: data.Title,
      year: data.Year,
      id: data.imdbID,
      poster: data.Poster !== "N/A" ? data.Poster : "/placeholder.jpg",
      imdbRating: data.imdbRating || "N/A",
      actors: data.Actors || "N/A",
      language: data.Language || "N/A",
      plot: data.Plot || "N/A",
      director: data.Director || "N/A",
      type: data.Genre || "N/A",
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};



