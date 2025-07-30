import { Badge } from "./ui/badge";
import { Clock } from "lucide-react";

interface PriceDisplayProps {
  price: string;
  originalPrice?: string;
  discount?: string;
  lastUpdated?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PriceDisplay({ 
  price, 
  originalPrice, 
  discount, 
  lastUpdated,
  size = 'md' 
}: PriceDisplayProps) {
  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const updated = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - updated.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const sizeClasses = {
    sm: {
      price: 'text-lg font-bold',
      originalPrice: 'text-sm',
      discount: 'text-xs'
    },
    md: {
      price: 'text-xl font-bold',
      originalPrice: 'text-base',
      discount: 'text-sm'
    },
    lg: {
      price: 'text-2xl font-bold',
      originalPrice: 'text-lg',
      discount: 'text-base'
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-green-600 ${sizeClasses[size].price}`}>
          ₹{price}
        </span>
        
        {originalPrice && originalPrice !== price && (
          <span className={`text-gray-500 line-through ${sizeClasses[size].originalPrice}`}>
            ₹{originalPrice}
          </span>
        )}
        
        {discount && (
          <Badge variant="destructive" className={`${sizeClasses[size].discount}`}>
            {discount}
          </Badge>
        )}
      </div>
      
      {lastUpdated && (
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="h-3 w-3" />
          <span>Updated {formatTimeAgo(lastUpdated)}</span>
        </div>
      )}
    </div>
  );
}
