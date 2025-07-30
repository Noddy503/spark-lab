import { useTrending } from "../hooks/useTrending";
import { EnhancedProductCard } from "./EnhancedProductCard";
import { useRetailerContext } from "../context/RetailerContext";
import { Badge } from "./ui/badge";
import { Loader2, TrendingUp, Zap } from "lucide-react";

interface TrendingProductGridProps {
  title: string;
  category?: string;
  limit?: number;
  showHotBadge?: boolean;
  retailerFilter?: string;
}

export function TrendingProductGrid({
  title,
  category,
  limit = 8,
  showHotBadge = true,
  retailerFilter
}: TrendingProductGridProps) {
  const { products, loading, error } = useTrending(category);
  const { selectedRetailers } = useRetailerContext();

  if (loading) {
    return (
      <div className="w-full py-8">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading trending products...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-8">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="text-center py-8">
          <div className="text-red-600 mb-2">Failed to load trending products</div>
          <div className="text-gray-500 text-sm">{error}</div>
        </div>
      </div>
    );
  }

  // Filter products based on retailer filter and selected retailers
  const filteredProducts = products.filter(product => {
    // If retailerFilter is specified, only show products from that retailer
    if (retailerFilter) {
      return product.retailers[retailerFilter] !== undefined;
    }

    // Otherwise, filter based on selected retailers
    const hasSelectedRetailer = Object.keys(product.retailers).some(retailer =>
      selectedRetailers.includes(retailer)
    );
    return selectedRetailers.length === 0 || hasSelectedRetailer;
  }).slice(0, limit);

  if (filteredProducts.length === 0) {
    return (
      <div className="w-full py-8">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="text-center py-8">
          <div className="text-gray-600 mb-2">No trending products found</div>
          <div className="text-gray-500 text-sm">
            {retailerFilter
              ? `No products available from ${retailerFilter.charAt(0).toUpperCase() + retailerFilter.slice(1)}`
              : selectedRetailers.length > 0
                ? "Try adjusting your retailer filters"
                : "Please try again later"
            }
          </div>
        </div>
      </div>
    );
  }

  // Convert products to the format expected by EnhancedProductCard
  const convertedProducts = filteredProducts.map(product => {
    // If retailerFilter is specified, use that retailer specifically
    if (retailerFilter && product.retailers[retailerFilter]) {
      const retailerData = product.retailers[retailerFilter];
      return {
      id: product.id,
      name: product.name,
      image: product.image,
      price: retailerData.price,
      originalPrice: retailerData.originalPrice,
      discount: retailerData.discount,
      rating: retailerData.rating,
      availability: retailerData.availability,
      retailer: retailerFilter.charAt(0).toUpperCase() + retailerFilter.slice(1),
      retailerLogo: retailerData.retailerLogo,
      buyUrl: retailerData.buyUrl,
      lastUpdated: retailerData.lastUpdated,
      isHot: product.isHot,
      trendingScore: product.trendingScore
    };
    }

    // Get the best price from selected retailers or all retailers
    const availableRetailers = Object.entries(product.retailers).filter(([retailer]) =>
      selectedRetailers.length === 0 || selectedRetailers.includes(retailer)
    );

    if (availableRetailers.length === 0) {
      // Fallback to first available retailer
      const firstRetailer = Object.entries(product.retailers)[0];
      if (!firstRetailer) return null;

      const [retailerName, retailerData] = firstRetailer;
      return {
        id: product.id,
        name: product.name,
        image: product.image,
        price: retailerData.price,
        originalPrice: retailerData.originalPrice,
        discount: retailerData.discount,
        rating: retailerData.rating,
        availability: retailerData.availability,
        retailer: retailerName.charAt(0).toUpperCase() + retailerName.slice(1),
        retailerLogo: retailerData.retailerLogo,
        buyUrl: retailerData.buyUrl,
        lastUpdated: retailerData.lastUpdated,
        isHot: product.isHot,
        trendingScore: product.trendingScore
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
      id: product.id,
      name: product.name,
      image: product.image,
      price: retailerData.price,
      originalPrice: retailerData.originalPrice,
      discount: retailerData.discount,
      rating: retailerData.rating,
      availability: retailerData.availability,
      retailer: retailerName.charAt(0).toUpperCase() + retailerName.slice(1),
      retailerLogo: retailerData.retailerLogo,
      buyUrl: retailerData.buyUrl,
      lastUpdated: retailerData.lastUpdated,
      isHot: product.isHot,
      trendingScore: product.trendingScore
    };
  }).filter(Boolean);

  return (
    <div className="w-full py-8">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <Badge variant="secondary" className="ml-2">
          Live Prices
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {convertedProducts.map((product) => (
          <div key={product.id} className="relative">
            {showHotBadge && product.isHot && (
              <div className="absolute top-2 left-2 z-10">
                <Badge className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Hot
                </Badge>
              </div>
            )}
            {product.trendingScore && product.trendingScore > 90 && (
              <div className="absolute top-2 right-2 z-10">
                <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs">
                  #{Math.floor((100 - product.trendingScore) * 10 + 1)}
                </Badge>
              </div>
            )}
            <EnhancedProductCard
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              rating={product.rating}
              availability={product.availability}
              retailer={product.retailer}
              retailerLogo={product.retailerLogo}
              buyUrl={product.buyUrl}
              lastUpdated={product.lastUpdated}
            />
          </div>
        ))}
      </div>
      
      {convertedProducts.length > 0 && (
        <div className="mt-6 text-center">
          <div className="text-sm text-gray-500">
            Showing {convertedProducts.length} trending products
            {retailerFilter && (
              <span className="ml-1">
                from {retailerFilter.charAt(0).toUpperCase() + retailerFilter.slice(1)}
              </span>
            )}
            {!retailerFilter && selectedRetailers.length > 0 && (
              <span className="ml-1">
                from {selectedRetailers.map(r => r.charAt(0).toUpperCase() + r.slice(1)).join(', ')}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
