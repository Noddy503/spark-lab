import { RequestHandler } from "express";
import { getCurrentMarketPrice, getAllMarketPrices } from "../services/priceService";

// Real trending products data with actual product-style images
const trendingProductsData = {
  smartphones: [
    {
      id: "trending-iphone-16-pro",
      name: "iPhone 16 Pro - 256GB",
      brand: "Apple",
      category: "smartphone",
      image: "https://m.media-amazon.com/images/I/81Os1SDWpcL._SL1500_.jpg",
      retailers: {
        apple: {
          price: "1,29,900",
          rating: 4.5,
          availability: "In Stock",
          buyUrl: "https://www.apple.com/iphone-16-pro/",
          lastUpdated: new Date().toISOString()
        },
        amazon: {
          price: "1,28,999",
          rating: 4.3,
          availability: "In Stock",
          buyUrl: "https://www.amazon.in/s?k=iphone+16+pro",
          lastUpdated: new Date().toISOString()
        },
        flipkart: {
          price: "1,27,500",
          rating: 4.1,
          availability: "Limited Stock",
          buyUrl: "https://www.flipkart.com/search?q=iphone%2016%20pro",
          lastUpdated: new Date().toISOString()
        }
      },
      trendingScore: 95,
      isHot: true
    },
    {
      id: "trending-samsung-s24-ultra",
      name: "Samsung Galaxy S24 Ultra - 512GB",
      brand: "Samsung",
      category: "smartphone",
      image: "https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-ultra-s928-sm-s928bztqins-thumb-539573186?$344_344_PNG$",
      retailers: {
        samsung: {
          price: "1,34,999",
          rating: 4.4,
          availability: "In Stock",
          buyUrl: "https://www.samsung.com/in/smartphones/galaxy-s24-ultra/",
          lastUpdated: new Date().toISOString()
        },
        amazon: {
          price: "1,32,999",
          rating: 4.2,
          availability: "In Stock",
          buyUrl: "https://www.amazon.in/s?k=samsung+galaxy+s24+ultra",
          lastUpdated: new Date().toISOString()
        },
        flipkart: {
          price: "1,31,999",
          rating: 4.0,
          availability: "In Stock",
          buyUrl: "https://www.flipkart.com/search?q=samsung%20galaxy%20s24%20ultra",
          lastUpdated: new Date().toISOString()
        }
      },
      trendingScore: 88,
      isHot: true
    },
    {
      id: "trending-oneplus-12",
      name: "OnePlus 12 - 256GB",
      brand: "OnePlus",
      category: "smartphone",
      image: "https://image01.oneplus.net/ebp/202312/22/1-m00-4b-37-ckm4mmgasrgawpraaag_6akvvs4055.png",
      retailers: {
        oneplus: {
          price: "64,999",
          rating: 4.3,
          availability: "In Stock",
          buyUrl: "https://www.oneplus.in/12",
          lastUpdated: new Date().toISOString()
        },
        amazon: {
          price: "63,999",
          rating: 4.1,
          availability: "In Stock",
          buyUrl: "https://www.amazon.in/s?k=oneplus+12",
          lastUpdated: new Date().toISOString()
        },
        flipkart: {
          price: "62,999",
          rating: 3.9,
          availability: "In Stock",
          buyUrl: "https://www.flipkart.com/search?q=oneplus%2012",
          lastUpdated: new Date().toISOString()
        }
      },
      trendingScore: 82,
      isHot: false
    },
    {
      id: "trending-pixel-8-pro",
      name: "Google Pixel 8 Pro - 256GB",
      brand: "Google",
      category: "smartphone",
      image: "https://lh3.googleusercontent.com/Nu3lm9zdGoy7aYQZBjZhFNHVOSGFVZbotmwdcOx-LD3H2Q80Tg-8w4Q4vGhAIwjAP_-3y0Xo3s=w526-h296-l90-rj",
      retailers: {
        google: {
          price: "1,06,999",
          rating: 4.4,
          availability: "In Stock",
          buyUrl: "https://store.google.com/product/pixel_8_pro",
          lastUpdated: new Date().toISOString()
        },
        amazon: {
          price: "1,05,999",
          rating: 4.2,
          availability: "In Stock",
          buyUrl: "https://www.amazon.in/s?k=google+pixel+8+pro",
          lastUpdated: new Date().toISOString()
        },
        flipkart: {
          price: "1,04,999",
          rating: 4.0,
          availability: "Limited Stock",
          buyUrl: "https://www.flipkart.com/search?q=google%20pixel%208%20pro",
          lastUpdated: new Date().toISOString()
        }
      },
      trendingScore: 79,
      isHot: false
    },
    {
      id: "trending-xiaomi-14",
      name: "Xiaomi 14 - 256GB",
      brand: "Xiaomi",
      category: "smartphone",
      image: "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1705576742.99597970.png?thumb=1&w=300&h=300",
      retailers: {
        xiaomi: {
          price: "69,999",
          rating: 4.3,
          availability: "In Stock",
          buyUrl: "https://www.mi.com/in/product/xiaomi-14/",
          lastUpdated: new Date().toISOString()
        },
        amazon: {
          price: "68,999",
          rating: 4.1,
          availability: "In Stock",
          buyUrl: "https://www.amazon.in/s?k=xiaomi+14",
          lastUpdated: new Date().toISOString()
        },
        flipkart: {
          price: "67,999",
          rating: 3.9,
          availability: "Limited Stock",
          buyUrl: "https://www.flipkart.com/search?q=xiaomi%2014",
          lastUpdated: new Date().toISOString()
        }
      },
      trendingScore: 76,
      isHot: false
    },
    {
      id: "trending-vivo-x100",
      name: "Vivo X100 - 256GB",
      brand: "Vivo",
      category: "smartphone",
      image: "https://www.vivo.com/content/dam/vivo/support/product/images/x100/Asteroid-Black.png?width=300&height=300",
      retailers: {
        vivo: {
          price: "63,999",
          rating: 4.2,
          availability: "In Stock",
          buyUrl: "https://www.vivo.com/in/products/x100",
          lastUpdated: new Date().toISOString()
        },
        amazon: {
          price: "62,999",
          rating: 4.0,
          availability: "In Stock",
          buyUrl: "https://www.amazon.in/s?k=vivo+x100",
          lastUpdated: new Date().toISOString()
        },
        flipkart: {
          price: "61,999",
          rating: 3.8,
          availability: "In Stock",
          buyUrl: "https://www.flipkart.com/search?q=vivo%20x100",
          lastUpdated: new Date().toISOString()
        }
      },
      trendingScore: 73,
      isHot: false
    },
    {
      id: "trending-redmi-note-13-pro",
      name: "Redmi Note 13 Pro - 256GB",
      brand: "Xiaomi",
      category: "smartphone",
      image: "https://i02.appmifile.com/mi-com-product/fly-birds/redmi-note-13-pro/57b7a6a1bf5077b1b2dd5bae8bc4b7e4.png?thumb=1&w=300&h=300",
      retailers: {
        xiaomi: {
          price: "24,999",
          rating: 4.2,
          availability: "In Stock",
          buyUrl: "https://www.mi.com/in/product/redmi-note-13-pro/",
          lastUpdated: new Date().toISOString()
        },
        amazon: {
          price: "23,999",
          rating: 4.0,
          availability: "In Stock",
          buyUrl: "https://www.amazon.in/s?k=redmi+note+13+pro",
          lastUpdated: new Date().toISOString()
        },
        flipkart: {
          price: "22,999",
          rating: 3.8,
          availability: "In Stock",
          buyUrl: "https://www.flipkart.com/search?q=redmi%20note%2013%20pro",
          lastUpdated: new Date().toISOString()
        }
      },
      trendingScore: 85,
      isHot: true
    },
    {
      id: "trending-oppo-find-x7",
      name: "Oppo Find X7 - 256GB",
      brand: "Oppo",
      category: "smartphone",
      image: "https://image01.oppo.com/content/dam/oppo/product-asset-library/smartphones/find-x7/design/find-x7-hero-desert-silver.png?width=300&height=300",
      retailers: {
        oppo: {
          price: "54,999",
          rating: 4.1,
          availability: "In Stock",
          buyUrl: "https://www.oppo.com/in/smartphones/series-find-x/find-x7/",
          lastUpdated: new Date().toISOString()
        },
        amazon: {
          price: "53,999",
          rating: 3.9,
          availability: "In Stock",
          buyUrl: "https://www.amazon.in/s?k=oppo+find+x7",
          lastUpdated: new Date().toISOString()
        },
        flipkart: {
          price: "52,999",
          rating: 3.7,
          availability: "Limited Stock",
          buyUrl: "https://www.flipkart.com/search?q=oppo%20find%20x7",
          lastUpdated: new Date().toISOString()
        }
      },
      trendingScore: 71,
      isHot: false
    },
    {
      id: "trending-realme-12-pro",
      name: "Realme 12 Pro+ - 256GB",
      brand: "Realme",
      category: "smartphone",
      image: "https://image01.realme.net/general/20240129/1706520934947ca3f0094c36c47e39e12b8cd83c3fef4.png?width=300&height=300",
      retailers: {
        realme: {
          price: "29,999",
          rating: 4.0,
          availability: "In Stock",
          buyUrl: "https://www.realme.com/in/realme-12-pro-plus",
          lastUpdated: new Date().toISOString()
        },
        amazon: {
          price: "28,999",
          rating: 3.8,
          availability: "In Stock",
          buyUrl: "https://www.amazon.in/s?k=realme+12+pro+plus",
          lastUpdated: new Date().toISOString()
        },
        flipkart: {
          price: "27,999",
          rating: 3.6,
          availability: "In Stock",
          buyUrl: "https://www.flipkart.com/search?q=realme%2012%20pro%20plus",
          lastUpdated: new Date().toISOString()
        }
      },
      trendingScore: 80,
      isHot: false
    },
    {
      id: "trending-motorola-edge-50",
      name: "Motorola Edge 50 - 256GB",
      brand: "Motorola",
      category: "smartphone",
      image: "https://motorolauk.vtexassets.com/arquivos/ids/157089/motorola-edge-50-pro-lavender.png?v=638542876879270000&width=300&height=300",
      retailers: {
        motorola: {
          price: "34,999",
          rating: 4.1,
          availability: "In Stock",
          buyUrl: "https://www.motorola.in/smartphones/motorola-edge-family/edge-50/p",
          lastUpdated: new Date().toISOString()
        },
        amazon: {
          price: "33,999",
          rating: 3.9,
          availability: "In Stock",
          buyUrl: "https://www.amazon.in/s?k=motorola+edge+50",
          lastUpdated: new Date().toISOString()
        },
        flipkart: {
          price: "32,999",
          rating: 3.7,
          availability: "Limited Stock",
          buyUrl: "https://www.flipkart.com/search?q=motorola%20edge%2050",
          lastUpdated: new Date().toISOString()
        }
      },
      trendingScore: 75,
      isHot: false
    }
  ],
  tvs: [
    {
      id: "trending-sony-bravia-8",
      name: "Sony 55\" OLED 4K Ultra HD TV BRAVIA 8",
      brand: "Sony",
      category: "tv",
      image: "https://www.sony.co.in/image/5d02db9d4c33c0e6155161e4cd7b14fa?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF",
      retailers: {
        sony: {
          price: "1,99,999",
          rating: 4.4,
          availability: "In Stock",
          buyUrl: "https://www.sony.co.in/televisions/oled",
          lastUpdated: new Date().toISOString()
        },
        amazon: {
          price: "1,95,999",
          rating: 4.2,
          availability: "In Stock",
          buyUrl: "https://www.amazon.in/s?k=sony+55+inch+oled+bravia+8",
          lastUpdated: new Date().toISOString()
        },
        flipkart: {
          price: "1,94,999",
          rating: 4.0,
          availability: "In Stock",
          buyUrl: "https://www.flipkart.com/search?q=sony%2055%20inch%20oled",
          lastUpdated: new Date().toISOString()
        }
      },
      trendingScore: 91,
      isHot: true
    },
    {
      id: "trending-lg-c4-oled",
      name: "LG 55\" C4 OLED 4K Smart TV",
      brand: "LG",
      category: "tv",
      image: "https://www.lg.com/in/images/tvs/md07004434/gallery/1100-1.jpg",
      retailers: {
        lg: {
          price: "1,89,990",
          rating: 4.5,
          availability: "In Stock",
          buyUrl: "https://www.lg.com/in/tvs/lg-OLED55C4PSA",
          lastUpdated: new Date().toISOString()
        },
        amazon: {
          price: "1,87,990",
          rating: 4.3,
          availability: "In Stock",
          buyUrl: "https://www.amazon.in/s?k=lg+55+c4+oled",
          lastUpdated: new Date().toISOString()
        },
        flipkart: {
          price: "1,85,990",
          rating: 4.1,
          availability: "In Stock",
          buyUrl: "https://www.flipkart.com/search?q=lg%20c4%20oled%2055",
          lastUpdated: new Date().toISOString()
        }
      },
      trendingScore: 87,
      isHot: true
    },
    {
      id: "trending-samsung-qn90d",
      name: "Samsung 55\" QN90D Neo QLED 4K Smart TV",
      brand: "Samsung",
      category: "tv",
      image: "https://images.samsung.com/is/image/samsung/p6pim/in/qa55qn90daklxl/gallery/in-qled-qn90d-qa55qn90daklxl-thumb-539573038",
      retailers: {
        samsung: {
          price: "1,84,990",
          rating: 4.3,
          availability: "In Stock",
          buyUrl: "https://www.samsung.com/in/tvs/qled-tv/qn90d-55-inch-neo-qled-4k-smart-tv-qa55qn90daklxl/",
          lastUpdated: new Date().toISOString()
        },
        amazon: {
          price: "1,82,990",
          rating: 4.1,
          availability: "In Stock",
          buyUrl: "https://www.amazon.in/s?k=samsung+55+qn90d+neo+qled",
          lastUpdated: new Date().toISOString()
        },
        flipkart: {
          price: "1,81,990",
          rating: 3.9,
          availability: "Limited Stock",
          buyUrl: "https://www.flipkart.com/search?q=samsung%20qn90d%2055",
          lastUpdated: new Date().toISOString()
        }
      },
      trendingScore: 84,
      isHot: false
    }
  ],
  laptops: [
    {
      id: "trending-macbook-pro-m3",
      name: "MacBook Pro 14\" M3 - 512GB",
      brand: "Apple",
      category: "laptop",
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310",
      retailers: {
        apple: {
          price: "1,99,900",
          rating: 4.7,
          availability: "In Stock",
          buyUrl: "https://www.apple.com/macbook-pro/",
          lastUpdated: new Date().toISOString()
        },
        amazon: {
          price: "1,98,900",
          rating: 4.5,
          availability: "In Stock",
          buyUrl: "https://www.amazon.in/s?k=macbook+pro+m3+14",
          lastUpdated: new Date().toISOString()
        },
        flipkart: {
          price: "1,97,900",
          rating: 4.3,
          availability: "Limited Stock",
          buyUrl: "https://www.flipkart.com/search?q=macbook%20pro%20m3%2014",
          lastUpdated: new Date().toISOString()
        }
      },
      trendingScore: 93,
      isHot: true
    },
    {
      id: "trending-dell-xps-13",
      name: "Dell XPS 13 - Intel Core i7, 16GB RAM",
      brand: "Dell",
      category: "laptop",
      image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9340/media-gallery/laptop-xps-13-9340-nt-blue-gallery-1.psd",
      retailers: {
        dell: {
          price: "1,49,990",
          rating: 4.4,
          availability: "In Stock",
          buyUrl: "https://www.dell.com/en-in/shop/laptops/xps-13/spd/xps-13-9340-laptop",
          lastUpdated: new Date().toISOString()
        },
        amazon: {
          price: "1,47,990",
          rating: 4.2,
          availability: "In Stock",
          buyUrl: "https://www.amazon.in/s?k=dell+xps+13+laptop",
          lastUpdated: new Date().toISOString()
        },
        flipkart: {
          price: "1,46,990",
          rating: 4.0,
          availability: "In Stock",
          buyUrl: "https://www.flipkart.com/search?q=dell%20xps%2013",
          lastUpdated: new Date().toISOString()
        }
      },
      trendingScore: 81,
      isHot: false
    }
  ]
};

