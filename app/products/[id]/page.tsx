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
  ShoppingCart,
  Heart,
  ShieldCheck,
  Truck,
  RefreshCw,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";
import ProductCarousel from "@/components/home/shared/ProductCarousel/ProductCarousel";

const allProducts: Product[] = allProductsData as Product[];

// Helper component for rendering star ratings
const RenderStars = ({ rating = 0 }: { rating?: number }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex">
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
  const [activeImage, setActiveImage] = useState(product?.image || "");
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      if (product.variants && product.variants.length > 0) {
        setSelectedVariant(product.variants[0]);
      }
    }
  }, [product]);

  if (!product || !selectedVariant) {
    return (
      <div className="text-center py-20">Loading or Product not found...</div>
    );
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
    .slice(0, 5);
  const brandProducts = allProducts
    .filter((p) => p.brand === product.brand && p.id !== product.id)
    .slice(0, 5);

  const accordionData = [
    { title: "Description", content: product.description },
    { title: "How to Use", content: "Apply to clean, dry skin as needed." },
    { title: "Ingredients", content: "List of ingredients goes here." },
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* --- বাম কলাম: Main Content --- */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div className="flex flex-col-reverse sm:flex-row gap-4">
                <div className="flex sm:flex-col gap-3 justify-center">
                  {galleryImages.map((img, index) => (
                    <button
                      key={index}
                      onMouseEnter={() => setActiveImage(img)}
                      className={`w-16 h-16 border-2 rounded-lg overflow-hidden transition-all ${
                        activeImage === img
                          ? "border-pink-500 shadow-md"
                          : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
                <div className="flex-grow relative aspect-square border rounded-lg">
                  <Image
                    src={activeImage}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {product.brand}
                </p>
                <h1 className="text-2xl font-bold mt-1">{product.name}</h1>
                <div className="flex items-center space-x-2 mt-2">
                  <RenderStars rating={product.rating} />
                  <span className="text-sm text-gray-500">
                    ({product.reviewCount || 0} Reviews)
                  </span>
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
                    className="flex items-center justify-center w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-pink-500 transition-colors"
                  >
                    <ShoppingBag size={18} className="mr-2" /> ADD TO CART
                  </button>
                  <button className="flex items-center justify-center w-full bg-pink-500 text-white py-3 rounded-md font-semibold hover:bg-pink-600 transition-colors">
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
            {/* --- Accordions --- */}
            <div className="mt-12">
              {accordionData.map((item) => (
                <div key={item.title} className="border-b">
                  <button
                    className="w-full flex justify-between items-center py-4 text-left"
                    onClick={() =>
                      setOpenAccordion(
                        openAccordion === item.title ? null : item.title
                      )
                    }
                  >
                    <span className="font-semibold text-lg">{item.title}</span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${
                        openAccordion === item.title ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordion === item.title && (
                    <div className="pb-4 text-gray-600">{item.content}</div>
                  )}
                </div>
              ))}
            </div>

            {/* --- You May Also Like Section --- */}
            {relatedProducts.length > 0 && (
              <div className="mt-16">
                <ProductCarousel
                  title="YOU MAY ALSO LIKE"
                  products={relatedProducts}
                />
              </div>
            )}
          </div>

          {/* --- ডান কলাম: Delivery Options --- */}
          <div className="lg:col-span-2 space-y-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Delivery Options</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Truck size={20} className="text-gray-500 mr-3" />
                  <span>Home Delivery</span>
                  <span className="ml-auto font-semibold">৳60</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheck size={20} className="text-gray-500 mr-3" />
                  <span>Cash on Delivery Available</span>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Return & Warranty</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <RefreshCw size={20} className="text-gray-500 mr-3" />
                  <span>7 Days Return</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheck size={20} className="text-gray-500 mr-3" />
                  <span>Warranty not available</span>
                </div>
              </div>
            </div>
            {/* --- More from this brand Section --- */}
            {brandProducts.length > 0 && (
              <div className="mt-8">
                <h3 className="font-semibold mb-4 text-center">
                  More from {product.brand}
                </h3>
                <div className="space-y-4">
                  {brandProducts.map((p) => (
                    <Link
                      href={`/products/${p.name
                        .toLowerCase()
                        .replace(/ /g, "-")}`}
                      key={p.id}
                      className="flex items-center space-x-3 group"
                    >
                      <div className="w-16 h-16 border rounded-md overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm font-semibold group-hover:text-pink-500 transition-colors">
                          {p.name}
                        </p>
                        <p className="text-pink-500 font-bold text-xs">
                          ৳{p.variants?.[0]?.price.toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailsPage;
