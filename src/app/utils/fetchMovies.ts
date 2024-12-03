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

  let debounceTimeout;

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
          poster: movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg",
          imdbRating: details.imdbRating || "N/A",
          actors: details.Actors || "N/A",
          language: details.Language || "N/A",
          plot: details.Plot || "N/A",
        };
      })
    );

    return movies;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


