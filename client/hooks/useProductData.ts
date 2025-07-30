import { useState, useEffect } from 'react';

interface RetailerData {
  price: string;
  rating: number;
  availability: string;
  image: string;
  buyUrl: string;
  lastUpdated: string;
}

interface ProductData {
  productId: string;
  retailers: Record<string, RetailerData>;
  lastUpdated: string;
  dataSource: 'live' | 'cached' | 'mock';
}

interface UseProductDataResult {
  products: ProductData[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refreshData: () => void;
}

export function useProductData(autoRefresh = true): UseProductDataResult {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchProductData = async () => {
    try {
      setError(null);
      const response = await fetch('/api/products');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform the data structure for easier use
      const transformedProducts = Object.keys(data.products).map(productId => ({
        productId,
        retailers: data.products[productId],
        lastUpdated: data.lastUpdated,
        dataSource: 'mock' as const
      }));
      
      setProducts(transformedProducts);
      setLastUpdated(data.lastUpdated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch product data');
      console.error('Error fetching product data:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    setLoading(true);
    fetchProductData();
  };

  useEffect(() => {
    fetchProductData();
    
    // Set up auto-refresh if enabled
    if (autoRefresh) {
      const interval = setInterval(fetchProductData, 60000); // Refresh every minute
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  return {
    products,
    loading,
    error,
    lastUpdated,
    refreshData
  };
}

// Hook for individual product comparison
export function useProductComparison(productId: string) {
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    try {
      setError(null);
      const response = await fetch(`/api/products/${productId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProductData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  return {
    productData,
    loading,
    error,
    refreshProduct: fetchProduct
  };
}
