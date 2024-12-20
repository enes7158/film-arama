"use client";
import { fetchTMDBId } from "./fetchTMBDid";
export const fetchTMDBTrailer = async (imdbId: string): Promise<string | null> => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  
    const tmdbId = await fetchTMDBId(imdbId);
    if (!tmdbId) {
      console.warn("TMDB ID bulunamadı.");
      return null;
    }
  
    const videosUrl = `https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=${apiKey}&language=en-US`;
  
    try {
      const response = await fetch(videosUrl);
      if (!response.ok) {
        throw new Error("Fragman bilgileri getirilemedi.");
      }
  
      const data = await response.json();
      const trailer = data.results.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (video: any) => video.type === "Trailer" && video.site === "YouTube"
      );
      
  
      return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
    } catch (error) {
      console.error("Error fetching trailer from TMDB:", error);
      return null;
    }
  };
  
 
  
  