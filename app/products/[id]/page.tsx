// app/products/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import allProductsData from "@/data/products.json";
import {
  ChevronDown,
  Share2,
  Heart,
  Star,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import ProductGallery from "@/components/products/ProductGallery";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import AuthenticityBadges from "@/components/products/AuthenticityBadges";
import RecommendedProducts from "@/components/products/RecommendedProducts";

interface BaseVariant {
  id: number;
  name: string;
  originalPrice: number;
  price: number;
  discount: number;
}
// Type for color variant, where hexCode is required
interface ColorVariant extends BaseVariant {
  hexCode: string;
}
// Type for size variant
type SizeVariant = BaseVariant;

// Type for product
interface BaseProduct {
  id: number;
  brand: string;
  name: string;
  type: string;
  image: string;
  gallery?: string[];
  description?: string;
}
// Products with size variants
interface ProductWithSizeVariants extends BaseProduct {
  variantType: "size";
  variants: SizeVariant[];
}
// Product with color variants
interface ProductWithColorVariants extends BaseProduct {
  variantType: "color";
  variants: ColorVariant[];
}
// One Union Type for all types of products
type Product = ProductWithSizeVariants | ProductWithColorVariants;

const allProducts: Product[] = allProductsData as Product[];

const ProductDetailsPage = () => {
  const { addToCart } = useCart();
  const params = useParams();
  const productId = parseInt(params.id as string, 10);
  const product = allProducts.find((p) => p.id === productId);

  const [selectedVariant, setSelectedVariant] = useState<
    SizeVariant | ColorVariant | null
  >(null);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>(
    "DESCRIPTION"
  );

  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  if (!product || !selectedVariant) {
    return <div>Loading...</div>;
  }

  const galleryImages = [product.image, ...(product.gallery || [])];

  const accordionData = [
    { title: "DESCRIPTION", content: product.description },
    {
      title: "AUTHENTICITY",
      content: <AuthenticityBadges />,
    },
    {
      title: "SHIPPING & DELIVERY",
      content:
        "Free Delivery for orders valued over ৳ 5000.00 before tax. Standard Delivery: 2 - 3 working days inside Dhaka; 5 - 7 working days outside Dhaka.",
    },
    {
      title: "PAYMENT & RETURN",
      content:
        "Payments can be made online using credit cards or mobile wallets for all orders. Cash on Delivery is available for orders valued under ৳ 100000.00. Easy Return and Refund Process.",
    },
  ];

  // --- A function to render the variant selection UI ---
  const renderVariantSelector = () => {
    if (product.variantType === "color") {
      return (
        <div className="flex space-x-3 mt-2">
          {product.variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariant(variant)}
              title={variant.name}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selectedVariant.id === variant.id
                  ? "border-blue-500 scale-110"
                  : "border-gray-200"
              }`}
              style={{ backgroundColor: variant.hexCode }}
            />
          ))}
        </div>
      );
    }

    if (product.variantType === "size") {
      return (
        <div className="flex space-x-2 mt-2">
          {product.variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariant(variant)}
              className={`px-4 py-2 text-sm border rounded-md ${
                selectedVariant.id === variant.id
                  ? "bg-[#2a676b] text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {variant.name}
            </button>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleAddToCart = () => {
    if (product && selectedVariant) {
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
      toast.success(`Added ${product.name} to cart!`);
    }
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-3 md:px-6 py-8">
        {/* --- Breadcrumbs --- */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:underline">
            HOME
          </Link>
          <span className="mx-2">/</span>
          <span>{product.brand}</span>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* --- left column: image gallery --- */}
          <div>
            <ProductGallery
              images={galleryImages}
              productName={product.name}
              discount={selectedVariant.discount}
            />
          </div>

          {/* --- right column: product information --- */}
          <div className="shadow-xl px-2 md:px-8">
            <h1 className="text-3xl font-bold text-gray-800">
              {product.brand}
            </h1>
            <p className="text-xl text-gray-700 mt-1">{product.name}</p>
            {selectedVariant.name && (
              <p className="text-md text-gray-500 mt-1">
                {selectedVariant.name}
              </p>
            )}

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-1">
                <Star size={18} className="text-yellow-500 fill-yellow-500" />
                <Star size={18} className="text-yellow-500 fill-yellow-500" />
                <Star size={18} className="text-yellow-500 fill-yellow-500" />
                <Star size={18} className="text-yellow-500 fill-yellow-500" />
                <Star size={18} className="text-yellow-500" />
                <span className="text-sm text-gray-600 ml-2">4.5 (6)</span>
              </div>
              <div className="flex items-center space-x-4">
                <Share2 size={20} className="text-gray-600 cursor-pointer" />
                <Heart size={20} className="text-gray-600 cursor-pointer" />
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold uppercase">
                {product.variantType}:
              </p>
              {renderVariantSelector()}
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold">QUANTITY:</p>
              <div className="flex items-center border rounded-md w-28 mt-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-gray-600"
                >
                  <Minus size={16} />
                </button>
                <span className="flex-grow text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-gray-600"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="mt-8 flex items-center space-x-6">
              <div>
                <p className="text-xs text-gray-500">Price</p>
                <p className="text-lg text-gray-400 line-through">
                  ৳{(selectedVariant.originalPrice * quantity).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Discounted Price</p>
                <p className="text-2xl font-bold text-gray-900">
                  ৳{(selectedVariant.price * quantity).toLocaleString()}
                </p>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-6 w-full bg-[#2a676b] text-white py-3 rounded-md flex items-center justify-center space-x-2 hover:bg-[#225558] transition-colors"
            >
              <ShoppingCart size={20} />
              <span>ADD TO CART</span>
            </button>

            {/* --- Accordions --- */}
            <div className="mt-8 space-y-2">
              {accordionData.map((item) => (
                <div key={item.title} className="border-t">
                  <button
                    className="w-full flex justify-between items-center py-4 text-left"
                    onClick={() =>
                      setOpenAccordion(
                        openAccordion === item.title ? null : item.title
                      )
                    }
                  >
                    <span className="font-semibold">{item.title}</span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${
                        openAccordion === item.title ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordion === item.title && (
                    <div className="pb-4 text-sm text-gray-600">
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <AuthenticityBadges />
        </div>
        <RecommendedProducts currentProductId={productId} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
