// components/products/ProductGrid.tsx
"use client";

import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="w-full md:w-3/4 lg:w-4/5">
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-gray-600">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
export default ProductGrid;