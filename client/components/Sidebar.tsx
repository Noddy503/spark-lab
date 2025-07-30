import {
  Smartphone,
  Tv,
  Shirt,
  Zap,
  ShoppingBag,
  Watch,
  ShoppingCart,
  UtensilsCrossed,
  Store,
  Package,
  Globe,
  ShoppingBasket,
  Car,
  Apple as AppleIcon,
  Monitor,
  Palette
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ToggleSwitch } from "./ui/toggle-switch";
import { useRetailerContext } from "../context/RetailerContext";

export function Sidebar() {
  const { selectedRetailers, toggleRetailer, isRetailerSelected, clearAllRetailers, selectAllRetailers } = useRetailerContext();

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

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Compare Popular Products */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Compare Popular Products
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-left"
            >
              <Smartphone className="w-4 h-4 text-blue-500" />
              Smart Phones
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-left"
            >
              <Tv className="w-4 h-4 text-purple-500" />
              Smart TVs
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-left"
            >
              <Shirt className="w-4 h-4 text-green-500" />
              Clothings
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-left"
            >
              <Zap className="w-4 h-4 text-yellow-500" />
              Electronics
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-left"
            >
              <ShoppingBag className="w-4 h-4 text-pink-500" />
              Shoes
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-left"
            >
              <Watch className="w-4 h-4 text-indigo-500" />
              Watches
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-left"
            >
              <ShoppingCart className="w-4 h-4 text-orange-500" />
              Groceries
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-left"
            >
              <UtensilsCrossed className="w-4 h-4 text-red-500" />
              Food
            </Button>
          </CardContent>
        </Card>

        {/* Compare Popular Websites with Checkboxes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Compare Popular Website
            </CardTitle>
            <div className="flex gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={selectAllRetailers}
                className="text-xs"
              >
                Select All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllRetailers}
                className="text-xs"
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
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
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
                  <IconComponent className={`w-4 h-4 ${retailer.color}`} />

                  {/* Name */}
                  <span
                    className={`text-sm cursor-pointer flex-1 ${
                      isSelected ? 'text-gray-900 font-medium' : 'text-gray-600'
                    }`}
                    onClick={() => toggleRetailer(retailer.id)}
                  >
                    {retailer.name}
                  </span>
                </div>
              );
            })}

            {/* Selected Count */}
            <div className="mt-4 p-2 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700">
                <span className="font-semibold">{selectedRetailers.length}</span> retailers selected
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
