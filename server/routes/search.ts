import { RequestHandler } from "express";
import { getCurrentMarketPrice, getAllMarketPrices } from "../services/priceService";

// Comprehensive product catalog with Apple products and others
const productCatalog = {
  // Apple Products
  "iphone-16-pro": {
    name: "iPhone 16 Pro",
    brand: "Apple",
    category: "smartphone",
    keywords: ["iphone", "apple", "phone", "smartphone", "pro", "16"],
    retailers: {
      apple: {
        price: "1,29,900",
        rating: 4.5,
        availability: "In Stock",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-natural-titanium-select?wid=300&hei=300&fmt=jpeg&qlt=90&.v=1723665131559",
        buyUrl: "https://www.apple.com/iphone-16-pro/",
        lastUpdated: new Date().toISOString()
      },
      amazon: {
        price: "1,28,999",
        rating: 4.3,
        availability: "In Stock",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-natural-titanium-select?wid=300&hei=300&fmt=jpeg&qlt=90&.v=1723665131559",
        buyUrl: "https://www.amazon.in/s?k=iphone+16+pro",
        lastUpdated: new Date().toISOString()
      },
      flipkart: {
        price: "1,27,500",
        rating: 4.1,
        availability: "Limited Stock",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-natural-titanium-select?wid=300&hei=300&fmt=jpeg&qlt=90&.v=1723665131559",
        buyUrl: "https://www.flipkart.com/search?q=iphone%2016%20pro",
        lastUpdated: new Date().toISOString()
      }
    }
  },
  "iphone-16": {
    name: "iPhone 16",
    brand: "Apple",
    category: "smartphone",
    keywords: ["iphone", "apple", "phone", "smartphone", "16"],
    retailers: {
      apple: {
        price: "79,900",
        rating: 4.4,
        availability: "In Stock",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-select-6-1-ultramarine-202409?wid=300&hei=300&fmt=jpeg&qlt=90&.v=1723753053711",
        buyUrl: "https://www.apple.com/iphone-16/",
        lastUpdated: new Date().toISOString()
      },
      amazon: {
        price: "78,999",
        rating: 4.2,
        availability: "In Stock",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-select-6-1-ultramarine-202409?wid=300&hei=300&fmt=jpeg&qlt=90&.v=1723753053711",
        buyUrl: "https://www.amazon.in/s?k=iphone+16",
        lastUpdated: new Date().toISOString()
      },
      flipkart: {
        price: "77,999",
        rating: 4.0,
        availability: "In Stock",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-select-6-1-ultramarine-202409?wid=300&hei=300&fmt=jpeg&qlt=90&.v=1723753053711",
        buyUrl: "https://www.flipkart.com/search?q=iphone%2016",
        lastUpdated: new Date().toISOString()
      }
    }
  },
  "iphone-15-pro": {
    name: "iPhone 15 Pro",
    brand: "Apple",
    category: "smartphone",
    keywords: ["iphone", "apple", "phone", "smartphone", "pro", "15"],
    retailers: {
      apple: {
        price: "1,19,900",
        rating: 4.6,
        availability: "In Stock",
        image: "https://m.media-amazon.com/images/I/71d7rfSl0wL._SL1500_.jpg",
        buyUrl: "https://www.apple.com/iphone-15-pro/",
        lastUpdated: new Date().toISOString()
      },
      amazon: {
        price: "1,18,999",
        rating: 4.4,
        availability: "In Stock",
        image: "https://m.media-amazon.com/images/I/71d7rfSl0wL._SL1500_.jpg",
        buyUrl: "https://www.amazon.in/s?k=iphone+15+pro",
        lastUpdated: new Date().toISOString()
      },
      flipkart: {
        price: "1,17,999",
        rating: 4.2,
        availability: "Limited Stock",
        image: "https://m.media-amazon.com/images/I/71d7rfSl0wL._SL1500_.jpg",
        buyUrl: "https://www.flipkart.com/search?q=iphone%2015%20pro",
        lastUpdated: new Date().toISOString()
      }
    }
  },
  "macbook-pro-m3": {
    name: "MacBook Pro 14\" M3",
    brand: "Apple",
    category: "laptop",
    keywords: ["macbook", "apple", "laptop", "pro", "m3", "computer"],
    retailers: {
      apple: {
        price: "1,99,900",
        rating: 4.7,
        availability: "In Stock",
        image: "https://m.media-amazon.com/images/I/71jG+e7roXL._SL1500_.jpg",
        buyUrl: "https://www.apple.com/macbook-pro/",
        lastUpdated: new Date().toISOString()
      },
      amazon: {
        price: "1,98,999",
        rating: 4.5,
        availability: "In Stock",
        image: "https://m.media-amazon.com/images/I/71jG+e7roXL._SL1500_.jpg",
        buyUrl: "https://www.amazon.in/s?k=macbook+pro+m3",
        lastUpdated: new Date().toISOString()
      },
      flipkart: {
        price: "1,97,999",
        rating: 4.3,
        availability: "Limited Stock",
        image: "https://m.media-amazon.com/images/I/71jG+e7roXL._SL1500_.jpg",
        buyUrl: "https://www.flipkart.com/search?q=macbook%20pro%20m3",
        lastUpdated: new Date().toISOString()
      }
    }
  },
  "macbook-air-m2": {
    name: "MacBook Air 13\" M2",
    brand: "Apple",
    category: "laptop",
    keywords: ["macbook", "apple", "laptop", "air", "m2", "computer"],
    retailers: {
      apple: {
        price: "1,14,900",
        rating: 4.6,
        availability: "In Stock",
        image: "https://m.media-amazon.com/images/I/71TPda7cwUL._SL1500_.jpg",
        buyUrl: "https://www.apple.com/macbook-air/",
        lastUpdated: new Date().toISOString()
      },
      amazon: {
        price: "1,13,999",
        rating: 4.4,
        availability: "In Stock",
        image: "https://m.media-amazon.com/images/I/71TPda7cwUL._SL1500_.jpg",
        buyUrl: "https://www.amazon.in/s?k=macbook+air+m2",
        lastUpdated: new Date().toISOString()
      },
      flipkart: {
        price: "1,12,999",
        rating: 4.2,
        availability: "In Stock",
        image: "https://m.media-amazon.com/images/I/71TPda7cwUL._SL1500_.jpg",
        buyUrl: "https://www.flipkart.com/search?q=macbook%20air%20m2",
        lastUpdated: new Date().toISOString()
      }
    }
  },
  "ipad-pro-m4": {
    name: "iPad Pro 12.9\" M4",
    brand: "Apple",
    category: "tablet",
    keywords: ["ipad", "apple", "tablet", "pro", "m4"],
    retailers: {
      apple: {
        price: "1,29,900",
        rating: 4.8,
        availability: "In Stock",
        image: "https://m.media-amazon.com/images/I/81NJhGMa3pL._SL1500_.jpg",
        buyUrl: "https://www.apple.com/ipad-pro/",
        lastUpdated: new Date().toISOString()
      },
      amazon: {
        price: "1,28,999",
        rating: 4.6,
        availability: "In Stock",
        image: "https://m.media-amazon.com/images/I/81NJhGMa3pL._SL1500_.jpg",
        buyUrl: "https://www.amazon.in/s?k=ipad+pro+m4",
        lastUpdated: new Date().toISOString()
      },
      flipkart: {
        price: "1,27,999",
        rating: 4.4,
        availability: "Limited Stock",
        image: "https://m.media-amazon.com/images/I/81NJhGMa3pL._SL1500_.jpg",
        buyUrl: "https://www.flipkart.com/search?q=ipad%20pro%20m4",
        lastUpdated: new Date().toISOString()
      }
    }
  },
  "ipad-air": {
    name: "iPad Air 10.9\"",
    brand: "Apple",
    category: "tablet",
    keywords: ["ipad", "apple", "tablet", "air"],
    retailers: {
      apple: {
        price: "59,900",
        rating: 4.5,
        availability: "In Stock",
        image: "https://m.media-amazon.com/images/I/61NGnpjoRDL._SL1500_.jpg",
        buyUrl: "https://www.apple.com/ipad-air/",
        lastUpdated: new Date().toISOString()
      },
      amazon: {
        price: "58,999",
        rating: 4.3,
        availability: "In Stock",
        image: "https://m.media-amazon.com/images/I/61NGnpjoRDL._SL1500_.jpg",
        buyUrl: "https://www.amazon.in/s?k=ipad+air",
        lastUpdated: new Date().toISOString()
      }
    }
  },
  "apple-watch-series-10": {
    name: "Apple Watch Series 10",
    brand: "Apple",
    category: "smartwatch",
    keywords: ["apple", "watch", "smartwatch", "series", "10"],
    retailers: {
      apple: {
        price: "46,900",
        rating: 4.4,
        availability: "In Stock",
        image: "https://m.media-amazon.com/images/I/71u2rz5BTJL._SL1500_.jpg",
        buyUrl: "https://www.apple.com/apple-watch-series-10/",
        lastUpdated: new Date().toISOString()
      },
      amazon: {
        price: "45,999",
        rating: 4.2,
        availability: "In Stock",
        image: "https://m.media-amazon.com/images/I/71u2rz5BTJL._SL1500_.jpg",
        buyUrl: "https://www.amazon.in/s?k=apple+watch+series+10",
        lastUpdated: new Date().toISOString()
      }
    }
  },
  "airpods-pro-3": {
    name: "AirPods Pro (3rd generation)",
    brand: "Apple",
    category: "audio",
    keywords: ["airpods", "apple", "earphones", "pro", "wireless"],
    retailers: {
      apple: {
        price: "24,900",
        rating: 4.6,
        availability: "In Stock",
        image: "https://m.media-amazon.com/images/I/61SUj2aKoEL._SL1500_.jpg",
        buyUrl: "https://www.apple.com/airpods-pro/",
        lastUpdated: new Date().toISOString()
      },
      amazon: {
        price: "23,999",
        rating: 4.4,
        availability: "In Stock",
        image: "https://m.media-amazon.com/images/I/61SUj2aKoEL._SL1500_.jpg",
        buyUrl: "https://www.amazon.in/s?k=airpods+pro",
        lastUpdated: new Date().toISOString()
      }
    }
  },
  // Samsung Products
  "samsung-galaxy-s24-ultra": {
    name: "Samsung Galaxy S24 Ultra - 512GB",
    brand: "Samsung",
    category: "smartphone",
    keywords: ["samsung", "galaxy", "s24", "ultra", "phone", "smartphone"],
    retailers: {
      samsung: {
        price: "1,34,999",
        rating: 4.4,
        availability: "In Stock",
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-ultra-s928-sm-s928bztqins-thumb-539573186?$344_344_PNG$",
        buyUrl: "https://www.samsung.com/in/smartphones/galaxy-s24-ultra/",
        lastUpdated: new Date().toISOString()
      },
      amazon: {
        price: "1,32,999",
        rating: 4.2,
        availability: "In Stock",
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-ultra-s928-sm-s928bztqins-thumb-539573186?$344_344_PNG$",
        buyUrl: "https://www.amazon.in/s?k=samsung+galaxy+s24+ultra",
        lastUpdated: new Date().toISOString()
      },
      flipkart: {
        price: "1,31,999",
        rating: 4.0,
        availability: "In Stock",
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-ultra-s928-sm-s928bztqins-thumb-539573186?$344_344_PNG$",
        buyUrl: "https://www.flipkart.com/search?q=samsung%20galaxy%20s24%20ultra",
        lastUpdated: new Date().toISOString()
      }
    }
  },
  "samsung-galaxy-s24": {
    name: "Samsung Galaxy S24 - 256GB",
    brand: "Samsung",
    category: "smartphone",
    keywords: ["samsung", "galaxy", "s24", "phone", "smartphone"],
    retailers: {
      samsung: {
        price: "79,999",
        rating: 4.3,
        availability: "In Stock",
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-s921-sm-s921bzvcins-thumb-539572954?$344_344_PNG$",
        buyUrl: "https://www.samsung.com/in/smartphones/galaxy-s24/",
        lastUpdated: new Date().toISOString()
      },
      amazon: {
        price: "78,999",
        rating: 4.1,
        availability: "In Stock",
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-s921-sm-s921bzvcins-thumb-539572954?$344_344_PNG$",
        buyUrl: "https://www.amazon.in/s?k=samsung+galaxy+s24",
        lastUpdated: new Date().toISOString()
      },
      flipkart: {
        price: "77,999",
        rating: 3.9,
        availability: "In Stock",
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-s921-sm-s921bzvcins-thumb-539572954?$344_344_PNG$",
        buyUrl: "https://www.flipkart.com/search?q=samsung%20galaxy%20s24",
        lastUpdated: new Date().toISOString()
      }
    }
  },
  // Xiaomi Products
  "xiaomi-14": {
    name: "Xiaomi 14 - 256GB",
    brand: "Xiaomi",
    category: "smartphone",
    keywords: ["xiaomi", "mi", "14", "phone", "smartphone"],
    retailers: {
      xiaomi: {
        price: "69,999",
        rating: 4.3,
        availability: "In Stock",
        image: "https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-14/gallery/xiaomi-14-white-1.png?thumb=1&w=300&h=300",
        buyUrl: "https://www.mi.com/in/product/xiaomi-14/",
        lastUpdated: new Date().toISOString()
      },
      amazon: {
        price: "68,999",
        rating: 4.1,
        availability: "In Stock",
        image: "https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-14/gallery/xiaomi-14-white-1.png?thumb=1&w=300&h=300",
        buyUrl: "https://www.amazon.in/s?k=xiaomi+14",
        lastUpdated: new Date().toISOString()
      },
      flipkart: {
        price: "67,999",
        rating: 3.9,
        availability: "Limited Stock",
        image: "https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-14/gallery/xiaomi-14-white-1.png?thumb=1&w=300&h=300",
        buyUrl: "https://www.flipkart.com/search?q=xiaomi%2014",
        lastUpdated: new Date().toISOString()
      }
    }
  },
  "redmi-note-13-pro": {
    name: "Redmi Note 13 Pro - 256GB",
    brand: "Xiaomi",
    category: "smartphone",
    keywords: ["redmi", "note", "13", "pro", "xiaomi", "phone", "smartphone"],
    retailers: {
      xiaomi: {
        price: "24,999",
        rating: 4.2,
        availability: "In Stock",
        image: "https://i02.appmifile.com/mi-com-product/fly-birds/redmi-note-13-pro/57b7a6a1bf5077b1b2dd5bae8bc4b7e4.png?thumb=1&w=300&h=300",
        buyUrl: "https://www.mi.com/in/product/redmi-note-13-pro/",
        lastUpdated: new Date().toISOString()
      },
      amazon: {
        price: "23,999",
        rating: 4.0,
        availability: "In Stock",
        image: "https://i02.appmifile.com/mi-com-product/fly-birds/redmi-note-13-pro/57b7a6a1bf5077b1b2dd5bae8bc4b7e4.png?thumb=1&w=300&h=300",
        buyUrl: "https://www.amazon.in/s?k=redmi+note+13+pro",
        lastUpdated: new Date().toISOString()
      },
      flipkart: {
        price: "22,999",
        rating: 3.8,
        availability: "In Stock",
        image: "https://i02.appmifile.com/mi-com-product/fly-birds/redmi-note-13-pro/57b7a6a1bf5077b1b2dd5bae8bc4b7e4.png?thumb=1&w=300&h=300",
        buyUrl: "https://www.flipkart.com/search?q=redmi%20note%2013%20pro",
        lastUpdated: new Date().toISOString()
      }
    }
  },
  // OnePlus Products
  "oneplus-12": {
    name: "OnePlus 12 - 256GB",
    brand: "OnePlus",
    category: "smartphone",
    keywords: ["oneplus", "12", "phone", "smartphone"],
    retailers: {
      oneplus: {
        price: "64,999",
        rating: 4.3,
        availability: "In Stock",
        image: "https://image01.oneplus.net/ebp/202312/22/1-m00-4b-37-ckm4mmgasrgawpraaag_6akvvs4055.png",
        buyUrl: "https://www.oneplus.in/12",
        lastUpdated: new Date().toISOString()
      },
      amazon: {
        price: "63,999",
        rating: 4.1,
        availability: "In Stock",
        image: "https://image01.oneplus.net/ebp/202312/22/1-m00-4b-37-ckm4mmgasrgawpraaag_6akvvs4055.png",
        buyUrl: "https://www.amazon.in/s?k=oneplus+12",
        lastUpdated: new Date().toISOString()
      },
      flipkart: {
        price: "62,999",
        rating: 3.9,
        availability: "In Stock",
        image: "https://image01.oneplus.net/ebp/202312/22/1-m00-4b-37-ckm4mmgasrgawpraaag_6akvvs4055.png",
        buyUrl: "https://www.flipkart.com/search?q=oneplus%2012",
        lastUpdated: new Date().toISOString()
      }
    }
  },
  // Oppo Products
  "oppo-find-x7": {
    name: "Oppo Find X7 - 256GB",
    brand: "Oppo",
    category: "smartphone",
    keywords: ["oppo", "find", "x7", "phone", "smartphone"],
    retailers: {
      oppo: {
        price: "54,999",
        rating: 4.1,
        availability: "In Stock",
        image: "https://image01.oppo.com/content/dam/oppo/common/mkt/v2-2/find-x7-pro-oversea/navigation/Find-X7-Pro-purple.png",
        buyUrl: "https://www.oppo.com/in/smartphones/series-find-x/find-x7/",
        lastUpdated: new Date().toISOString()
      },
      amazon: {
        price: "53,999",
        rating: 3.9,
        availability: "In Stock",
        image: "https://image01.oppo.com/content/dam/oppo/common/mkt/v2-2/find-x7-pro-oversea/navigation/Find-X7-Pro-purple.png",
        buyUrl: "https://www.amazon.in/s?k=oppo+find+x7",
        lastUpdated: new Date().toISOString()
      },
      flipkart: {
        price: "52,999",
        rating: 3.7,
        availability: "Limited Stock",
        image: "https://image01.oppo.com/content/dam/oppo/common/mkt/v2-2/find-x7-pro-oversea/navigation/Find-X7-Pro-purple.png",
        buyUrl: "https://www.flipkart.com/search?q=oppo%20find%20x7",
        lastUpdated: new Date().toISOString()
      }
    }
  },
  // Vivo Products
  "vivo-x100": {
    name: "Vivo X100 - 256GB",
    brand: "Vivo",
    category: "smartphone",
    keywords: ["vivo", "x100", "phone", "smartphone"],
    retailers: {
      vivo: {
        price: "63,999",
        rating: 4.2,
        availability: "In Stock",
        image: "https://shop.vivo.com/in/pub/media/catalog/product/cache/fce9834d93151a711e68c0bb1bf898b3/x/1/x100-asteroid-black-front.png",
        buyUrl: "https://www.vivo.com/in/products/x100",
        lastUpdated: new Date().toISOString()
      },
      amazon: {
        price: "62,999",
        rating: 4.0,
        availability: "In Stock",
        image: "https://shop.vivo.com/in/pub/media/catalog/product/cache/fce9834d93151a711e68c0bb1bf898b3/x/1/x100-asteroid-black-front.png",
        buyUrl: "https://www.amazon.in/s?k=vivo+x100",
        lastUpdated: new Date().toISOString()
      },
      flipkart: {
        price: "61,999",
        rating: 3.8,
        availability: "In Stock",
        image: "https://shop.vivo.com/in/pub/media/catalog/product/cache/fce9834d93151a711e68c0bb1bf898b3/x/1/x100-asteroid-black-front.png",
        buyUrl: "https://www.flipkart.com/search?q=vivo%20x100",
        lastUpdated: new Date().toISOString()
      }
    }
  },
  // Realme Products
  "realme-12-pro": {
    name: "Realme 12 Pro+ - 256GB",
    brand: "Realme",
    category: "smartphone",
    keywords: ["realme", "12", "pro", "phone", "smartphone"],
    retailers: {
      realme: {
        price: "29,999",
        rating: 4.0,
        availability: "In Stock",
        image: "https://image01.realme.net/general/20240129/1706520934947ca3f0094c36c47e39e12b8cd83c3fef4.png",
        buyUrl: "https://www.realme.com/in/realme-12-pro-plus",
        lastUpdated: new Date().toISOString()
      },
      amazon: {
        price: "28,999",
        rating: 3.8,
        availability: "In Stock",
        image: "https://image01.realme.net/general/20240129/1706520934947ca3f0094c36c47e39e12b8cd83c3fef4.png",
        buyUrl: "https://www.amazon.in/s?k=realme+12+pro+plus",
        lastUpdated: new Date().toISOString()
      },
      flipkart: {
        price: "27,999",
        rating: 3.6,
        availability: "In Stock",
        image: "https://image01.realme.net/general/20240129/1706520934947ca3f0094c36c47e39e12b8cd83c3fef4.png",
        buyUrl: "https://www.flipkart.com/search?q=realme%2012%20pro%20plus",
        lastUpdated: new Date().toISOString()
      }
    }
  },
  // Motorola Products
  "motorola-edge-50": {
    name: "Motorola Edge 50 - 256GB",
    brand: "Motorola",
    category: "smartphone",
    keywords: ["motorola", "moto", "edge", "50", "phone", "smartphone"],
    retailers: {
      motorola: {
        price: "34,999",
        rating: 4.1,
        availability: "In Stock",
        image: "https://motorolain.vtexassets.com/arquivos/ids/157355/motorola-edge-50-pro-lavender.png",
        buyUrl: "https://www.motorola.in/smartphones/motorola-edge-family/edge-50/p",
        lastUpdated: new Date().toISOString()
      },
      amazon: {
        price: "33,999",
        rating: 3.9,
        availability: "In Stock",
        image: "https://motorolain.vtexassets.com/arquivos/ids/157355/motorola-edge-50-pro-lavender.png",
        buyUrl: "https://www.amazon.in/s?k=motorola+edge+50",
        lastUpdated: new Date().toISOString()
      },
      flipkart: {
        price: "32,999",
        rating: 3.7,
        availability: "Limited Stock",
        image: "https://motorolain.vtexassets.com/arquivos/ids/157355/motorola-edge-50-pro-lavender.png",
        buyUrl: "https://www.flipkart.com/search?q=motorola%20edge%2050",
        lastUpdated: new Date().toISOString()
      }
    }
  },
  // Sony TV (existing)
  "sony-tv-55": {
    name: "Sony 55 Inch OLED 4K Ultra HD TV BRAVIA 8",
    brand: "Sony",
    category: "tv",
    keywords: ["sony", "tv", "oled", "4k", "bravia", "television"],
    retailers: {
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
        buyUrl: "https://www.flipkart.com/search?q=sony%2055%20inch%20oled%20bravia%208",
        lastUpdated: new Date().toISOString()
      }
    }
  }
};

