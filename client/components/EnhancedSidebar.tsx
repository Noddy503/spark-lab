import {
  Smartphone,
  Tv,
  Shirt,
  ShoppingBag,
  Watch,
  UtensilsCrossed,
  Store,
  Package,
  Globe,
  Car,
  Apple as AppleIcon,
  Monitor,
  Palette,
  Menu,
  X,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ToggleSwitch } from "./ui/toggle-switch";
import { useRetailerContext } from "../context/RetailerContext";
import { useBrandContext } from "../context/BrandContext";
import { useState, useEffect, useRef } from "react";
import { cn } from "../lib/utils";

export function EnhancedSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const hoverAreaRef = useRef<HTMLDivElement>(null);
  const { selectedRetailers, toggleRetailer, isRetailerSelected, clearAllRetailers, selectAllRetailers } = useRetailerContext();
  const { selectedBrand, selectBrand, clearBrandSelection } = useBrandContext();

  const categories = [
    {
      id: 'smartphones',
      name: 'Smart Phone',
      icon: Smartphone,
      color: 'text-blue-500',
      brands: ['Apple', 'Samsung', 'Google', 'Vivo', 'Oppo', 'Redmi', 'Realme', 'Xiaomi', 'OnePlus', 'Motorola']
    },
    {
      id: 'smart-tvs',
      name: 'Smart TVs',
      icon: Tv,
      color: 'text-purple-500',
      brands: ['TCL', 'Sony', 'Acer', 'Xiaomi', 'Samsung', 'LG', 'Panasonic', 'Philips']
    },
    {
      id: 'clothings',
      name: 'Clothings',
      icon: Shirt,
      color: 'text-green-500',
      brands: ['Zara', 'H&M', 'Zudio', 'Peter England', 'Allen Solly', 'Van Heusen', 'Uniqlo', 'Forever 21']
    },
    {
      id: 'shoes',
      name: 'Shoes',
      icon: ShoppingBag,
      color: 'text-pink-500',
      brands: ['Nike', 'Adidas', 'Puma', 'Reebok', 'Red Tape', 'Red Chief', 'Campus', 'Sketchers']
    },
    {
      id: 'watches',
      name: 'Watches',
      icon: Watch,
      color: 'text-indigo-500',
      brands: ['Apple', 'Samsung', 'Casio', 'Titan', 'Fastrack', 'Noise', 'boAt', 'Fire-Boltt']
    },
    {
      id: 'food',
      name: 'Food',
      icon: UtensilsCrossed,
      color: 'text-red-500',
      brands: ['Zomato', 'Swiggy', 'Zepto', 'Blinkit', 'BigBasket', 'Grofers', 'Amazon Fresh', 'Dunzo']
    }
  ];

  const retailers = [
    { id: 'amazon', name: 'Amazon', icon: Package, color: 'text-orange-600' },
    { id: 'flipkart', name: 'Flipkart', icon: Store, color: 'text-blue-600' },
    { id: 'ebay', name: 'ebay', icon: Globe, color: 'text-blue-400' },
    { id: 'zomato', name: 'Zomato', icon: UtensilsCrossed, color: 'text-red-600' },
    { id: 'swiggy', name: 'Swiggy', icon: Car, color: 'text-orange-500' },
    { id: 'apple', name: 'Apple', icon: AppleIcon, color: 'text-gray-600' },
    { id: 'samsung', name: 'Samsung', icon: Monitor, color: 'text-blue-700' },
    { id: 'zara', name: 'Zara', icon: Palette, color: 'text-black' }
  ];

  // Handle mouse movement near the edge
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const threshold = 50; // pixels from left edge
      if (e.clientX <= threshold && !isOpen) {
        setIsHovering(true);
      } else if (e.clientX > 300 && isOpen && !isHovering) {
        // Close if mouse moves away from sidebar
        setIsOpen(false);
      }
    };

    const handleMouseLeave = () => {
      if (!isOpen) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isOpen, isHovering]);

  // Auto-open when hovering near edge
  useEffect(() => {
    if (isHovering && !isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 300); // Small delay to prevent accidental opens

      return () => clearTimeout(timer);
    }
  }, [isHovering, isOpen]);

  const handleSidebarEnter = () => {
    setIsHovering(true);
    setIsOpen(true);
  };

  const handleSidebarLeave = () => {
    setIsHovering(false);
    // Don't immediately close, give some buffer time
    setTimeout(() => {
      if (!isHovering) {
        setIsOpen(false);
      }
    }, 500);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleBrandClick = (brand: string, category: string) => {
    selectBrand(brand, category);
    // Close sidebar after brand selection
    setIsOpen(false);
  };

  return (
    <>
      {/* Hover Detection Area */}
      <div
        ref={hoverAreaRef}
        className="fixed left-0 top-0 w-12 h-full z-40 pointer-events-auto"
        onMouseEnter={handleSidebarEnter}
      />

      {/* Hamburger Menu Button */}
      <div className="fixed left-4 top-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "transition-all duration-300 bg-white/90 backdrop-blur-sm border-gray-300 hover:bg-gray-50",
            isOpen && "translate-x-64"
          )}
        >
          {isOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={cn(
          "fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 ease-in-out shadow-xl overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        onMouseEnter={handleSidebarEnter}
        onMouseLeave={handleSidebarLeave}
      >
        <div className="p-6 space-y-6 mt-12">
          {/* Categories Section */}
          <Card className="border-gray-100 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-blue-500" />
                Category
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                const isExpanded = expandedCategory === category.id;

                return (
                  <div key={category.id} className="space-y-2">
                    <Button
                      variant="ghost"
                      onClick={() => toggleCategory(category.id)}
                      className="w-full justify-between gap-3 text-left p-3 h-auto hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className={`w-5 h-5 ${category.color} group-hover:scale-110 transition-transform`} />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                          {category.name}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-400 transition-transform" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400 transition-transform" />
                      )}
                    </Button>

                    {isExpanded && (
                      <div className="ml-8 space-y-1 animate-in slide-in-from-top duration-200">
                        {category.brands.map((brand, index) => {
                          const isSelected = selectedBrand === brand;
                          return (
                            <div
                              key={index}
                              onClick={() => handleBrandClick(brand, category.id)}
                              className={cn(
                                "px-3 py-2 text-sm rounded-md cursor-pointer transition-all duration-200 flex items-center gap-2",
                                isSelected
                                  ? "bg-blue-100 text-blue-900 font-medium border border-blue-200"
                                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                              )}
                            >
                              <div className={cn(
                                "w-2 h-2 rounded-full transition-colors",
                                isSelected
                                  ? "bg-blue-600"
                                  : category.color.replace('text-', 'bg-')
                              )} />
                              {brand}
                              {isSelected && (
                                <div className="ml-auto">
                                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Compare Popular Websites */}
          <Card className="border-gray-100 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-green-500" />
                Compare Popular Website
              </CardTitle>
              <div className="flex gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={selectAllRetailers}
                  className="text-xs bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
                >
                  Select All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllRetailers}
                  className="text-xs bg-red-50 hover:bg-red-100 border-red-200 text-red-700"
                >
                  Clear All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {retailers.map((retailer) => {
                const IconComponent = retailer.icon;
                const isSelected = isRetailerSelected(retailer.id);

                return (
                  <div
                    key={retailer.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer group",
                      isSelected 
                        ? "bg-blue-50 border border-blue-200" 
                        : "hover:bg-gray-50 border border-transparent"
                    )}
                    onClick={() => toggleRetailer(retailer.id)}
                  >
                    {/* Toggle Switch */}
                    <div className="flex-shrink-0">
                      <ToggleSwitch
                        checked={isSelected}
                        onChange={() => toggleRetailer(retailer.id)}
                        size="sm"
                      />
                    </div>

                    {/* Icon */}
                    <IconComponent 
                      className={cn(
                        "w-5 h-5 transition-transform group-hover:scale-110",
                        retailer.color
                      )} 
                    />

                    {/* Name */}
                    <span
                      className={cn(
                        "text-sm flex-1 transition-colors",
                        isSelected 
                          ? "text-blue-900 font-medium" 
                          : "text-gray-600 group-hover:text-gray-900"
                      )}
                    >
                      {retailer.name}
                    </span>
                  </div>
                );
              })}

              {/* Selected Count */}
              <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-800">
                  <span className="font-bold">{selectedRetailers.length}</span> of {retailers.length} retailers selected
                </p>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(selectedRetailers.length / retailers.length) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>
    </>
  );
}
