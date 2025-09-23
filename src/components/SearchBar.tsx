"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  const clearSearch = () => {
    setQuery("");
  };

  const popularSearches = [
    "CG Power Products",
    "Electrical Switches", 
    "Industrial Motors",
    "Circuit Breakers",
    "Transformers"
  ];

  return (
    <div className="relative max-w-2xl mx-auto my-8">
      {/* Main Search Form */}
      <form onSubmit={handleSearch} className="relative">
        <div className={`relative overflow-hidden rounded-2xl bg-white shadow-lg border-2 transition-all duration-300 ${
          isFocused 
            ? 'border-blue-500 shadow-xl shadow-blue-500/10 scale-[1.02]' 
            : 'border-gray-200 hover:border-gray-300'
        }`}>
          
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <Search className={`w-5 h-5 transition-colors duration-300 ${
              isFocused ? 'text-blue-500' : 'text-gray-400'
            }`} />
          </div>

          {/* Input Field */}
          <input
            type="text"
            placeholder="Search for electrical products, motors, switches..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full pl-12 pr-24 py-4 text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none text-lg"
          />

          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-16 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}

          {/* Search Button */}
          <button
            type="submit"
            disabled={!query.trim()}
            className={`absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-xl font-semibold text-white transition-all duration-300 ${
              query.trim()
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Search
          </button>
        </div>

        {/* Search Suggestions Dropdown */}
        {isFocused && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wider">
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setQuery(search);
                      router.push(`/products?search=${encodeURIComponent(search)}`);
                    }}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 text-sm rounded-full transition-colors duration-200"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Press Enter to search</span>
                <span>ESC to close</span>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Quick Search Categories */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {["Motors", "Switches", "Panels", "Cables", "Transformers"].map((category, index) => (
          <button
            key={index}
            onClick={() => {
              setQuery(category);
              router.push(`/products?search=${encodeURIComponent(category)}`);
            }}
            className="group relative overflow-hidden px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-500 hover:to-blue-600 text-gray-700 hover:text-white text-sm font-medium rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <span className="relative z-10">{category}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        ))}
      </div>

      {/* Search Tips */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          💡 Try searching for specific product codes or browse by category
        </p>
      </div>
    </div>
  );
}