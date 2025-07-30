import { useState, useEffect } from 'react';

interface TrendingProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  retailers: {
    [key: string]: {
      price: string;
      rating: number;
      availability: string;
      buyUrl: string;
      lastUpdated: string;
    };
  };
  trendingScore: number;
  isHot: boolean;
}

interface TrendingResponse {
  category: string;
  products: TrendingProduct[];
  totalProducts: number;
  categories?: {
    smartphones: number;
    tvs: number;
    laptops: number;
  };
}

export function useTrending(category?: string) {
  const [products, setProducts] = useState<TrendingProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<{smartphones: number; tvs: number; laptops: number} | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const url = category 
          ? `/api/trending?category=${encodeURIComponent(category)}`
          : '/api/trending';
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch trending products: ${response.status}`);
        }
        
        const data: TrendingResponse = await response.json();
        setProducts(data.products);
        
        if (data.categories) {
          setCategories(data.categories);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch trending products');
        console.error('Error fetching trending products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, [category]);

  const refetch = () => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const url = category 
          ? `/api/trending?category=${encodeURIComponent(category)}`
          : '/api/trending';
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch trending products: ${response.status}`);
        }
        
        const data: TrendingResponse = await response.json();
        setProducts(data.products);
        
        if (data.categories) {
          setCategories(data.categories);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch trending products');
        console.error('Error fetching trending products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  };

  return {
    products,
    loading,
    error,
    categories,
    refetch
  };
}

export function useTrendingByRetailer(retailer: string) {
  const [products, setProducts] = useState<TrendingProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingByRetailer = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/trending/retailer?retailer=${encodeURIComponent(retailer)}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch trending products for ${retailer}: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : `Failed to fetch trending products for ${retailer}`);
        console.error('Error fetching trending products by retailer:', err);
      } finally {
        setLoading(false);
      }
    };

    if (retailer) {
      fetchTrendingByRetailer();
    }
  }, [retailer]);

  return {
    products,
    loading,
    error
  };
}
