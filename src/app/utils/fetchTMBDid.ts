"use client";
export const fetchTMDBId = async (imdbId: string): Promise<string | null> => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/find/${imdbId}?api_key=${apiKey}&external_source=imdb_id`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("TMDB API çağrısı başarısız oldu.");
      }
  
      const data = await response.json();
  
      const tmdbId = data.movie_results?.[0]?.id;
      return tmdbId ? tmdbId.toString() : null;
    } catch (error) {
      console.error("Error fetching TMDB ID:", error);
      return null;
    }
  };