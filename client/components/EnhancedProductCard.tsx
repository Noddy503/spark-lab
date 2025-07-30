import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { PriceDisplay } from "./PriceDisplay";

interface EnhancedProductCardProps {
  id?: string;
  name: string;
  image: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  rating?: number;
  retailer: string;
  retailerLogo?: string;
  availability?: string;
  buyUrl?: string;
  lastUpdated?: string;
}

export function EnhancedProductCard({
  id,
  name,
  image,
  price,
  originalPrice,
  discount,
  rating,
  retailer,
  retailerLogo,
  availability,
  buyUrl,
  lastUpdated
}: EnhancedProductCardProps) {

  const handleBuyClick = () => {
    if (buyUrl) {
      window.open(buyUrl, '_blank', 'noopener,noreferrer');
    }
  };
  return (
    <Card className="w-full border border-gray-200 rounded-lg md:rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-3 md:p-4">
        {/* Product Image */}
        <div className="aspect-square bg-gray-50 rounded-lg mb-3 md:mb-4 flex items-center justify-center">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain p-2 md:p-4"
          />
        </div>

        {/* Product Name */}
        <h3 className="font-medium text-gray-900 text-xs md:text-sm mb-2 line-clamp-2">
          {name}
        </h3>

        {/* Rating and Availability Row */}
        {(rating || availability) && (
          <div className="flex items-center gap-2 mb-2">
            {/* Rating */}
            {rating && (
              <div className="flex items-center gap-1 bg-green-600 text-white px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs">
                <span>{rating}</span>
                <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />
              </div>
            )}
            
            {/* Availability Status */}
            {availability && (
              <div className={`text-xs px-2 py-1 rounded font-medium ${
                availability === 'In Stock' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {availability} {availability === 'In Stock' && <span className="font-bold">750</span>}
              </div>
            )}
          </div>
        )}

        {/* Price Section */}
        <div className="mb-3 md:mb-4">
          <PriceDisplay
            price={price}
            originalPrice={originalPrice}
            discount={discount}
            lastUpdated={lastUpdated}
            size="sm"
          />
        </div>

        {/* Retailer Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 md:gap-2">
            {retailerLogo && (
              <img
                src={retailerLogo}
                alt={retailer}
                className="w-5 h-5 md:w-6 md:h-6 object-contain"
              />
            )}
            <span className="text-xs text-gray-600">{retailer}</span>
          </div>
          <Button
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 md:px-3 py-1 h-6 md:h-7"
            onClick={handleBuyClick}
          >
            BUY
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
