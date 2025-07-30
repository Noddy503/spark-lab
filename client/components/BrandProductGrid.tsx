import { useTrending } from "../hooks/useTrending";
import { EnhancedProductCard } from "./EnhancedProductCard";
import { useRetailerContext } from "../context/RetailerContext";
import { useBrandContext } from "../context/BrandContext";
import { Badge } from "./ui/badge";
import { Loader2, Building2, Star, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

interface BrandProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  retailers: {
    [key: string]: {
      price: string;
      originalPrice?: string;
      discount?: string;
      rating: number;
      availability: string;
      buyUrl: string;
      lastUpdated: string;
      retailerLogo?: string;
    };
  };
}

export function BrandProductGrid() {
  const { selectedBrand, selectedCategory, clearBrandSelection } = useBrandContext();
  const { selectedRetailers } = useRetailerContext();
  const [brandProducts, setBrandProducts] = useState<BrandProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedBrand) {
      fetchBrandProducts();
    }
  }, [selectedBrand, selectedCategory]);

  const fetchBrandProducts = async () => {
    if (!selectedBrand) return;
    
    setLoading(true);
    try {
      // Simulate API call - in real app this would be an actual API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock brand-specific products data
      const mockProducts = generateMockProducts(selectedBrand, selectedCategory || 'smartphones');
      setBrandProducts(mockProducts);
    } catch (error) {
      console.error('Error fetching brand products:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateMockProducts = (brand: string, category: string): BrandProduct[] => {
    const productTemplates = {
      'Apple': [
        // iPhones - Current Generation
        { name: `iPhone 16 Pro Max - 512GB`, category: 'smartphone', price: '1,44,900', originalPrice: '1,49,900', discount: '3% off' },
        { name: `iPhone 16 Pro - 256GB`, category: 'smartphone', price: '1,15,999', originalPrice: '1,19,900', discount: '3% off' },
        { name: `iPhone 16 Pro - 128GB`, category: 'smartphone', price: '1,09,900', originalPrice: '1,14,900', discount: '4% off' },
        { name: `iPhone 16 Plus - 256GB`, category: 'smartphone', price: '89,900', originalPrice: '94,900', discount: '5% off' },
        { name: `iPhone 16 - 256GB`, category: 'smartphone', price: '84,900', originalPrice: '89,900', discount: '6% off' },
        { name: `iPhone 16 - 128GB`, category: 'smartphone', price: '76,999', originalPrice: '79,900', discount: '4% off' },
        
        // iPhones - Previous Generation
        { name: `iPhone 15 Pro Max - 512GB`, category: 'smartphone', price: '1,34,900', originalPrice: '1,59,900', discount: '16% off' },
        { name: `iPhone 15 Pro - 256GB`, category: 'smartphone', price: '1,05,999', originalPrice: '1,34,900', discount: '21% off' },
        { name: `iPhone 15 Plus - 256GB`, category: 'smartphone', price: '79,900', originalPrice: '94,900', discount: '16% off' },
        { name: `iPhone 15 - 128GB`, category: 'smartphone', price: '69,900', originalPrice: '79,900', discount: '13% off' },
        { name: `iPhone 14 Pro - 256GB`, category: 'smartphone', price: '89,900', originalPrice: '1,29,900', discount: '31% off' },
        { name: `iPhone 14 - 128GB`, category: 'smartphone', price: '59,900', originalPrice: '79,900', discount: '25% off' },
        { name: `iPhone 13 - 128GB`, category: 'smartphone', price: '49,900', originalPrice: '69,900', discount: '29% off' },
        
        // MacBooks
        { name: `MacBook Pro 16" M3 Max - 1TB`, category: 'laptop', price: '3,49,900', originalPrice: '3,69,900', discount: '5% off' },
        { name: `MacBook Pro 14" M3 Pro - 512GB`, category: 'laptop', price: '2,49,900', originalPrice: '2,69,900', discount: '7% off' },
        { name: `MacBook Pro 14" M3 - 512GB`, category: 'laptop', price: '1,89,999', originalPrice: '1,99,900', discount: '5% off' },
        { name: `MacBook Air 15" M3 - 512GB`, category: 'laptop', price: '1,49,900', originalPrice: '1,64,900', discount: '9% off' },
        { name: `MacBook Air 13" M3 - 256GB`, category: 'laptop', price: '1,14,900', originalPrice: '1,24,900', discount: '8% off' },
        { name: `MacBook Air 13" M2 - 256GB`, category: 'laptop', price: '1,06,999', originalPrice: '1,14,900', discount: '7% off' },
        { name: `MacBook Air 13" M1 - 256GB`, category: 'laptop', price: '79,900', originalPrice: '99,900', discount: '20% off' },
        
        // iPads
        { name: `iPad Pro 12.9" M4 - 1TB`, category: 'tablet', price: '1,69,900', originalPrice: '1,79,900', discount: '6% off' },
        { name: `iPad Pro 12.9" M4 - 512GB`, category: 'tablet', price: '1,39,900', originalPrice: '1,49,900', discount: '7% off' },
        { name: `iPad Pro 12.9" M4 - 256GB`, category: 'tablet', price: '1,19,999', originalPrice: '1,29,900', discount: '8% off' },
        { name: `iPad Pro 11" M4 - 512GB`, category: 'tablet', price: '1,19,900', originalPrice: '1,29,900', discount: '8% off' },
        { name: `iPad Air 11" M2 - 256GB`, category: 'tablet', price: '69,900', originalPrice: '74,900', discount: '7% off' },
        { name: `iPad 10th Gen - 256GB`, category: 'tablet', price: '54,900', originalPrice: '59,900', discount: '8% off' },
        { name: `iPad Mini 6th Gen - 256GB`, category: 'tablet', price: '59,900', originalPrice: '64,900', discount: '8% off' },
        
        // Apple Watch
        { name: `Apple Watch Ultra 2 - 49mm`, category: 'watch', price: '89,900', originalPrice: '94,900', discount: '5% off' },
        { name: `Apple Watch Series 10 - 46mm`, category: 'watch', price: '49,900', originalPrice: '54,900', discount: '9% off' },
        { name: `Apple Watch Series 10 - 42mm`, category: 'watch', price: '44,900', originalPrice: '49,900', discount: '10% off' },
        { name: `Apple Watch SE 2nd Gen - 44mm`, category: 'watch', price: '34,900', originalPrice: '39,900', discount: '13% off' },
        { name: `Apple Watch SE 2nd Gen - 40mm`, category: 'watch', price: '29,900', originalPrice: '34,900', discount: '14% off' },
        
        // AirPods & Audio
        { name: `AirPods Pro 2nd Gen with USB-C`, category: 'audio', price: '22,900', originalPrice: '24,900', discount: '8% off' },
        { name: `AirPods 3rd Generation`, category: 'audio', price: '17,900', originalPrice: '19,900', discount: '10% off' },
        { name: `AirPods 2nd Generation`, category: 'audio', price: '12,900', originalPrice: '14,900', discount: '13% off' },
        { name: `AirPods Max - Space Gray`, category: 'audio', price: '49,900', originalPrice: '59,900', discount: '17% off' },
        { name: `HomePod Mini`, category: 'audio', price: '9,900', originalPrice: '10,900', discount: '9% off' },
        
        // Accessories
        { name: `Magic Keyboard for iPad Pro 12.9"`, category: 'accessory', price: '31,900', originalPrice: '35,900', discount: '11% off' },
        { name: `Apple Pencil 2nd Generation`, category: 'accessory', price: '11,900', originalPrice: '13,900', discount: '14% off' },
        { name: `MagSafe Charger`, category: 'accessory', price: '3,900', originalPrice: '4,500', discount: '13% off' }
      ],
      'Samsung': [
        // Galaxy S Series - Latest
        { name: `Galaxy S24 Ultra - 1TB`, category: 'smartphone', price: '1,54,999', originalPrice: '1,64,999', discount: '6% off' },
        { name: `Galaxy S24 Ultra - 512GB`, category: 'smartphone', price: '1,34,999', originalPrice: '1,44,999', discount: '7% off' },
        { name: `Galaxy S24 Ultra - 256GB`, category: 'smartphone', price: '1,21,590', originalPrice: '1,29,999', discount: '6% off' },
        { name: `Galaxy S24+ - 512GB`, category: 'smartphone', price: '1,04,999', originalPrice: '1,14,999', discount: '9% off' },
        { name: `Galaxy S24+ - 256GB`, category: 'smartphone', price: '94,999', originalPrice: '99,999', discount: '5% off' },
        { name: `Galaxy S24 - 256GB`, category: 'smartphone', price: '79,999', originalPrice: '84,999', discount: '6% off' },
        { name: `Galaxy S24 - 128GB`, category: 'smartphone', price: '74,999', originalPrice: '79,999', discount: '6% off' },
        
        // Galaxy S Series - Previous Gen
        { name: `Galaxy S23 Ultra - 512GB`, category: 'smartphone', price: '1,09,999', originalPrice: '1,39,999', discount: '21% off' },
        { name: `Galaxy S23 Ultra - 256GB`, category: 'smartphone', price: '99,999', originalPrice: '1,24,999', discount: '20% off' },
        { name: `Galaxy S23+ - 256GB`, category: 'smartphone', price: '84,999', originalPrice: '94,999', discount: '11% off' },
        { name: `Galaxy S23 - 256GB`, category: 'smartphone', price: '69,999', originalPrice: '79,999', discount: '13% off' },
        { name: `Galaxy S22 Ultra - 256GB`, category: 'smartphone', price: '79,999', originalPrice: '1,09,999', discount: '27% off' },
        { name: `Galaxy S22 - 128GB`, category: 'smartphone', price: '54,999', originalPrice: '72,999', discount: '25% off' },
        
        // Galaxy Z Fold Series
        { name: `Galaxy Z Fold 6 - 1TB`, category: 'smartphone', price: '2,14,999', originalPrice: '2,24,999', discount: '4% off' },
        { name: `Galaxy Z Fold 6 - 512GB`, category: 'smartphone', price: '1,94,999', originalPrice: '2,04,999', discount: '5% off' },
        { name: `Galaxy Z Fold 6 - 256GB`, category: 'smartphone', price: '1,64,999', originalPrice: '1,74,999', discount: '6% off' },
        { name: `Galaxy Z Fold 5 - 512GB`, category: 'smartphone', price: '1,64,999', originalPrice: '1,89,999', discount: '13% off' },
        { name: `Galaxy Z Fold 5 - 256GB`, category: 'smartphone', price: '1,44,999', originalPrice: '1,64,999', discount: '12% off' },
        { name: `Galaxy Z Fold 4 - 256GB`, category: 'smartphone', price: '1,19,999', originalPrice: '1,54,999', discount: '23% off' },
        
        // Galaxy Z Flip Series
        { name: `Galaxy Z Flip 6 - 512GB`, category: 'smartphone', price: '1,19,999', originalPrice: '1,29,999', discount: '8% off' },
        { name: `Galaxy Z Flip 6 - 256GB`, category: 'smartphone', price: '1,09,999', originalPrice: '1,19,999', discount: '8% off' },
        { name: `Galaxy Z Flip 5 - 512GB`, category: 'smartphone', price: '1,04,999', originalPrice: '1,19,999', discount: '13% off' },
        { name: `Galaxy Z Flip 5 - 256GB`, category: 'smartphone', price: '94,999', originalPrice: '1,09,999', discount: '14% off' },
        { name: `Galaxy Z Flip 4 - 256GB`, category: 'smartphone', price: '79,999', originalPrice: '99,999', discount: '20% off' },
        
        // Galaxy A Series
        { name: `Galaxy A55 5G - 256GB`, category: 'smartphone', price: '42,999', originalPrice: '47,999', discount: '10% off' },
        { name: `Galaxy A35 5G - 256GB`, category: 'smartphone', price: '32,999', originalPrice: '36,999', discount: '11% off' },
        { name: `Galaxy A25 5G - 128GB`, category: 'smartphone', price: '24,999', originalPrice: '28,999', discount: '14% off' },
        { name: `Galaxy A15 5G - 128GB`, category: 'smartphone', price: '19,999', originalPrice: '23,999', discount: '17% off' },
        
        // Galaxy Note Series (Refurbished/Stock)
        { name: `Galaxy Note 20 Ultra - 256GB`, category: 'smartphone', price: '64,999', originalPrice: '89,999', discount: '28% off' },
        
        // Galaxy Tablets
        { name: `Galaxy Tab S9 Ultra - 512GB`, category: 'tablet', price: '1,04,999', originalPrice: '1,14,999', discount: '9% off' },
        { name: `Galaxy Tab S9+ - 256GB`, category: 'tablet', price: '84,999', originalPrice: '94,999', discount: '11% off' },
        { name: `Galaxy Tab S9 - 256GB`, category: 'tablet', price: '74,999', originalPrice: '84,999', discount: '12% off' },
        { name: `Galaxy Tab A9+ - 128GB`, category: 'tablet', price: '24,999', originalPrice: '29,999', discount: '17% off' },
        
        // Galaxy Watch Series
        { name: `Galaxy Watch 7 Ultra - 47mm`, category: 'watch', price: '59,999', originalPrice: '64,999', discount: '8% off' },
        { name: `Galaxy Watch 7 - 44mm`, category: 'watch', price: '34,999', originalPrice: '39,999', discount: '13% off' },
        { name: `Galaxy Watch 7 - 40mm`, category: 'watch', price: '29,999', originalPrice: '34,999', discount: '14% off' },
        { name: `Galaxy Watch 6 Classic - 47mm`, category: 'watch', price: '39,999', originalPrice: '49,999', discount: '20% off' },
        { name: `Galaxy Watch 6 - 44mm`, category: 'watch', price: '29,999', originalPrice: '39,999', discount: '25% off' },
        { name: `Galaxy Watch 5 Pro - 45mm`, category: 'watch', price: '34,999', originalPrice: '44,999', discount: '22% off' },
        
        // Galaxy Buds & Audio
        { name: `Galaxy Buds 3 Pro`, category: 'audio', price: '19,999', originalPrice: '22,999', discount: '13% off' },
        { name: `Galaxy Buds 3`, category: 'audio', price: '14,999', originalPrice: '17,999', discount: '17% off' },
        { name: `Galaxy Buds 2 Pro`, category: 'audio', price: '17,999', originalPrice: '21,999', discount: '18% off' },
        { name: `Galaxy Buds 2`, category: 'audio', price: '11,999', originalPrice: '14,999', discount: '20% off' },
        { name: `Galaxy Buds FE`, category: 'audio', price: '7,999', originalPrice: '9,999', discount: '20% off' }
      ],
      'Xiaomi': [
        // Xiaomi Flagship Series
        { name: `Xiaomi 14 Ultra - 512GB`, category: 'smartphone', price: '89,999', originalPrice: '99,999', discount: '10% off' },
        { name: `Xiaomi 14 - 512GB`, category: 'smartphone', price: '69,999', originalPrice: '79,999', discount: '13% off' },
        { name: `Xiaomi 14 - 256GB`, category: 'smartphone', price: '54,999', originalPrice: '69,999', discount: '21% off' },
        { name: `Xiaomi 13 Pro - 256GB`, category: 'smartphone', price: '59,999', originalPrice: '74,999', discount: '20% off' },
        { name: `Xiaomi 13 - 256GB`, category: 'smartphone', price: '49,999', originalPrice: '64,999', discount: '23% off' },
        { name: `Xiaomi 12 Pro - 256GB`, category: 'smartphone', price: '44,999', originalPrice: '62,999', discount: '29% off' },
        
        // Redmi Note Series
        { name: `Redmi Note 13 Pro+ 5G - 256GB`, category: 'smartphone', price: '31,999', originalPrice: '36,999', discount: '14% off' },
        { name: `Redmi Note 13 Pro 5G - 256GB`, category: 'smartphone', price: '27,999', originalPrice: '31,999', discount: '13% off' },
        { name: `Redmi Note 13 Pro - 256GB`, category: 'smartphone', price: '19,999', originalPrice: '24,999', discount: '20% off' },
        { name: `Redmi Note 13 5G - 256GB`, category: 'smartphone', price: '19,999', originalPrice: '22,999', discount: '13% off' },
        { name: `Redmi Note 12 Pro+ 5G - 256GB`, category: 'smartphone', price: '24,999', originalPrice: '29,999', discount: '17% off' },
        { name: `Redmi Note 12 Pro 5G - 128GB`, category: 'smartphone', price: '21,999', originalPrice: '25,999', discount: '15% off' },
        
        // Redmi K Series
        { name: `Redmi K70 Pro - 256GB`, category: 'smartphone', price: '39,999', originalPrice: '44,999', discount: '11% off' },
        { name: `Redmi K60 Ultra - 256GB`, category: 'smartphone', price: '34,999', originalPrice: '39,999', discount: '13% off' },
        
        // Redmi A Series (Budget)
        { name: `Redmi A3 - 128GB`, category: 'smartphone', price: '7,999', originalPrice: '9,999', discount: '20% off' },
        { name: `Redmi A2+ - 64GB`, category: 'smartphone', price: '6,999', originalPrice: '8,999', discount: '22% off' },
        
        // POCO Series
        { name: `POCO X6 Pro 5G - 256GB`, category: 'smartphone', price: '26,999', originalPrice: '30,999', discount: '13% off' },
        { name: `POCO F6 5G - 256GB`, category: 'smartphone', price: '29,999', originalPrice: '34,999', discount: '14% off' },
        { name: `POCO C65 - 128GB`, category: 'smartphone', price: '9,999', originalPrice: '12,999', discount: '23% off' },
        
        // Mi Tablets
        { name: `Xiaomi Pad 6 - 256GB`, category: 'tablet', price: '31,999', originalPrice: '36,999', discount: '14% off' },
        { name: `Redmi Pad SE - 128GB`, category: 'tablet', price: '17,999', originalPrice: '21,999', discount: '18% off' },
        { name: `Redmi Pad - 128GB`, category: 'tablet', price: '15,999', originalPrice: '19,999', discount: '20% off' },
        
        // Mi Smart Watches
        { name: `Xiaomi Watch 2 Pro`, category: 'watch', price: '22,999', originalPrice: '26,999', discount: '15% off' },
        { name: `Redmi Watch 3 Active`, category: 'watch', price: '9,999', originalPrice: '12,999', discount: '23% off' },
        { name: `Mi Watch Revolve Active`, category: 'watch', price: '9,999', originalPrice: '12,999', discount: '23% off' },
        
        // Mi Audio & Accessories
        { name: `Mi True Wireless Earphones 3 Pro`, category: 'audio', price: '4,999', originalPrice: '6,999', discount: '29% off' },
        { name: `Redmi Buds 5 Pro`, category: 'audio', price: '4,999', originalPrice: '6,999', discount: '29% off' },
        { name: `Mi Portable Bluetooth Speaker`, category: 'audio', price: '2,999', originalPrice: '3,999', discount: '25% off' }
      ],
      'OnePlus': [
        // OnePlus Flagship Series
        { name: `OnePlus 12 - 512GB`, category: 'smartphone', price: '69,999', originalPrice: '74,999', discount: '7% off' },
        { name: `OnePlus 12 - 256GB`, category: 'smartphone', price: '51,997', originalPrice: '64,999', discount: '20% off' },
        { name: `OnePlus 12R - 256GB`, category: 'smartphone', price: '42,999', originalPrice: '49,999', discount: '14% off' },
        { name: `OnePlus 11 5G - 256GB`, category: 'smartphone', price: '51,999', originalPrice: '61,999', discount: '16% off' },
        { name: `OnePlus 11 - 128GB`, category: 'smartphone', price: '42,999', originalPrice: '56,999', discount: '25% off' },
        { name: `OnePlus 10 Pro 5G - 256GB`, category: 'smartphone', price: '54,999', originalPrice: '66,999', discount: '18% off' },
        { name: `OnePlus 10T 5G - 256GB`, category: 'smartphone', price: '44,999', originalPrice: '54,999', discount: '18% off' },
        
        // OnePlus Nord Series
        { name: `OnePlus Nord 4 5G - 256GB`, category: 'smartphone', price: '32,999', originalPrice: '37,999', discount: '13% off' },
        { name: `OnePlus Nord CE 4 5G - 256GB`, category: 'smartphone', price: '26,999', originalPrice: '29,999', discount: '10% off' },
        { name: `OnePlus Nord CE 3 Lite 5G - 256GB`, category: 'smartphone', price: '21,999', originalPrice: '24,999', discount: '12% off' },
        { name: `OnePlus Nord 3 5G - 256GB`, category: 'smartphone', price: '34,999', originalPrice: '39,999', discount: '13% off' },
        
        // OnePlus Audio
        { name: `OnePlus Buds Pro 3`, category: 'audio', price: '11,999', originalPrice: '13,999', discount: '14% off' },
        { name: `OnePlus Buds 3`, category: 'audio', price: '5,999', originalPrice: '7,999', discount: '25% off' },
        { name: `OnePlus Buds Nord CE`, category: 'audio', price: '2,799', originalPrice: '3,499', discount: '20% off' },
        
        // OnePlus Tablets & Watches
        { name: `OnePlus Pad - 256GB`, category: 'tablet', price: '37,999', originalPrice: '42,999', discount: '12% off' },
        { name: `OnePlus Watch 2R`, category: 'watch', price: '17,999', originalPrice: '21,999', discount: '18% off' }
      ],
      'Google': [
        // Google Pixel Series
        { name: `Pixel 8 Pro - 512GB`, category: 'smartphone', price: '94,999', originalPrice: '1,06,999', discount: '11% off' },
        { name: `Pixel 8 Pro - 256GB`, category: 'smartphone', price: '84,999', originalPrice: '1,06,999', discount: '21% off' },
        { name: `Pixel 8 - 256GB`, category: 'smartphone', price: '69,999', originalPrice: '75,999', discount: '8% off' },
        { name: `Pixel 8 - 128GB`, category: 'smartphone', price: '59,999', originalPrice: '75,999', discount: '21% off' },
        { name: `Pixel 8a - 256GB`, category: 'smartphone', price: '52,999', originalPrice: '59,999', discount: '12% off' },
        { name: `Pixel 7a - 128GB`, category: 'smartphone', price: '39,999', originalPrice: '43,999', discount: '9% off' },
        
        // Google Audio
        { name: `Pixel Buds Pro`, category: 'audio', price: '17,999', originalPrice: '19,999', discount: '10% off' },
        { name: `Pixel Buds A-Series`, category: 'audio', price: '8,999', originalPrice: '9,999', discount: '10% off' },
        
        // Google Smart Devices
        { name: `Nest Hub (2nd Gen)`, category: 'smart-home', price: '7,999', originalPrice: '9,999', discount: '20% off' },
        { name: `Nest Mini`, category: 'smart-home', price: '4,499', originalPrice: '5,499', discount: '18% off' }
      ],
      'Vivo': [
        // Vivo V Series
        { name: `Vivo V40 Pro 5G - 512GB`, category: 'smartphone', price: '49,999', originalPrice: '54,999', discount: '9% off' },
        { name: `Vivo V40 5G - 256GB`, category: 'smartphone', price: '34,999', originalPrice: '39,999', discount: '13% off' },
        { name: `Vivo V30 Pro 5G - 512GB`, category: 'smartphone', price: '41,999', originalPrice: '46,999', discount: '11% off' },
        { name: `Vivo V30 5G - 256GB`, category: 'smartphone', price: '33,999', originalPrice: '37,999', discount: '11% off' },
        { name: `Vivo V29 Pro 5G - 256GB`, category: 'smartphone', price: '34,999', originalPrice: '39,999', discount: '13% off' },
        
        // Vivo X Series
        { name: `Vivo X100 Pro 5G - 512GB`, category: 'smartphone', price: '89,999', originalPrice: '94,999', discount: '5% off' },
        { name: `Vivo X100 5G - 256GB`, category: 'smartphone', price: '61,999', originalPrice: '63,999', discount: '3% off' },
        { name: `Vivo X90 Pro 5G - 256GB`, category: 'smartphone', price: '69,999', originalPrice: '84,999', discount: '18% off' },
        
        // Vivo Y Series
        { name: `Vivo Y200 Pro 5G - 256GB`, category: 'smartphone', price: '24,999', originalPrice: '27,999', discount: '11% off' },
        { name: `Vivo Y100 5G - 256GB`, category: 'smartphone', price: '23,999', originalPrice: '26,999', discount: '11% off' },
        { name: `Vivo Y56 5G - 256GB`, category: 'smartphone', price: '19,999', originalPrice: '23,999', discount: '17% off' },
        
        // Vivo T Series
        { name: `Vivo T3 Pro 5G - 256GB`, category: 'smartphone', price: '31,999', originalPrice: '35,999', discount: '11% off' },
        { name: `Vivo T2x 5G - 128GB`, category: 'smartphone', price: '15,999', originalPrice: '18,999', discount: '16% off' }
      ],
      'Oppo': [
        // Oppo Find Series
        { name: `Oppo Find X8 Pro - 512GB`, category: 'smartphone', price: '94,999', originalPrice: '99,999', discount: '5% off' },
        { name: `Oppo Find X7 Pro 5G - 512GB`, category: 'smartphone', price: '79,999', originalPrice: '89,999', discount: '11% off' },
        { name: `Oppo Find X7 5G - 256GB`, category: 'smartphone', price: '52,999', originalPrice: '54,999', discount: '4% off' },
        
        // Oppo Reno Series
        { name: `Oppo Reno 12 Pro 5G - 512GB`, category: 'smartphone', price: '44,999', originalPrice: '49,999', discount: '10% off' },
        { name: `Oppo Reno 12 5G - 256GB`, category: 'smartphone', price: '32,999', originalPrice: '36,999', discount: '11% off' },
        { name: `Oppo Reno 11 Pro 5G - 256GB`, category: 'smartphone', price: '39,999', originalPrice: '43,999', discount: '9% off' },
        { name: `Oppo Reno 11 5G - 256GB`, category: 'smartphone', price: '29,999', originalPrice: '32,999', discount: '9% off' },
        
        // Oppo A Series
        { name: `Oppo A79 5G - 256GB`, category: 'smartphone', price: '21,999', originalPrice: '24,999', discount: '12% off' },
        { name: `Oppo A59 5G - 128GB`, category: 'smartphone', price: '15,999', originalPrice: '18,999', discount: '16% off' },
        { name: `Oppo A38 - 128GB`, category: 'smartphone', price: '12,999', originalPrice: '15,999', discount: '19% off' },
        
        // Oppo F Series
        { name: `Oppo F25 Pro 5G - 256GB`, category: 'smartphone', price: '28,999', originalPrice: '31,999', discount: '9% off' },
        
        // Oppo Audio
        { name: `Oppo Enco X3`, category: 'audio', price: '17,999', originalPrice: '19,999', discount: '10% off' },
        { name: `Oppo Enco Air 3 Pro`, category: 'audio', price: '4,999', originalPrice: '6,999', discount: '29% off' }
      ],
      'Realme': [
        // Realme GT Series
        { name: `Realme GT 6 - 512GB`, category: 'smartphone', price: '44,999', originalPrice: '49,999', discount: '10% off' },
        { name: `Realme GT 6 - 256GB`, category: 'smartphone', price: '39,999', originalPrice: '44,999', discount: '11% off' },
        { name: `Realme GT Neo 6 - 256GB`, category: 'smartphone', price: '31,999', originalPrice: '35,999', discount: '11% off' },
        { name: `Realme GT 5 Pro - 256GB`, category: 'smartphone', price: '41,999', originalPrice: '45,999', discount: '9% off' },
        
        // Realme Number Series
        { name: `Realme 12 Pro+ 5G - 512GB`, category: 'smartphone', price: '34,999', originalPrice: '39,999', discount: '13% off' },
        { name: `Realme 12 Pro+ 5G - 256GB`, category: 'smartphone', price: '29,999', originalPrice: '33,999', discount: '12% off' },
        { name: `Realme 12 Pro 5G - 256GB`, category: 'smartphone', price: '27,999', originalPrice: '31,999', discount: '13% off' },
        { name: `Realme 12+ 5G - 256GB`, category: 'smartphone', price: '22,999', originalPrice: '25,999', discount: '12% off' },
        { name: `Realme 12 5G - 256GB`, category: 'smartphone', price: '19,999', originalPrice: '22,999', discount: '13% off' },
        
        // Realme Narzo Series
        { name: `Realme Narzo 70 Pro 5G - 256GB`, category: 'smartphone', price: '21,999', originalPrice: '24,999', discount: '12% off' },
        { name: `Realme Narzo 70x 5G - 128GB`, category: 'smartphone', price: '14,999', originalPrice: '17,999', discount: '17% off' },
        { name: `Realme Narzo 60 Pro 5G - 256GB`, category: 'smartphone', price: '23,999', originalPrice: '26,999', discount: '11% off' },
        
        // Realme C Series
        { name: `Realme C67 5G - 128GB`, category: 'smartphone', price: '13,999', originalPrice: '16,999', discount: '18% off' },
        { name: `Realme C55 - 128GB`, category: 'smartphone', price: '11,999', originalPrice: '14,999', discount: '20% off' },
        
        // Realme Tablets & Audio
        { name: `Realme Pad 2 - 256GB`, category: 'tablet', price: '19,999', originalPrice: '22,999', discount: '13% off' },
        { name: `Realme Buds Air 6 Pro`, category: 'audio', price: '4,999', originalPrice: '6,999', discount: '29% off' },
        { name: `Realme Buds T300`, category: 'audio', price: '2,299', originalPrice: '2,999', discount: '23% off' }
      ],
      'Motorola': [
        // Motorola Edge Series
        { name: `Motorola Edge 50 Ultra - 512GB`, category: 'smartphone', price: '59,999', originalPrice: '64,999', discount: '8% off' },
        { name: `Motorola Edge 50 Pro - 256GB`, category: 'smartphone', price: '31,999', originalPrice: '35,999', discount: '11% off' },
        { name: `Motorola Edge 50 - 256GB`, category: 'smartphone', price: '27,999', originalPrice: '32,999', discount: '15% off' },
        { name: `Motorola Edge 40 Neo - 256GB`, category: 'smartphone', price: '23,999', originalPrice: '28,999', discount: '17% off' },
        { name: `Motorola Edge 40 - 256GB`, category: 'smartphone', price: '29,999', originalPrice: '34,999', discount: '14% off' },
        
        // Motorola Razr Series
        { name: `Motorola Razr 50 Ultra - 512GB`, category: 'smartphone', price: '99,999', originalPrice: '1,09,999', discount: '9% off' },
        { name: `Motorola Razr 50 - 256GB`, category: 'smartphone', price: '64,999', originalPrice: '74,999', discount: '13% off' },
        { name: `Motorola Razr 40 Ultra - 256GB`, category: 'smartphone', price: '79,999', originalPrice: '89,999', discount: '11% off' },
        
        // Moto G Series
        { name: `Moto G85 5G - 256GB`, category: 'smartphone', price: '19,999', originalPrice: '22,999', discount: '13% off' },
        { name: `Moto G75 5G - 256GB`, category: 'smartphone', price: '17,999', originalPrice: '20,999', discount: '14% off' },
        { name: `Moto G64 5G - 256GB`, category: 'smartphone', price: '16,999', originalPrice: '19,999', discount: '15% off' },
        { name: `Moto G54 5G - 256GB`, category: 'smartphone', price: '15,999', originalPrice: '18,999', discount: '16% off' },
        { name: `Moto G34 5G - 128GB`, category: 'smartphone', price: '12,999', originalPrice: '15,999', discount: '19% off' },
        
        // Moto E Series
        { name: `Moto E14 - 64GB`, category: 'smartphone', price: '6,999', originalPrice: '8,999', discount: '22% off' }
      ]

    const templates = productTemplates[brand as keyof typeof productTemplates] || [
      { name: `${brand} Product 1`, category: 'smartphone', price: '29,999', originalPrice: '34,999', discount: '14% off' },
      { name: `${brand} Product 2`, category: 'smartphone', price: '19,999', originalPrice: '24,999', discount: '20% off' }
    ];

    return templates.map((template, index) => ({
      id: `${brand.toLowerCase()}-${index}`,
      name: template.name,
      brand,
      category: template.category,
      image: `https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop&crop=center`,
      retailers: {
        amazon: {
          price: template.price,
          originalPrice: template.originalPrice,
          discount: template.discount,
          rating: 4.2 + Math.random() * 0.6,
          availability: Math.random() > 0.3 ? "In Stock" : "Limited Stock",
          buyUrl: `https://www.amazon.in/s?k=${brand.toLowerCase()}`,
          lastUpdated: new Date().toISOString(),
          retailerLogo: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2Fff0137610d3b48cf899ee369f5bccfe1"
        },
        flipkart: {
          price: (parseInt(template.price.replace(/[,]/g, '')) + Math.floor(Math.random() * 2000 - 1000)).toLocaleString('en-IN'),
          originalPrice: template.originalPrice,
          discount: template.discount,
          rating: 4.0 + Math.random() * 0.8,
          availability: Math.random() > 0.2 ? "In Stock" : "Limited Stock",
          buyUrl: `https://www.flipkart.com/search?q=${brand.toLowerCase()}`,
          lastUpdated: new Date().toISOString(),
          retailerLogo: "https://cdn.builder.io/api/v1/image/assets%2F277789437b114a6294d98f62bce9b60e%2F24430bdf4be4433ba90377160fb8fbcf"
        }
      }
    }));
  };

  if (!selectedBrand) {
    return null;
  }

  if (loading) {
    return (
      <div className="w-full py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading {selectedBrand} products...</span>
        </div>
      </div>
    );
  }

  // Filter products based on selected retailers
  const filteredProducts = brandProducts.map(product => {
    const availableRetailers = Object.entries(product.retailers).filter(([retailer]) => 
      selectedRetailers.length === 0 || selectedRetailers.includes(retailer)
    );

    if (availableRetailers.length === 0) {
      // Show first available retailer if no retailers selected
      const firstRetailer = Object.entries(product.retailers)[0];
      if (!firstRetailer) return null;

      const [retailerName, retailerData] = firstRetailer;
      return {
        ...product,
        displayRetailer: retailerName,
        displayData: retailerData
      };
    }

    // Find the retailer with the best price
    const bestPriceRetailer = availableRetailers.reduce((best, current) => {
      const bestPrice = parseInt(best[1].price.replace(/[,]/g, ''));
      const currentPrice = parseInt(current[1].price.replace(/[,]/g, ''));
      return currentPrice < bestPrice ? current : best;
    });

    const [retailerName, retailerData] = bestPriceRetailer;
    return {
      ...product,
      displayRetailer: retailerName,
      displayData: retailerData
    };
  }).filter(Boolean);

  return (
    <div className="w-full py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Building2 className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedBrand} Products
          </h2>
          <Badge variant="secondary" className="ml-2">
            Live Prices
          </Badge>
          {selectedCategory && (
            <Badge variant="outline" className="capitalize">
              {selectedCategory.replace('-', ' ')}
            </Badge>
          )}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={clearBrandSelection}
          className="flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Clear Selection
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product: any) => (
          <div key={product.id} className="relative">
            <EnhancedProductCard
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.displayData.price}
              originalPrice={product.displayData.originalPrice}
              discount={product.displayData.discount}
              rating={product.displayData.rating}
              availability={product.displayData.availability}
              retailer={product.displayRetailer.charAt(0).toUpperCase() + product.displayRetailer.slice(1)}
              retailerLogo={product.displayData.retailerLogo}
              buyUrl={product.displayData.buyUrl}
              lastUpdated={product.displayData.lastUpdated}
            />
            
            {/* Brand Badge */}
            <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              {product.brand}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 text-center">
        <div className="text-sm text-gray-500">
          Showing {filteredProducts.length} {selectedBrand} products
          {selectedRetailers.length > 0 && (
            <span className="ml-1">
              from {selectedRetailers.map(r => r.charAt(0).toUpperCase() + r.slice(1)).join(', ')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