export const handleSearch: RequestHandler = (req, res) => {
  const { q: query } = req.query;
  
  if (!query || typeof query !== 'string') {
    return res.json({
      query: '',
      results: [],
      totalResults: 0,
      suggestions: ['Apple', 'Samsung', 'Xiaomi', 'OnePlus', 'Oppo', 'Vivo', 'Realme', 'Motorola']
    });
  }

  const searchQuery = query.toLowerCase().trim();
  const results: any[] = [];

  // Search through all products
  Object.keys(productCatalog).forEach(productId => {
    const product = productCatalog[productId as keyof typeof productCatalog];
    
    // Check if query matches name, brand, or keywords
    const nameMatch = product.name.toLowerCase().includes(searchQuery);
    const brandMatch = product.brand.toLowerCase().includes(searchQuery);
    const keywordMatch = product.keywords.some(keyword => 
      keyword.toLowerCase().includes(searchQuery) || 
      searchQuery.includes(keyword.toLowerCase())
    );

    if (nameMatch || brandMatch || keywordMatch) {
      // Get real-time pricing for this product
      const realTimePricing = getAllMarketPrices(productId);
      const finalRetailers = realTimePricing || product.retailers;

      results.push({
        productId,
        name: product.name,
        brand: product.brand,
        category: product.category,
        retailers: finalRetailers,
        relevance: nameMatch ? 3 : brandMatch ? 2 : 1 // Scoring for relevance
      });
    }
  });

  // Sort by relevance
  results.sort((a, b) => b.relevance - a.relevance);

  // Generate suggestions based on query
  const suggestions = [];
  if (searchQuery.includes('apple') || searchQuery.includes('iphone')) {
    suggestions.push('iPhone 16 Pro', 'MacBook Pro', 'iPad Pro', 'Apple Watch', 'AirPods Pro');
  } else if (searchQuery.includes('samsung')) {
    suggestions.push('Galaxy S24 Ultra', 'Galaxy S24', 'Samsung Note');
  } else if (searchQuery.includes('xiaomi') || searchQuery.includes('redmi')) {
    suggestions.push('Xiaomi 14', 'Redmi Note 13 Pro', 'Mi 13');
  } else if (searchQuery.includes('oneplus')) {
    suggestions.push('OnePlus 12', 'OnePlus 11', 'OnePlus Nord');
  } else if (searchQuery.includes('oppo')) {
    suggestions.push('Oppo Find X7', 'Oppo Reno', 'Oppo A series');
  } else if (searchQuery.includes('vivo')) {
    suggestions.push('Vivo X100', 'Vivo V series', 'Vivo Y series');
  } else if (searchQuery.includes('realme')) {
    suggestions.push('Realme 12 Pro', 'Realme GT', 'Realme Narzo');
  } else if (searchQuery.includes('motorola') || searchQuery.includes('moto')) {
    suggestions.push('Motorola Edge 50', 'Moto G series', 'Moto E series');
  } else if (searchQuery.includes('sony')) {
    suggestions.push('Sony TV', 'Sony OLED', 'Sony BRAVIA');
  } else {
    suggestions.push('Apple', 'Samsung', 'Xiaomi', 'OnePlus', 'Oppo', 'Vivo', 'Realme', 'Motorola');
  }

  res.json({
    query: searchQuery,
    results: results.slice(0, 20), // Limit to 20 results
    totalResults: results.length,
    suggestions: suggestions.slice(0, 5)
  });
};

export const handleSearchSuggestions: RequestHandler = (req, res) => {
  const { q: query } = req.query;
  
  if (!query || typeof query !== 'string') {
    return res.json({
      suggestions: ['Apple', 'Samsung', 'Xiaomi', 'OnePlus', 'Oppo', 'Vivo', 'Realme', 'Motorola']
    });
  }

  const searchQuery = query.toLowerCase().trim();
  const suggestions = new Set<string>();

  // Generate suggestions from product names and brands
  Object.values(productCatalog).forEach(product => {
    if (product.name.toLowerCase().includes(searchQuery)) {
      suggestions.add(product.name);
    }
    if (product.brand.toLowerCase().includes(searchQuery)) {
      suggestions.add(product.brand);
    }
    product.keywords.forEach(keyword => {
      if (keyword.toLowerCase().includes(searchQuery)) {
        suggestions.add(keyword);
      }
    });
  });

  res.json({
    suggestions: Array.from(suggestions).slice(0, 8)
  });
};