export const handleTrendingProducts: RequestHandler = (req, res) => {
  const { category } = req.query;

  // Function to update product with real-time pricing
  const updateProductPricing = (product: any) => {
    const realTimePricing = getAllMarketPrices(product.id.replace('trending-', ''));
    return {
      ...product,
      retailers: realTimePricing || product.retailers
    };
  };

  if (category && typeof category === 'string') {
    const categoryData = trendingProductsData[category as keyof typeof trendingProductsData];
    if (categoryData) {
      const updatedProducts = categoryData.map(updateProductPricing);
      return res.json({
        category,
        products: updatedProducts,
        totalProducts: updatedProducts.length
      });
    }
  }

  // Return all trending products if no category specified
  const allProducts = [
    ...trendingProductsData.smartphones,
    ...trendingProductsData.tvs,
    ...trendingProductsData.laptops
  ].sort((a, b) => b.trendingScore - a.trendingScore);

  const updatedAllProducts = allProducts.map(updateProductPricing);

  res.json({
    category: 'all',
    products: updatedAllProducts.slice(0, 12), // Limit to top 12 trending
    totalProducts: updatedAllProducts.length,
    categories: {
      smartphones: trendingProductsData.smartphones.length,
      tvs: trendingProductsData.tvs.length,
      laptops: trendingProductsData.laptops.length
    }
  });
};

export const handleTrendingByRetailer: RequestHandler = (req, res) => {
  const { retailer } = req.query;

  if (!retailer || typeof retailer !== 'string') {
    return res.json({
      error: 'Retailer parameter required',
      availableRetailers: ['amazon', 'flipkart', 'apple', 'samsung', 'sony', 'lg', 'dell', 'google', 'oneplus']
    });
  }

  const retailerProducts: any[] = [];

  // Search through all categories for products available on the specified retailer
  Object.entries(trendingProductsData).forEach(([category, products]) => {
    products.forEach(product => {
      // Get real-time pricing
      const realTimePricing = getAllMarketPrices(product.id.replace('trending-', ''));
      const updatedRetailers = realTimePricing || product.retailers;

      if (updatedRetailers[retailer as keyof typeof updatedRetailers]) {
        retailerProducts.push({
          ...product,
          category,
          retailers: updatedRetailers,
          retailerInfo: updatedRetailers[retailer as keyof typeof updatedRetailers]
        });
      }
    });
  });

  // Sort by trending score
  retailerProducts.sort((a, b) => b.trendingScore - a.trendingScore);

  res.json({
    retailer,
    products: retailerProducts,
    totalProducts: retailerProducts.length
  });
};
