"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

// A helper component for rating star
const RenderStars = ({ rating = 0 }: { rating?: number }) => {
  const totalStars = 5;
  const fullStars = Math.round(rating);
  const emptyStars = totalStars - fullStars;

  return (
    <div className="flex justify-center my-2">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          size={16}
          className="text-yellow-400 fill-yellow-400"
        />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={16} className="text-gray-300" />
      ))}
    </div>
  );
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const displayVariant = product.variants?.[0];

  if (!displayVariant) return null;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(
      {
        id: product.id,
        brand: product.brand,
        name: product.name,
        image: product.image,
      },
      displayVariant,
      1
    );
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden group transition-shadow hover:shadow-lg h-full flex flex-col">
      <Link
        href={`/products/${product.name.toLowerCase().replace(/ /g, "-")}`}
        className="block flex-grow flex flex-col"
      >
        <div className="relative bg-white p-4">
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          {displayVariant.discount > 0 && (
            <div className="absolute top-0 left-0 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
              {displayVariant.discount}% OFF
            </div>
          )}
        </div>
        <div className="p-4 pt-0 flex flex-col flex-grow text-center">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 h-10">
            {product.name}
          </h3>

          <span className="my-2 inline-block mx-auto text-white bg-pink-500 text-xs font-semibold px-3 py-0.5 rounded-full">
            SALE
          </span>

          <div className="flex items-baseline justify-center space-x-2 my-2">
            {displayVariant.originalPrice > displayVariant.price && (
              <p className="text-gray-400 line-through text-sm">
                ৳{displayVariant.originalPrice.toLocaleString()}
              </p>
            )}
            <p className="text-pink-500 font-bold text-base">
              ৳{displayVariant.price.toLocaleString()}
            </p>
          </div>

          <RenderStars rating={product.rating} />

          <p className="text-sm text-gray-700 font-bold mt-auto pt-2">
            {displayVariant.name}
          </p>
        </div>
      </Link>
      <button
        onClick={handleAddToCart}
        className="flex items-center justify-center w-full bg-purple-600 text-white py-2.5 font-semibold hover:bg-pink-500 transition-colors"
      >
        <ShoppingBag size={16} className="mr-2" />
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductCard;
