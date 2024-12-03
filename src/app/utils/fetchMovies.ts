"use client";
export const fetchMovies = async (query: string) => {
  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('API isteği başarısız');
    }

    const data = await response.json();
    if (data.Response === 'False') {
      throw new Error(data.Error);
    }

    // Filmler için detayları al
    const movies = await Promise.all(
      data.Search.map(async (movie: any) => {
        const detailsResponse = await fetch(
          `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`
        );
        const details = await detailsResponse.json();
        return {
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster,
          imdbRating: details.imdbRating || 'N/A',
          actors: details.Actors || 'N/A',
          language: details.Language || 'N/A',
          plot: details.Plot || 'N/A',
        };
      })
    );

    return movies;
  } catch (error) {
    console.error('Veri çekme hatası:', error);
    throw error;
  }
};
