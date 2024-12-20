"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = async () => {
    if (!query.trim()) return; // Boş sorguları engelle
    await onSearch(query); // Arama işlemini gerçekleştir
    router.push(`/movies?query=${encodeURIComponent(query)}`); // Arama sonrası yönlendirme
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && query.trim()) {
      await onSearch(query);
      router.push(`/movies`);
    }
  };

  return (
    <div className="flex items-center space-x-4 bg-black border border-gray rounded-lg p-1 shadow-sm w-full max-w-3xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Film arayın..."
        className="flex-1 p-2 border-none bg-transparent outline-none text-white placeholder-gray-400"
      />
      <button
        onClick={handleSearch}
        className="bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-gray-500 transition-colors"
      >
        Ara
      </button>
    </div>
  );
};

export default SearchBar;

