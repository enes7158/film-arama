"use client";
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="flex items-center space-x-4 bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-sm">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Film arayın..."
        className="flex-1 p-2 border-none bg-transparent outline-none text-black placeholder-gray-400"
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

