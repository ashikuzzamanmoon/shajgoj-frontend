// app/products/[slug]/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import allProductsData from "@/data/products.json";
import { Product, Variant } from "@/types";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import {
  Star,
  Minus,
  Plus,
  Heart,
  ShieldCheck,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";

// components/products/ProductGallery.tsx থেকে ইম্পোর্ট করা হয়েছে
import ProductGallery from "@/components/products/ProductGallery";
// components/home/shared/ProductCarousel/ProductCarousel.tsx থেকে ইম্পোর্ট করা হয়েছে
import ProductCarousel from "@/components/home/shared/ProductCarousel/ProductCarousel";
import AuthenticityBadges from "@/components/products/AuthenticityBadges";
import ProductCard from "@/components/products/ProductCard";

const allProducts: Product[] = allProductsData as Product[];

// রেটিং স্টার দেখানোর জন্য Helper কম্পোনেন্ট
const RenderStars = ({ rating = 0 }: { rating?: number }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const emptyStars = totalStars - fullStars;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          size={16}
          className="text-yellow-400 fill-yellow-400"
        />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          size={16}
          className="text-gray-300 fill-gray-300"
        />
      ))}
    </div>
  );
};

const ProductDetailsPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const product = allProducts.find(
    (p) => p.name.toLowerCase().replace(/ /g, "-") === slug
  );

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Description"); // Accordion state replaced with tab state
  const { addToCart } = useCart();

  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="text-center py-20">Loading or Product not found...</div>
    );
  }

  // selectedVariant null check for initial render
  if (!selectedVariant) {
    return <div className="text-center py-20">Loading variant details...</div>;
  }

  const galleryImages = [product.image, ...(product.gallery || [])];

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        brand: product.brand,
        name: product.name,
        image: product.image,
      },
      selectedVariant,
      quantity
    );
    toast.success(`${product.name} added to cart!`);
  };

  const relatedProducts = allProducts
    .filter(
      (p) =>
        p.categories?.includes(product.categories?.[0] || "") &&
        p.id !== product.id
    )
    .slice(0, 10);

  const frequentlyBought = allProducts
    .filter((p) => p.id === 2 || p.id === 18)
    .slice(0, 2);

  const tabData = [
    { title: "Description", content: product.description },
    { title: "How to Use", content: "Apply to clean, dry skin as needed." },
    { title: "Ingredients", content: "List of ingredients goes here." },
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* --- Breadcrumbs --- */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-pink-500">
            Home
          </Link>
          {product.categories?.slice(0, 3).map((cat) => (
            <div key={cat} className="flex items-center">
              <ChevronRight size={16} className="mx-1" />
              <Link href="#" className="hover:text-pink-500">
                {cat}
              </Link>
            </div>
          ))}
        </div>

        {/* --- Main Content Area --- */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* --- Product Gallery Component --- */}
            <ProductGallery
              images={galleryImages}
              productName={product.name}
              discount={selectedVariant.discount || 0}
            />

            {/* --- Product Info --- */}
            <div>
              <p className="text-md text-gray-500">{product.brand}</p>
              <h1 className="text-2xl font-bold mt-1 text-gray-800">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mt-2">
                <RenderStars rating={product.rating} />
                <span className="text-sm text-gray-500">
                  ({product.reviewCount || 0} Reviews)
                </span>
                <span className="text-sm text-green-600 font-semibold">
                  In Stock
                </span>
              </div>

              {/* --- Variant Selector --- */}
              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  {product.variantType === "color" ? "Shade:" : "Size:"}{" "}
                  <span className="font-bold">{selectedVariant.name}</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`flex items-center gap-2 p-1 border-2 rounded-md transition-all ${
                        selectedVariant.id === variant.id
                          ? "border-pink-500"
                          : "border-gray-200"
                      }`}
                    >
                      {"hexCode" in variant && (
                        <span
                          style={{ backgroundColor: variant.hexCode }}
                          className="w-6 h-6 rounded-full border"
                        ></span>
                      )}
                      <span className="text-sm px-2">{variant.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-baseline space-x-3 mt-4">
                <p className="text-3xl font-bold text-pink-500">
                  ৳{selectedVariant.price.toLocaleString()}
                </p>
                {selectedVariant.originalPrice > selectedVariant.price && (
                  <p className="text-xl text-gray-400 line-through">
                    ৳{selectedVariant.originalPrice.toLocaleString()}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-4 mt-6">
                <p className="text-sm font-semibold">QUANTITY:</p>
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-gray-500 hover:text-black"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 text-gray-500 hover:text-black"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center w-full bg-pink-500 text-white py-3 rounded-md font-semibold hover:bg-pink-600 transition-colors"
                >
                  <ShoppingBag size={18} className="mr-2" /> ADD TO BAG
                </button>
                <button className="flex items-center justify-center w-full border border-gray-300 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                  <Heart size={18} className="mr-2" /> WISHLIST
                </button>
              </div>

              {/* --- NEW: Brief Description --- */}
              <div className="mt-8 text-gray-600 text-sm">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Brief Description
                </h3>
                <p>{product.description?.substring(0, 200)}...</p>
              </div>

              {/* --- NEW: Categories and Brand --- */}
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700 w-20">
                    Categories:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.categories?.map((cat) => (
                      <Link
                        key={cat}
                        href="#"
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md hover:bg-pink-100 hover:text-pink-600 text-xs"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700 w-20">
                    Brand:
                  </span>
                  <Link
                    href="#"
                    className="text-pink-500 font-semibold hover:underline"
                  >
                    {product.brand}
                  </Link>
                </div>
              </div>

              {/* --- NEW: Authentication Badge --- */}
              <div className="">
                <AuthenticityBadges />
              </div>
            </div>
          </div>

          {/* --- NEW: Tab System --- */}
          <div className="mt-16">
            <div className="border-b border-gray-200">
              <nav
                className="-mb-px flex space-x-3 md:space-x-8"
                aria-label="Tabs"
              >
                {tabData.map((tab) => (
                  <button
                    key={tab.title}
                    onClick={() => setActiveTab(tab.title)}
                    className={`${
                      activeTab === tab.title
                        ? "border-pink-500 text-pink-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg`}
                  >
                    {tab.title}
                  </button>
                ))}
              </nav>
            </div>
            <div className="py-6">
              <div className="prose max-w-none text-gray-600">
                {tabData.find((tab) => tab.title === activeTab)?.content}
              </div>
            </div>
          </div>

          {/* --- Frequently Bought Together --- */}
          {frequentlyBought.length > 0 && (
            <div className="mt-12 border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6 text-center md:text-left">
                Frequently Bought Together
              </h2>
              {/* Main container changed to stack on mobile */}
              <div className="flex flex-col lg:flex-row items-center gap-6">
                {/* Products container now wraps items on small screens */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {/* Current Product */}
                  <div className="text-center w-28">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="rounded-md border"
                    />
                    <p className="text-xs mt-1 line-clamp-2 font-medium">
                      {product.name}
                    </p>
                  </div>

                  <Plus size={24} className="text-gray-400" />

                  {/* Other Products */}
                  {frequentlyBought.map((item) => (
                    <div key={item.id} className="text-center w-28">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-md border"
                      />
                      <p className="text-xs mt-1 line-clamp-2 font-medium">
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Total price section with responsive border and padding */}
                <div className="w-full lg:w-auto lg:ml-auto text-center lg:text-left mt-6 lg:mt-0 border-t lg:border-t-0 lg:border-l border-gray-200 pt-6 lg:pt-0 lg:pl-6">
                  <p className="text-gray-600">Total Price:</p>
                  <p className="text-2xl font-bold text-pink-500">
                    ৳
                    {(
                      selectedVariant.price +
                      frequentlyBought.reduce(
                        (acc, item) => acc + (item.variants?.[0]?.price || 0),
                        0
                      )
                    ).toLocaleString()}
                  </p>
                  <button className="mt-2 w-full sm:w-auto bg-purple-600 text-white py-2 px-6 rounded-md font-semibold hover:bg-purple-700 transition-colors">
                    Add All to Bag
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --- You May Also Like Section --- */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-bold mb-8">
                YOU MAY ALSO LIKE
              </h2>

              {/* Create a grid container to hold the cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductDetailsPage;
