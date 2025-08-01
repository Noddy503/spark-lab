import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handlePlaceholder } from "./routes/placeholder";
import { handleProductComparison, handleAllProducts, handleRetailerPrices } from "./routes/products";
import { handleSearch, handleSearchSuggestions } from "./routes/search";
import { handleTrendingProducts, handleTrendingByRetailer } from "./routes/trending";
import { handleScrapeRealTimePrices, handleBulkPriceScraping, handlePriceMonitoring } from "./routes/realTimePricing";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Placeholder image route
  app.get("/api/placeholder/:width/:height", handlePlaceholder);

  // Product comparison routes
  app.get("/api/products", handleAllProducts);
  app.get("/api/products/:productId", handleProductComparison);
  app.get("/api/retailers/:retailer", handleRetailerPrices);

  // Search routes
  app.get("/api/search", handleSearch);
  app.get("/api/search/suggestions", handleSearchSuggestions);

  // Trending products routes
  app.get("/api/trending", handleTrendingProducts);
  app.get("/api/trending/retailer", handleTrendingByRetailer);

  // Real-time pricing routes
  app.get("/api/scrape-prices", handleScrapeRealTimePrices);
  app.post("/api/bulk-scrape", handleBulkPriceScraping);
  app.post("/api/price-monitoring", handlePriceMonitoring);

  return app;
}
