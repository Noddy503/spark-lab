import { RequestHandler } from "express";

// Mock data that simulates real-time pricing from different retailers
// In production, this would connect to legitimate APIs or scraping services
const mockProductData = {
  "iphone-16-pro": {
    apple: {
      price: "1,29,900",
      rating: 4.5,
      availability: "In Stock",
      image: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2Fad26dd292d284e46a50f612d6aa5d922",
      buyUrl: "https://www.apple.com/iphone-16-pro/",
      lastUpdated: new Date().toISOString()
    },
    amazon: {
      price: "1,28,999",
      rating: 4.3,
      availability: "In Stock",
      image: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2F5a45ae397e6145a58c2e2c95d7dcbf51",
      buyUrl: "https://www.amazon.in/s?k=iphone+16+pro",
      lastUpdated: new Date().toISOString()
    },
    flipkart: {
      price: "1,27,500",
      rating: 4.1,
      availability: "Limited Stock",
      image: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2Fc31cb4100d7a43e88639943a860116fe",
      buyUrl: "https://www.flipkart.com/search?q=iphone%2016%20pro",
      lastUpdated: new Date().toISOString()
    },
    ebay: {
      price: "1,26,999",
      rating: 4.0,
      availability: "In Stock",
      image: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2Fc31cb4100d7a43e88639943a860116fe",
      buyUrl: "https://www.ebay.com/sch/i.html?_nkw=iphone+16+pro",
      lastUpdated: new Date().toISOString()
    }
  },
  "sony-tv-55": {
    sony: {
      price: "1,99,999",
      rating: 4.4,
      availability: "In Stock",
      image: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2Fcfff25f8052c40f0b15d4dfa9a0970ca",
      buyUrl: "https://www.sony.co.in/televisions/oled",
      lastUpdated: new Date().toISOString()
    },
    amazon: {
      price: "1,95,999",
      rating: 4.2,
      availability: "In Stock",
      image: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2Fcfff25f8052c40f0b15d4dfa9a0970ca",
      buyUrl: "https://www.amazon.in/s?k=sony+55+inch+oled+bravia+8",
      lastUpdated: new Date().toISOString()
    },
    flipkart: {
      price: "1,94,999",
      rating: 4.0,
      availability: "In Stock",
      image: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2Fcfff25f8052c40f0b15d4dfa9a0970ca",
      buyUrl: "https://www.flipkart.com/search?q=sony%20bravia%208%20oled%2055%20inch",
      lastUpdated: new Date().toISOString()
    },
    ebay: {
      price: "1,93,999",
      rating: 3.8,
      availability: "In Stock",
      image: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2Fcfff25f8052c40f0b15d4dfa9a0970ca",
      buyUrl: "https://www.ebay.com/sch/i.html?_nkw=sony+bravia+8+55+inch+oled",
      lastUpdated: new Date().toISOString()
    }
  }
};

// Simulate price fluctuations to demo real-time updates
function simulatePriceChanges() {
  Object.keys(mockProductData).forEach(productKey => {
    const product = mockProductData[productKey as keyof typeof mockProductData];
    Object.keys(product).forEach(retailer => {
      const retailerData = product[retailer as keyof typeof product];
      // Randomly adjust prices by ±2%
      const currentPrice = parseInt(retailerData.price.replace(/,/g, ''));
      const variation = Math.random() * 0.04 - 0.02; // -2% to +2%
      const newPrice = Math.round(currentPrice * (1 + variation));
      retailerData.price = newPrice.toLocaleString('en-IN');
      retailerData.lastUpdated = new Date().toISOString();
    });
  });
}

// Simulate price updates every 30 seconds
setInterval(simulatePriceChanges, 30000);

export const handleProductComparison: RequestHandler = (req, res) => {
  const { productId } = req.params;
  
  if (!productId || !mockProductData[productId as keyof typeof mockProductData]) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const productData = mockProductData[productId as keyof typeof mockProductData];
  
  res.json({
    productId,
    retailers: productData,
    lastUpdated: new Date().toISOString(),
    // In production, this would indicate data freshness
    dataSource: 'mock', // 'live', 'cached', 'mock'
  });
};

export const handleAllProducts: RequestHandler = (req, res) => {
  res.json({
    products: mockProductData,
    lastUpdated: new Date().toISOString(),
    totalProducts: Object.keys(mockProductData).length
  });
};

// Endpoint to get latest prices for a specific retailer
export const handleRetailerPrices: RequestHandler = (req, res) => {
  const { retailer } = req.params;
  
  const retailerProducts: any = {};
  
  Object.keys(mockProductData).forEach(productKey => {
    const product = mockProductData[productKey as keyof typeof mockProductData];
    if (product[retailer as keyof typeof product]) {
      retailerProducts[productKey] = product[retailer as keyof typeof product];
    }
  });
  
  if (Object.keys(retailerProducts).length === 0) {
    return res.status(404).json({ error: 'Retailer not found' });
  }
  
  res.json({
    retailer,
    products: retailerProducts,
    lastUpdated: new Date().toISOString()
  });
};
