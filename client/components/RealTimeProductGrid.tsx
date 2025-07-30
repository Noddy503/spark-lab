import { useProductData } from "../hooks/useProductData";
import { EnhancedProductCard } from "./EnhancedProductCard";
import { ChevronRight, RefreshCw, Wifi, WifiOff, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { useRetailerContext } from "../context/RetailerContext";

interface RealTimeProductGridProps {
  title: string;
  productFilter?: (productId: string) => boolean;
}

export function RealTimeProductGrid({ title, productFilter }: RealTimeProductGridProps) {
  const { products, loading, error, lastUpdated, refreshData } = useProductData(true);
  const { selectedRetailers } = useRetailerContext();

  // Filter products if filter function is provided
  const filteredProducts = productFilter
    ? products.filter(product => productFilter(product.productId))
    : products;

  // Transform data for ProductCard component and filter by selected retailers
  const transformedProducts = filteredProducts.flatMap(product =>
    Object.keys(product.retailers)
      .filter(retailerKey => selectedRetailers.includes(retailerKey)) // Filter by selected retailers
      .map(retailerKey => {
        const retailerData = product.retailers[retailerKey];
        const retailerName = retailerKey.charAt(0).toUpperCase() + retailerKey.slice(1);

        return {
          id: `${product.productId}-${retailerKey}`,
          name: getProductName(product.productId),
          image: retailerData.image,
          price: retailerData.price,
          rating: retailerData.rating,
          retailer: retailerName,
          retailerLogo: getRetailerLogo(retailerKey),
          availability: retailerData.availability,
          buyUrl: retailerData.buyUrl,
          lastUpdated: retailerData.lastUpdated
        };
      })
  );

  function getProductName(productId: string): string {
    switch (productId) {
      case 'iphone-16-pro':
        return 'iPhone 16 Pro - 218GB';
      case 'sony-tv-55':
        return 'Sony 55 Inch OLED 4K Ultra HD TV BRAVIA 8';
      default:
        return productId;
    }
  }

  function getRetailerLogo(retailer: string): string {
    const logos: Record<string, string> = {
      apple: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2F35da3c4f15b240fda7e67578963c095d",
      amazon: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2Fff0137610d3b48cf899ee369f5bccfe1",
      flipkart: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2F24430bdf4be4433ba90377160fb8fbcf",
      sony: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2F2cd12cb15903444a9ebd5c962b9fd1aa",
      ebay: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2F53716917febe49cab7e94016b86d029e"
    };
    return logos[retailer] || "/api/placeholder/30/20";
  }

  if (loading) {
    return (
      <section className="w-full bg-white py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
            <span className="ml-2 text-lg">Loading real-time prices...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-white py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-12">
            <WifiOff className="w-8 h-8 text-red-500 mb-2" />
            <span className="text-lg text-red-600 mb-4">Failed to load real-time data</span>
            <Button onClick={refreshData} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state if no retailers are selected
  if (selectedRetailers.length === 0) {
    return (
      <section className="w-full bg-white py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-12">
            <Filter className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-lg text-gray-600 mb-2">No retailers selected</span>
            <span className="text-sm text-gray-500">Please select retailers from the sidebar to see products</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header with Real-time Indicator */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">{title}</h2>
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
            {/* Filter Indicator */}
            <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              <Filter className="w-3 h-3" />
              <span>{selectedRetailers.length} retailers</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Live Data Indicator */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-600">Live</span>
              <Wifi className="w-4 h-4 text-green-500" />
            </div>
            
            {/* Last Updated */}
            {lastUpdated && (
              <span className="text-xs text-gray-500">
                Updated: {new Date(lastUpdated).toLocaleTimeString()}
              </span>
            )}
            
            {/* Manual Refresh Button */}
            <Button onClick={refreshData} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {transformedProducts.map((product) => (
            <div key={product.id} className="relative">
              <EnhancedProductCard
                name={product.name}
                image={product.image}
                price={product.price}
                rating={product.rating}
                retailer={product.retailer}
                retailerLogo={product.retailerLogo}
                availability={product.availability}
                buyUrl={product.buyUrl}
              />

              {/* Real-time Price Badge */}
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Live
              </div>
            </div>
          ))}
        </div>

        {/* Real-time Data Disclaimer */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start gap-2">
            <Wifi className="w-5 h-5 text-blue-500 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900">Real-time Price Comparison</p>
              <p className="text-blue-700 mt-1">
                Prices and availability are updated automatically every minute from multiple retailers. 
                This demo uses simulated data - in production, this would connect to legitimate price comparison APIs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
