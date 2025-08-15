import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(query.trim());
    }, 300); 

    return () => clearTimeout(delayDebounce);
  }, [query, onSearch]);

  return (
    <div className="flex items-center justify-center my-6">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 w-72 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
  );
}
