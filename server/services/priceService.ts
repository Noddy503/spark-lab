// Real-time price service that simulates fetching current market prices
// In a production environment, this would integrate with retailer APIs or web scraping services
import { RETAILER_LOGOS } from "../constants/retailerLogos";

interface PriceData {
  price: string;
  originalPrice?: string;
  discount?: string;
  rating: number;
  availability: string;
  lastUpdated: string;
  retailerLogo?: string;
}

interface ProductPricing {
  [retailer: string]: PriceData;
}

// Current market-accurate pricing data (updated based on real market prices as of 2024)
const marketPrices: { [productId: string]: ProductPricing } = {
  "iphone-16-pro": {
    apple: {
      price: "1,19,900",
      originalPrice: "1,19,900",
      rating: 4.5,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    amazon: {
      price: "1,15,999",
      originalPrice: "1,19,900",
      discount: "3% off",
      rating: 4.3,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    flipkart: {
      price: "1,14,999",
      originalPrice: "1,19,900",
      discount: "4% off",
      rating: 4.1,
      availability: "Limited Stock",
      lastUpdated: new Date().toISOString()
    }
  },
  "samsung-galaxy-s24-ultra": {
    samsung: {
      price: "1,34,999",
      originalPrice: "1,34,999",
      rating: 4.4,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    amazon: {
      price: "81,590",
      originalPrice: "1,34,999",
      discount: "40% off",
      rating: 4.2,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    flipkart: {
      price: "82,999",
      originalPrice: "1,34,999",
      discount: "38% off",
      rating: 4.0,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    }
  },
  "oneplus-12": {
    oneplus: {
      price: "64,999",
      originalPrice: "64,999",
      rating: 4.3,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    amazon: {
      price: "51,997",
      originalPrice: "64,999",
      discount: "20% off",
      rating: 4.1,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    flipkart: {
      price: "52,999",
      originalPrice: "64,999",
      discount: "18% off",
      rating: 3.9,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    }
  },
  "xiaomi-14": {
    xiaomi: {
      price: "69,999",
      originalPrice: "69,999",
      rating: 4.3,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    amazon: {
      price: "54,999",
      originalPrice: "69,999",
      discount: "21% off",
      rating: 4.1,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    flipkart: {
      price: "55,999",
      originalPrice: "69,999",
      discount: "20% off",
      rating: 3.9,
      availability: "Limited Stock",
      lastUpdated: new Date().toISOString()
    }
  },
  "redmi-note-13-pro": {
    xiaomi: {
      price: "24,999",
      originalPrice: "24,999",
      rating: 4.2,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    amazon: {
      price: "19,999",
      originalPrice: "24,999",
      discount: "20% off",
      rating: 4.0,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    flipkart: {
      price: "20,499",
      originalPrice: "24,999",
      discount: "18% off",
      rating: 3.8,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    }
  },
  "vivo-x100": {
    vivo: {
      price: "63,999",
      originalPrice: "63,999",
      rating: 4.2,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    amazon: {
      price: "49,999",
      originalPrice: "63,999",
      discount: "22% off",
      rating: 4.0,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    flipkart: {
      price: "51,999",
      originalPrice: "63,999",
      discount: "19% off",
      rating: 3.8,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    }
  },
  "oppo-find-x7": {
    oppo: {
      price: "54,999",
      originalPrice: "54,999",
      rating: 4.1,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    amazon: {
      price: "44,999",
      originalPrice: "54,999",
      discount: "18% off",
      rating: 3.9,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    flipkart: {
      price: "46,999",
      originalPrice: "54,999",
      discount: "15% off",
      rating: 3.7,
      availability: "Limited Stock",
      lastUpdated: new Date().toISOString()
    }
  },
  "realme-12-pro": {
    realme: {
      price: "29,999",
      originalPrice: "29,999",
      rating: 4.0,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    amazon: {
      price: "24,999",
      originalPrice: "29,999",
      discount: "17% off",
      rating: 3.8,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    flipkart: {
      price: "25,999",
      originalPrice: "29,999",
      discount: "13% off",
      rating: 3.6,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    }
  },
  "motorola-edge-50": {
    motorola: {
      price: "34,999",
      originalPrice: "34,999",
      rating: 4.1,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    amazon: {
      price: "27,999",
      originalPrice: "34,999",
      discount: "20% off",
      rating: 3.9,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    flipkart: {
      price: "28,999",
      originalPrice: "34,999",
      discount: "17% off",
      rating: 3.7,
      availability: "Limited Stock",
      lastUpdated: new Date().toISOString()
    }
  },
  "iphone-16": {
    apple: {
      price: "79,900",
      originalPrice: "79,900",
      rating: 4.4,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    amazon: {
      price: "76,999",
      originalPrice: "79,900",
      discount: "4% off",
      rating: 4.2,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    flipkart: {
      price: "75,999",
      originalPrice: "79,900",
      discount: "5% off",
      rating: 4.0,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    }
  },
  "iphone-15-pro": {
    apple: {
      price: "1,19,900",
      originalPrice: "1,19,900",
      rating: 4.6,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    amazon: {
      price: "1,05,999",
      originalPrice: "1,19,900",
      discount: "12% off",
      rating: 4.4,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    flipkart: {
      price: "1,07,999",
      originalPrice: "1,19,900",
      discount: "10% off",
      rating: 4.2,
      availability: "Limited Stock",
      lastUpdated: new Date().toISOString()
    }
  },
  "macbook-pro-m3": {
    apple: {
      price: "1,99,900",
      originalPrice: "1,99,900",
      rating: 4.7,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    amazon: {
      price: "1,89,999",
      originalPrice: "1,99,900",
      discount: "5% off",
      rating: 4.5,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    flipkart: {
      price: "1,91,999",
      originalPrice: "1,99,900",
      discount: "4% off",
      rating: 4.3,
      availability: "Limited Stock",
      lastUpdated: new Date().toISOString()
    }
  },
  "macbook-air-m2": {
    apple: {
      price: "1,14,900",
      originalPrice: "1,14,900",
      rating: 4.6,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    amazon: {
      price: "1,06,999",
      originalPrice: "1,14,900",
      discount: "7% off",
      rating: 4.4,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    flipkart: {
      price: "1,08,999",
      originalPrice: "1,14,900",
      discount: "5% off",
      rating: 4.2,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    }
  },
  "ipad-pro-m4": {
    apple: {
      price: "1,29,900",
      originalPrice: "1,29,900",
      rating: 4.8,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    amazon: {
      price: "1,19,999",
      originalPrice: "1,29,900",
      discount: "8% off",
      rating: 4.6,
      availability: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    flipkart: {
      price: "1,21,999",
      originalPrice: "1,29,900",
      discount: "6% off",
      rating: 4.4,
      availability: "Limited Stock",
      lastUpdated: new Date().toISOString()
    }
  }
};

// Simulate price fluctuations to make it feel more real-time
export function getCurrentMarketPrice(productId: string, retailer: string): PriceData | null {
  const productPricing = marketPrices[productId];
  if (!productPricing || !productPricing[retailer]) {
    return null;
  }

  const basePrice = productPricing[retailer];

  // Add small random fluctuations (±2%) to simulate real-time changes
  const fluctuation = (Math.random() - 0.5) * 0.04; // ±2%
  const priceNumber = parseInt(basePrice.price.replace(/[,]/g, ''));
  const fluctuatedPrice = Math.round(priceNumber * (1 + fluctuation));

  // Format back to Indian currency format
  const formattedPrice = fluctuatedPrice.toLocaleString('en-IN');

  return {
    ...basePrice,
    price: formattedPrice,
    retailerLogo: RETAILER_LOGOS[retailer as keyof typeof RETAILER_LOGOS],
    lastUpdated: new Date().toISOString()
  };
}

export function getAllMarketPrices(productId: string): ProductPricing | null {
  const productPricing = marketPrices[productId];
  if (!productPricing) {
    return null;
  }

  const updatedPricing: ProductPricing = {};
  
  for (const [retailer, priceData] of Object.entries(productPricing)) {
    const currentPrice = getCurrentMarketPrice(productId, retailer);
    if (currentPrice) {
      updatedPricing[retailer] = currentPrice;
    }
  }
  
  return updatedPricing;
}

// Function to check if prices need updating (simulate periodic updates)
export function shouldUpdatePrices(lastUpdate: string): boolean {
  const lastUpdateTime = new Date(lastUpdate).getTime();
  const now = new Date().getTime();
  const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
  
  return (now - lastUpdateTime) > fiveMinutes;
}

export function getProductAvailability(productId: string, retailer: string): string {
  const availabilityOptions = ['In Stock', 'Limited Stock', 'Out of Stock'];
  const weights = [0.7, 0.25, 0.05]; // 70% in stock, 25% limited, 5% out of stock
  
  // Use product and retailer as seed for consistent results
  const seed = (productId + retailer).split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const random = (seed % 100) / 100;
  
  let cumulative = 0;
  for (let i = 0; i < weights.length; i++) {
    cumulative += weights[i];
    if (random <= cumulative) {
      return availabilityOptions[i];
    }
  }
  
  return 'In Stock';
}
