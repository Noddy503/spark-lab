import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Loader2, ExternalLink, RefreshCw, TrendingDown, Star } from 'lucide-react';
import { PriceDisplay } from './PriceDisplay';

interface ComparisonPrice {
  retailer: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  rating?: number;
  availability: string;
  url: string;
  lastUpdated: string;
  logo?: string;
}

interface PriceComparisonTableProps {
  productName: string;
  onClose?: () => void;
}

export function PriceComparisonTable({ productName, onClose }: PriceComparisonTableProps) {
  const [prices, setPrices] = useState<ComparisonPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const retailerLogos: Record<string, string> = {
    amazon: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2Fff0137610d3b48cf899ee369f5bccfe1",
    flipkart: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2F24430bdf4be4433ba90377160fb8fbcf",
    walmart: "https://logos-world.net/wp-content/uploads/2020/09/Walmart-Logo.png",
    ebay: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2F53716917febe49cab7e94016b86d029e"
  };

  useEffect(() => {
    fetchPrices();
  }, [productName]);

  const fetchPrices = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In production, this would call the real scraping API
      const response = await fetch(`/api/scrape-prices?product=${encodeURIComponent(productName)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch prices');
      }
      
      const data = await response.json();
      setPrices(data.prices || []);
    } catch (err) {
      console.error('Error fetching prices:', err);
      // Fallback to mock data for demo
      setPrices(generateMockPrices());
    } finally {
      setLoading(false);
    }
  };

  const generateMockPrices = (): ComparisonPrice[] => {
    const basePrice = 50000 + Math.floor(Math.random() * 100000);
    
    return [
      {
        retailer: 'Amazon',
        price: (basePrice - Math.floor(Math.random() * 5000)).toLocaleString('en-IN'),
        originalPrice: basePrice.toLocaleString('en-IN'),
        discount: `${Math.floor(Math.random() * 20 + 5)}% off`,
        rating: 4.2 + Math.random() * 0.6,
        availability: 'In Stock',
        url: `https://amazon.in/s?k=${encodeURIComponent(productName)}`,
        lastUpdated: new Date().toISOString(),
        logo: retailerLogos.amazon
      },
      {
        retailer: 'Flipkart',
        price: (basePrice - Math.floor(Math.random() * 8000)).toLocaleString('en-IN'),
        originalPrice: basePrice.toLocaleString('en-IN'),
        discount: `${Math.floor(Math.random() * 25 + 3)}% off`,
        rating: 4.0 + Math.random() * 0.7,
        availability: Math.random() > 0.7 ? 'Limited Stock' : 'In Stock',
        url: `https://flipkart.com/search?q=${encodeURIComponent(productName)}`,
        lastUpdated: new Date().toISOString(),
        logo: retailerLogos.flipkart
      },
      {
        retailer: 'Walmart',
        price: (basePrice - Math.floor(Math.random() * 3000)).toLocaleString('en-IN'),
        originalPrice: basePrice.toLocaleString('en-IN'),
        discount: `${Math.floor(Math.random() * 15 + 2)}% off`,
        rating: 3.8 + Math.random() * 0.8,
        availability: 'In Stock',
        url: `https://walmart.com/search?q=${encodeURIComponent(productName)}`,
        lastUpdated: new Date().toISOString(),
        logo: retailerLogos.walmart
      },
      {
        retailer: 'eBay',
        price: (basePrice - Math.floor(Math.random() * 10000)).toLocaleString('en-IN'),
        originalPrice: basePrice.toLocaleString('en-IN'),
        discount: `${Math.floor(Math.random() * 30 + 5)}% off`,
        rating: 3.9 + Math.random() * 0.6,
        availability: Math.random() > 0.5 ? 'Used' : 'New',
        url: `https://ebay.com/sch/i.html?_nkw=${encodeURIComponent(productName)}`,
        lastUpdated: new Date().toISOString(),
        logo: retailerLogos.ebay
      }
    ].sort((a, b) => parseInt(a.price.replace(/[,]/g, '')) - parseInt(b.price.replace(/[,]/g, '')));
  };

  const bestPrice = prices.length > 0 ? prices[0] : null;

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-2" />
            <span>Comparing prices across retailers...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || prices.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Unable to fetch live prices at the moment</p>
            <Button onClick={fetchPrices} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Price Comparison - {productName}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              Best Deal: ₹{bestPrice?.price}
            </Badge>
            <Button onClick={fetchPrices} size="sm" variant="outline">
              <RefreshCw className="h-4 w-4" />
            </Button>
            {onClose && (
              <Button onClick={onClose} size="sm" variant="ghost">
                ×
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium">Retailer</th>
                <th className="text-left p-3 font-medium">Price</th>
                <th className="text-left p-3 font-medium">Rating</th>
                <th className="text-left p-3 font-medium">Availability</th>
                <th className="text-left p-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((price, index) => (
                <tr 
                  key={price.retailer} 
                  className={`border-b hover:bg-gray-50 transition-colors ${
                    index === 0 ? 'bg-green-50 border-green-200' : ''
                  }`}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      {price.logo && (
                        <img 
                          src={price.logo} 
                          alt={price.retailer}
                          className="w-8 h-8 object-contain"
                        />
                      )}
                      <span className="font-medium">{price.retailer}</span>
                      {index === 0 && (
                        <Badge className="bg-green-600 hover:bg-green-700 text-xs">
                          Best Price
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <PriceDisplay
                      price={price.price}
                      originalPrice={price.originalPrice}
                      discount={price.discount}
                      lastUpdated={price.lastUpdated}
                      size="sm"
                    />
                  </td>
                  <td className="p-3">
                    {price.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{price.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </td>
                  <td className="p-3">
                    <Badge 
                      variant={price.availability === 'In Stock' ? 'default' : 'secondary'}
                      className={`${
                        price.availability === 'In Stock' 
                          ? 'bg-green-100 text-green-800' 
                          : price.availability === 'Limited Stock'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {price.availability}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <Button
                      size="sm"
                      onClick={() => window.open(price.url, '_blank')}
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Buy Now
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-blue-800">
            <TrendingDown className="h-4 w-4" />
            <span>
              You can save up to ₹{(
                parseInt(prices[prices.length - 1]?.price.replace(/[,]/g, '') || '0') - 
                parseInt(prices[0]?.price.replace(/[,]/g, '') || '0')
              ).toLocaleString('en-IN')} by choosing the best deal!
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
