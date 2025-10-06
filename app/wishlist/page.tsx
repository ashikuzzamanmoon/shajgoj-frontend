// app/wishlist/page.tsx

"use client";

import { useWishlist } from "@/context/WishlistContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-pink-50 rounded-lg p-12 text-center">
            <h1 className="text-2xl font-semibold text-gray-700 mb-2">
              You do not have any wishlist item
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

        <div className="space-y-4">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-pink-50 rounded-lg p-6 flex items-center gap-6"
            >
              {/* Product Image */}
              <div className="flex-shrink-0">
                <Link
                  href={`/products/${item.name
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="rounded-md border bg-white"
                  />
                </Link>
              </div>

              {/* Product Info */}
              <div className="flex-grow">
                <Link
                  href={`/products/${item.name
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                  className="hover:text-pink-500"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mt-1">{item.brand}</p>
                <p className="text-pink-500 font-bold text-xl mt-2">
                  ৳{item.price.toLocaleString()}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="flex-shrink-0 text-pink-500 hover:text-pink-600 transition-colors"
                aria-label="Remove from wishlist"
              >
                <Trash2 size={24} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;