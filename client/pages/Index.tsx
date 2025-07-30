import { Header } from "../components/Header";
import { SearchSection } from "../components/SearchSection";
import { ProductGrid } from "../components/ProductGrid";
import { RealTimeProductGrid } from "../components/RealTimeProductGrid";
import { TrendingProductGrid } from "../components/TrendingProductGrid";
import { BrandProductGrid } from "../components/BrandProductGrid";
import { SearchResults } from "../components/SearchResults";
import { EnhancedSidebar } from "../components/EnhancedSidebar";
import { RetailerProvider } from "../context/RetailerContext";
import { BrandProvider, useBrandContext } from "../context/BrandContext";
import { useSearch } from "../hooks/useSearch";

const smartPhoneProducts = [
  {
    id: "1",
    name: "iPhone 16 Pro - 218GB",
    image: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2Fad26dd292d284e46a50f612d6aa5d922",
    price: "1,29,999",
    rating: 4,
    retailer: "Apple",
    retailerLogo: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2F35da3c4f15b240fda7e67578963c095d"
  },
  {
    id: "2",
    name: "iPhone 16 Pro - 218GB",
    image: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2F5a45ae397e6145a58c2e2c95d7dcbf51",
    price: "1,28,999",
    rating: 3.5,
    retailer: "Amazon",
    retailerLogo: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2Fff0137610d3b48cf899ee369f5bccfe1"
  },
  {
    id: "3",
    name: "iPhone 16 Pro - 218GB",
    image: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2Fc31cb4100d7a43e88639943a860116fe",
    price: "1,28,500",
    rating: 3,
    retailer: "Flipkart",
    retailerLogo: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2F24430bdf4be4433ba90377160fb8fbcf"
  },
  {
    id: "4",
    name: "iPhone 16 Pro - 218GB",
    image: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2Fc31cb4100d7a43e88639943a860116fe",
    price: "1,27,999",
    rating: 4,
    retailer: "UNI",
    retailerLogo: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2F09c420c5e24b419d9d2025538b7f2739"
  },
  {
    id: "5",
    name: "iPhone 16 Pro - 218GB",
    image: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2Fc31cb4100d7a43e88639943a860116fe",
    price: "1,26,999",
    rating: 4,
    retailer: "Snapdeal",
    retailerLogo: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2F674062ad20484bcc80990d1f251070d7"
  }
];

const smartTVProducts = [
  {
    id: "tv1",
    name: "Sony55 Inch OLED 4K Ultra HD TV BRAVIA 8",
    image: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2Fcfff25f8052c40f0b15d4dfa9a0970ca",
    price: "1,99,999",
    rating: 4,
    retailer: "Sony",
    retailerLogo: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2F2cd12cb15903444a9ebd5c962b9fd1aa"
  },
  {
    id: "tv2",
    name: "Sony55 Inch OLED 4K Ultra HD TV BRAVIA 8 ",
    image: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2Fcfff25f8052c40f0b15d4dfa9a0970ca",
    price: "1,95,999",
    rating: 3.5,
    retailer: "Amazon",
    retailerLogo: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2Fff0137610d3b48cf899ee369f5bccfe1"
  },
  {
    id: "tv3",
    name: "Sony55 Inch OLED 4K Ultra HD TV BRAVIA 8 ",
    image: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2Fcfff25f8052c40f0b15d4dfa9a0970ca",
    price: "1,94,999",
    rating: 3,
    retailer: "Flipkart",
    retailerLogo: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2F24430bdf4be4433ba90377160fb8fbcf"
  },
  {
    id: "tv4",
    name: "Sony55 Inch OLED 4K Ultra HD TV BRAVIA 8 ",
    image: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2Fcfff25f8052c40f0b15d4dfa9a0970ca",
    price: "1,94,999",
    rating: 3,
    retailer: "ebay",
    retailerLogo: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2F53716917febe49cab7e94016b86d029e"
  },
  {
    id: "tv5",
    name: "Sony55 Inch OLED 4K Ultra HD TV BRAVIA 8 ",
    image: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2Fcfff25f8052c40f0b15d4dfa9a0970ca",
    price: "1,94,999",
    rating: 3,
    retailer: "Snapdeal",
    retailerLogo: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2F674062ad20484bcc80990d1f251070d7"
  }
];

function MainContent() {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    hasSearched,
    totalResults,
    suggestions,
    clearSearch
  } = useSearch();

  const { selectedBrand } = useBrandContext();

  return (
    <main className="w-full px-4 md:px-6 lg:px-8">
      <SearchSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={setSearchQuery}
        onClearSearch={clearSearch}
      />

      {selectedBrand ? (
        <BrandProductGrid />
      ) : hasSearched ? (
        <SearchResults
          query={searchQuery}
          results={searchResults}
          totalResults={totalResults}
          isLoading={isSearching}
          suggestions={suggestions}
        />
      ) : (
        <>
          <TrendingProductGrid
            title="🛒 Amazon Trending Products - Live Prices"
            category="smartphones"
            retailerFilter="amazon"
            limit={6}
            showHotBadge={true}
          />
          <TrendingProductGrid
            title="🛍️ Flipkart Trending Products - Live Prices"
            category="smartphones"
            retailerFilter="flipkart"
            limit={6}
            showHotBadge={true}
          />
          <TrendingProductGrid
            title="📺 Trending Smart TVs - Live Prices from Top Retailers"
            category="tvs"
            limit={6}
            showHotBadge={true}
          />
          <TrendingProductGrid
            title="💻 Trending Laptops - Best Deals Available"
            category="laptops"
            limit={4}
            showHotBadge={true}
          />
        </>
      )}
    </main>
  );
}

export default function Index() {
  return (
    <RetailerProvider>
      <BrandProvider>
        <div className="min-h-screen bg-gray-50 relative">
          <Header />
          <EnhancedSidebar />
          <div className="w-full">
            <MainContent />
          </div>
        </div>
      </BrandProvider>
    </RetailerProvider>
  );
}
