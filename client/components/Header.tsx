import { Globe } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        {/* Left side - Subscribe notification */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm">
              P
            </div>
          </div>
          <span className="text-gray-600 text-xs md:text-sm hidden sm:block">
            Subscribe to Price Drops
          </span>
        </div>

        {/* Center - OnlineShop AI Logo */}
        <div className="flex items-center">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold">
              <span className="text-blue-500">OnlineShop AI</span>
            </h1>
            <p className="text-xs text-gray-500 -mt-1">by Noddy</p>
          </div>
        </div>

        {/* Right side - Language selector */}
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="flex items-center gap-1 md:gap-2 text-gray-600">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline text-xs md:text-sm">Language</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
