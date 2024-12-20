"use client";

import { useState , useEffect } from "react";
import { fetchMovies } from "../utils/fetchMovies";
import { Movie } from "../components/MovieCard";

export const useMovies = (defaultQuery: string) => {
    const [defaultMovies, setDefaultMovies] = useState<Movie[]>([]);
    const [searchMovies, setSearchMovies] = useState<Movie[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDefaultMovies = async () => {
            setLoading(true);
            try {
                setError(null);
                const movies = await fetchMovies(defaultQuery);
                setDefaultMovies(movies);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchDefaultMovies();
    }, [defaultQuery]);

    useEffect(() => {
        const fetchMoviesByCategory = async () => {
            if(!selectedCategory) return;
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
        }
        fetchMoviesByCategory();
    }, [selectedCategory]);
    
    return {
        defaultMovies,
        searchMovies,
        selectedCategory,
        error,
        loading,
        setSearchMovies,
        setSelectedCategory,
    };
}