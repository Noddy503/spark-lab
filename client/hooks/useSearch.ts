import { useState, useEffect, useCallback } from 'react';

interface SearchResult {
  productId: string;
  name: string;
  brand: string;
  category: string;
  retailers: Record<string, any>;
  relevance: number;
}

interface SearchResponse {
  query: string;
  results: SearchResult[];
  totalResults: number;
  suggestions: string[];
}

interface UseSearchResult {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
  isSearching: boolean;
  hasSearched: boolean;
  totalResults: number;
  suggestions: string[];
  clearSearch: () => void;
  performSearch: (query: string) => void;
}

export function useSearch(): UseSearchResult {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      clearSearch();
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data: SearchResponse = await response.json();
      
      setSearchResults(data.results);
      setTotalResults(data.totalResults);
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setTotalResults(0);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
    setTotalResults(0);
    setSuggestions([]);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      clearSearch();
      return;
    }

    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery, performSearch]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    hasSearched,
    totalResults,
    suggestions,
    clearSearch,
    performSearch
  };
}

// Hook for search suggestions (autocomplete)
export function useSearchSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setSuggestions(data.suggestions);
      } catch (error) {
        console.error('Suggestions error:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 150); // Faster suggestions

    return () => clearTimeout(timeoutId);
  }, [query]);

  return { suggestions, loading };
}
