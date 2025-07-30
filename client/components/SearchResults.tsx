import { EnhancedProductCard } from "./EnhancedProductCard";
import { Search, Package, Sparkles } from "lucide-react";
import { useRetailerContext } from "../context/RetailerContext";

interface SearchResult {
  productId: string;
  name: string;
  brand: string;
  category: string;
  retailers: Record<string, any>;
  relevance: number;
}

interface SearchResultsProps {
  query: string;
  results: SearchResult[];
  totalResults: number;
  isLoading: boolean;
  suggestions: string[];
}

export function SearchResults({ 
  query, 
  results, 
  totalResults, 
  isLoading,
  suggestions 
}: SearchResultsProps) {
  const { selectedRetailers } = useRetailerContext();

  // Transform search results into product cards format
  const transformedProducts = results.flatMap(result => 
    Object.keys(result.retailers)
      .filter(retailerKey => selectedRetailers.includes(retailerKey))
      .map(retailerKey => {
        const retailerData = result.retailers[retailerKey];
        const retailerName = retailerKey.charAt(0).toUpperCase() + retailerKey.slice(1);
        
        return {
          id: `${result.productId}-${retailerKey}`,
          name: result.name,
          image: retailerData.image,
          price: retailerData.price,
          originalPrice: retailerData.originalPrice,
          discount: retailerData.discount,
          rating: retailerData.rating,
          retailer: retailerName,
          retailerLogo: getRetailerLogo(retailerKey),
          availability: retailerData.availability,
          buyUrl: retailerData.buyUrl,
          lastUpdated: retailerData.lastUpdated,
          brand: result.brand,
          category: result.category
        };
      })
  );

  function getRetailerLogo(retailer: string): string {
    const logos: Record<string, string> = {
      apple: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2F35da3c4f15b240fda7e67578963c095d",
      amazon: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2Fff0137610d3b48cf899ee369f5bccfe1",
      flipkart: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2F24430bdf4be4433ba90377160fb8fbcf",
      samsung: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/300px-Samsung_Logo.svg.png",
      xiaomi: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/300px-Xiaomi_logo_%282021-%29.svg.png",
      oneplus: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OnePlus_logo.svg/300px-OnePlus_logo.svg.png",
      oppo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Oppo_logo.svg/300px-Oppo_logo.svg.png",
      vivo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Vivo_logo_2019.svg/300px-Vivo_logo_2019.svg.png",
      realme: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Realme_logo.svg/300px-Realme_logo.svg.png",
      motorola: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Motorola_logo.svg/300px-Motorola_logo.svg.png",
      google: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png",
      sony: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2F2cd12cb15903444a9ebd5c962b9fd1aa",
      ebay: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2F53716917febe49cab7e94016b86d029e"
    };
    return logos[retailer] || "/api/placeholder/30/20";
  }

  if (isLoading) {
    return (
      <section className="w-full bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center py-12">
            <Search className="w-8 h-8 animate-pulse text-blue-500" />
            <span className="ml-2 text-lg">Searching...</span>
          </div>
        </div>
      </section>
    );
  }

  if (query && results.length === 0) {
    return (
      <section className="w-full bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-12">
            <Package className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found for "{query}"
            </h3>
            <p className="text-gray-600 mb-6 text-center max-w-md">
              Try searching for different terms or check our suggestions below.
            </p>
            
            {suggestions.length > 0 && (
              <div className="w-full max-w-md">
                <p className="text-sm font-medium text-gray-700 mb-3">Suggested searches:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm cursor-pointer hover:bg-blue-100 transition-colors"
                      onClick={() => {
                        // This would trigger a new search
                        window.dispatchEvent(new CustomEvent('search-suggestion', { 
                          detail: { suggestion } 
                        }));
                      }}
                    >
                      {suggestion}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (!query) {
    return null;
  }

  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Search Results Header */}
        <div className="flex items-center gap-3 mb-6">
          <Search className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Search Results for "{query}"
          </h2>
          <div className="flex items-center gap-1 text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            <Sparkles className="w-3 h-3" />
            <span>{totalResults} products found</span>
          </div>
        </div>

        {/* Category Breakdown */}
        {results.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(results.map(r => r.category))).map(category => (
                <span
                  key={category}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm capitalize"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {transformedProducts.map((product) => (
            <div key={product.id} className="relative">
              <EnhancedProductCard
                name={product.name}
                image={product.image}
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                rating={product.rating}
                retailer={product.retailer}
                retailerLogo={product.retailerLogo}
                availability={product.availability}
                buyUrl={product.buyUrl}
                lastUpdated={product.lastUpdated}
              />
              
              {/* Brand Badge */}
              <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-full">
                {product.brand}
              </div>
            </div>
          ))}
        </div>

        {/* Search Suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-900 mb-2">Related searches:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm cursor-pointer hover:bg-blue-200 transition-colors"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('search-suggestion', { 
                      detail: { suggestion } 
                    }));
                  }}
                >
                  {suggestion}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
