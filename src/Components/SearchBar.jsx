import React, { useState, useCallback } from 'react';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';

const SearchBar = () => {
  const { state, setSearchQuery } = useContext(AppContext);
  const [inputValue, setInputValue] = useState(state.searchQuery);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  }, [inputValue, setSearchQuery]);

  const handleClear = useCallback(() => {
    setInputValue('');
    setSearchQuery('');
  }, [setSearchQuery]);

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search videos, notes, topics..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          🔍 Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
