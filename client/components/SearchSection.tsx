import { Search, Mic, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useRef, useEffect } from "react";
import { useSearchSuggestions } from "../hooks/useSearch";

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: (query: string) => void;
  onClearSearch: () => void;
}

export function SearchSection({
  searchQuery,
  onSearchChange,
  onSearch,
  onClearSearch
}: SearchSectionProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(searchQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const { suggestions } = useSearchSuggestions(inputValue);

  const popularSearches = [
    "Apple",
    "iPhone",
    "MacBook",
    "iPad",
    "Sony TV",
    "Samsung"
  ];

  const handleInputChange = (value: string) => {
    setInputValue(value);
    onSearchChange(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSearch = (query: string = inputValue) => {
    onSearch(query);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSearch(suggestion);
  };

  const handleClear = () => {
    setInputValue('');
    onClearSearch();
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Listen for suggestion events from other components
  useEffect(() => {
    const handleSuggestionEvent = (event: any) => {
      const suggestion = event.detail.suggestion;
      handleSuggestionClick(suggestion);
    };

    window.addEventListener('search-suggestion', handleSuggestionEvent);
    return () => window.removeEventListener('search-suggestion', handleSuggestionEvent);
  }, []);

  return (
    <section className="w-full bg-white py-6 md:py-8 relative">
      <div className="max-w-2xl mx-auto px-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="relative flex items-center">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search for Apple products, Sony TV, Samsung..."
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setShowSuggestions(inputValue.length > 0)}
              className="w-full pl-10 md:pl-12 pr-20 md:pr-24 py-3 md:py-4 text-sm md:text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute left-2 md:left-3 text-gray-400 hover:text-gray-600 w-6 h-6 md:w-8 md:h-8"
              onClick={() => handleSearch()}
            >
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </Button>

            <div className="absolute right-2 md:right-3 flex items-center gap-1">
              {inputValue && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-gray-400 hover:text-gray-600 w-6 h-6 md:w-8 md:h-8"
                  onClick={handleClear}
                >
                  <X className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              )}
              <Button
                size="icon"
                variant="ghost"
                className="text-blue-500 hover:text-blue-600 w-6 h-6 md:w-8 md:h-8"
              >
                <Mic className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>
          </div>

          {/* Search Suggestions Dropdown */}
          {showSuggestions && (suggestions.length > 0 || popularSearches.length > 0) && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
              {suggestions.length > 0 && (
                <div className="p-3">
                  <p className="text-xs font-medium text-gray-500 mb-2">Suggestions</p>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg flex items-center gap-2 text-sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <Search className="w-4 h-4 text-gray-400" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {!inputValue && (
                <div className="p-3 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-500 mb-2">Popular Searches</p>
                  {popularSearches.map((search) => (
                    <button
                      key={search}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg flex items-center gap-2 text-sm"
                      onClick={() => handleSuggestionClick(search)}
                    >
                      <Search className="w-4 h-4 text-gray-400" />
                      {search}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Popular Categories */}
        {!searchQuery && (
          <div className="mt-4 md:mt-6 text-center">
            <span className="text-gray-600 text-sm">Popular: </span>
            <div className="flex flex-wrap justify-center gap-1 md:gap-2 mt-2">
              {popularSearches.map((category) => (
                <Button
                  key={category}
                  variant="link"
                  className="text-blue-500 hover:text-blue-600 text-xs md:text-sm h-auto p-0 px-1"
                  onClick={() => handleSuggestionClick(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
