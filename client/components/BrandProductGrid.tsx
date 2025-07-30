import { useTrending } from "../hooks/useTrending";
import { EnhancedProductCard } from "./EnhancedProductCard";
import { useRetailerContext } from "../context/RetailerContext";
import { useBrandContext } from "../context/BrandContext";
import { Badge } from "./ui/badge";
import { Loader2, Building2, Star, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

interface BrandProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  retailers: {
    [key: string]: {
      price: string;
      originalPrice?: string;
      discount?: string;
      rating: number;
      availability: string;
      buyUrl: string;
      lastUpdated: string;
      retailerLogo?: string;
    };
  };
}

export function BrandProductGrid() {
  const { selectedBrand, selectedCategory, clearBrandSelection } = useBrandContext();
  const { selectedRetailers } = useRetailerContext();
  const [brandProducts, setBrandProducts] = useState<BrandProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedBrand) {
      fetchBrandProducts();
    }
  }, [selectedBrand, selectedCategory]);

  const fetchBrandProducts = async () => {
    if (!selectedBrand) return;
    
    setLoading(true);
    try {
      // Simulate API call - in real app this would be an actual API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock brand-specific products data
      const mockProducts = generateMockProducts(selectedBrand, selectedCategory || 'smartphones');
      setBrandProducts(mockProducts);
    } catch (error) {
      console.error('Error fetching brand products:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateMockProducts = (brand: string, category: string): BrandProduct[] => {
    const productTemplates = {
      'Apple': [
        { name: `iPhone 16 Pro - 256GB`, category: 'smartphone', price: '1,15,999', originalPrice: '1,19,900', discount: '3% off' },
        { name: `iPhone 16 - 128GB`, category: 'smartphone', price: '76,999', originalPrice: '79,900', discount: '4% off' },
        { name: `iPhone 15 Pro - 256GB`, category: 'smartphone', price: '1,05,999', originalPrice: '1,19,900', discount: '12% off' },
        { name: `MacBook Pro 14" M3`, category: 'laptop', price: '1,89,999', originalPrice: '1,99,900', discount: '5% off' },
        { name: `MacBook Air 13" M2`, category: 'laptop', price: '1,06,999', originalPrice: '1,14,900', discount: '7% off' },
        { name: `iPad Pro 12.9" M4`, category: 'tablet', price: '1,19,999', originalPrice: '1,29,900', discount: '8% off' }
      ],
      'Samsung': [
        { name: `Galaxy S24 Ultra - 512GB`, category: 'smartphone', price: '81,590', originalPrice: '1,34,999', discount: '40% off' },
        { name: `Galaxy S24 - 256GB`, category: 'smartphone', price: '78,999', originalPrice: '79,999', discount: '1% off' },
        { name: `Galaxy Z Fold 6`, category: 'smartphone', price: '1,64,999', originalPrice: '1,74,999', discount: '6% off' },
        { name: `Galaxy Watch 7`, category: 'watch', price: '29,999', originalPrice: '32,999', discount: '9% off' },
        { name: `Galaxy Buds 3 Pro`, category: 'audio', price: '19,999', originalPrice: '22,999', discount: '13% off' }
      ],
      'Xiaomi': [
        { name: `Xiaomi 14 - 256GB`, category: 'smartphone', price: '54,999', originalPrice: '69,999', discount: '21% off' },
        { name: `Redmi Note 13 Pro - 256GB`, category: 'smartphone', price: '19,999', originalPrice: '24,999', discount: '20% off' },
        { name: `Mi Pad 6`, category: 'tablet', price: '26,999', originalPrice: '29,999', discount: '10% off' },
        { name: `Mi Watch Revolve Active`, category: 'watch', price: '9,999', originalPrice: '12,999', discount: '23% off' }
      ],
      'OnePlus': [
        { name: `OnePlus 12 - 256GB`, category: 'smartphone', price: '51,997', originalPrice: '64,999', discount: '20% off' },
        { name: `OnePlus 11 - 128GB`, category: 'smartphone', price: '42,999', originalPrice: '56,999', discount: '25% off' },
        { name: `OnePlus Buds Pro 3`, category: 'audio', price: '11,999', originalPrice: '13,999', discount: '14% off' }
      ]
    };

    const templates = productTemplates[brand as keyof typeof productTemplates] || [
      { name: `${brand} Product 1`, category: 'smartphone', price: '29,999', originalPrice: '34,999', discount: '14% off' },
      { name: `${brand} Product 2`, category: 'smartphone', price: '19,999', originalPrice: '24,999', discount: '20% off' }
    ];

    return templates.map((template, index) => ({
      id: `${brand.toLowerCase()}-${index}`,
      name: template.name,
      brand,
      category: template.category,
      image: `https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop&crop=center`,
      retailers: {
        amazon: {
          price: template.price,
          originalPrice: template.originalPrice,
          discount: template.discount,
          rating: 4.2 + Math.random() * 0.6,
          availability: Math.random() > 0.3 ? "In Stock" : "Limited Stock",
          buyUrl: `https://www.amazon.in/s?k=${brand.toLowerCase()}`,
          lastUpdated: new Date().toISOString(),
          retailerLogo: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2Fff0137610d3b48cf899ee369f5bccfe1"
        },
        flipkart: {
          price: (parseInt(template.price.replace(/[,]/g, '')) + Math.floor(Math.random() * 2000 - 1000)).toLocaleString('en-IN'),
          originalPrice: template.originalPrice,
          discount: template.discount,
          rating: 4.0 + Math.random() * 0.8,
          availability: Math.random() > 0.2 ? "In Stock" : "Limited Stock",
          buyUrl: `https://www.flipkart.com/search?q=${brand.toLowerCase()}`,
          lastUpdated: new Date().toISOString(),
          retailerLogo: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2F24430bdf4be4433ba90377160fb8fbcf"
        }
      }
    }));
  };

  if (!selectedBrand) {
    return null;
  }

  if (loading) {
    return (
      <div className="w-full py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading {selectedBrand} products...</span>
        </div>
      </div>
    );
  }

  // Filter products based on selected retailers
  const filteredProducts = brandProducts.map(product => {
    const availableRetailers = Object.entries(product.retailers).filter(([retailer]) => 
      selectedRetailers.length === 0 || selectedRetailers.includes(retailer)
    );

    if (availableRetailers.length === 0) {
      // Show first available retailer if no retailers selected
      const firstRetailer = Object.entries(product.retailers)[0];
      if (!firstRetailer) return null;

      const [retailerName, retailerData] = firstRetailer;
      return {
        ...product,
        displayRetailer: retailerName,
        displayData: retailerData
      };
    }

    // Find the retailer with the best price
    const bestPriceRetailer = availableRetailers.reduce((best, current) => {
      const bestPrice = parseInt(best[1].price.replace(/[,]/g, ''));
      const currentPrice = parseInt(current[1].price.replace(/[,]/g, ''));
      return currentPrice < bestPrice ? current : best;
    });

    const [retailerName, retailerData] = bestPriceRetailer;
    return {
      ...product,
      displayRetailer: retailerName,
      displayData: retailerData
    };
  }).filter(Boolean);

  return (
    <div className="w-full py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Building2 className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedBrand} Products
          </h2>
          <Badge variant="secondary" className="ml-2">
            Live Prices
          </Badge>
          {selectedCategory && (
            <Badge variant="outline" className="capitalize">
              {selectedCategory.replace('-', ' ')}
            </Badge>
          )}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={clearBrandSelection}
          className="flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Clear Selection
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product: any) => (
          <div key={product.id} className="relative">
            <EnhancedProductCard
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.displayData.price}
              originalPrice={product.displayData.originalPrice}
              discount={product.displayData.discount}
              rating={product.displayData.rating}
              availability={product.displayData.availability}
              retailer={product.displayRetailer.charAt(0).toUpperCase() + product.displayRetailer.slice(1)}
              retailerLogo={product.displayData.retailerLogo}
              buyUrl={product.displayData.buyUrl}
              lastUpdated={product.displayData.lastUpdated}
            />
            
            {/* Brand Badge */}
            <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              {product.brand}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 text-center">
        <div className="text-sm text-gray-500">
          Showing {filteredProducts.length} {selectedBrand} products
          {selectedRetailers.length > 0 && (
            <span className="ml-1">
              from {selectedRetailers.map(r => r.charAt(0).toUpperCase() + r.slice(1)).join(', ')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
