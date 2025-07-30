import { ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";

interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  retailer: string;
  retailerLogo: string;
}

interface ProductGridProps {
  title: string;
  products: Product[];
}

export function ProductGrid({ title, products }: ProductGridProps) {
  return (
    <section className="w-full bg-white py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">{title}</h2>
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              originalPrice={product.originalPrice}
              rating={product.rating}
              retailer={product.retailer}
              retailerLogo={product.retailerLogo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
