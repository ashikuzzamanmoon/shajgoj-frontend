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
  Truck,
  RefreshCw,
  ChevronDown,
  ShoppingBag,
  MapPin,
  ChevronRight,
} from "lucide-react";

// components/products/ProductGallery.tsx থেকে ইম্পোর্ট করা হয়েছে
import ProductGallery from "@/components/products/ProductGallery";
// components/home/shared/ProductCarousel/ProductCarousel.tsx থেকে ইম্পোর্ট করা হয়েছে
import ProductCarousel from "@/components/home/shared/ProductCarousel/ProductCarousel";

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
  const [openAccordion, setOpenAccordion] = useState<string | null>(
    "Description"
  );
  const { addToCart } = useCart();

  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
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
    .slice(0, 10);

  const frequentlyBought = allProducts.filter((p) => p.id === 2 || p.id === 18).slice(0, 2);

  const accordionData = [
    { title: "Description", content: product.description },
    { title: "How to Use", content: "Apply to clean, dry skin as needed." },
    { title: "Ingredients", content: "List of ingredients goes here." },
    {
      title: "Disclaimer",
      content:
        "Product color may slightly vary due to photographic lighting sources or your monitor settings.",
    },
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* --- Breadcrumbs --- */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-pink-500">Home</Link>
          {product.categories?.slice(0, 3).map((cat) => (
            <div key={cat} className="flex items-center">
              <ChevronRight size={16} className="mx-1" />
              <Link href="#" className="hover:text-pink-500">{cat}</Link>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* --- বাম কলাম: Main Content --- */}
          <div className="lg:col-span-5">
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
                <h1 className="text-xl font-bold mt-1 text-gray-800">
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
                        {product.variantType === 'color' ? 'Shade:' : 'Size:'} <span className="font-bold">{selectedVariant.name}</span>
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {product.variants.map(variant => (
                            <button
                                key={variant.id}
                                onClick={() => setSelectedVariant(variant)}
                                className={`flex items-center gap-2 p-1 border-2 rounded-md transition-all ${selectedVariant.id === variant.id ? 'border-pink-500' : 'border-gray-200'}`}
                            >
                                {/* ✅ TypeScript এরর সমাধান করা হয়েছে */}
                                {'hexCode' in variant && (
                                    <span style={{ backgroundColor: variant.hexCode }} className="w-6 h-6 rounded-full border"></span>
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
              </div>
            </div>
            
            {/* --- Frequently Bought Together --- */}
            {frequentlyBought.length > 0 && (
                <div className="mt-12 border rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Frequently Bought Together</h2>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="text-center">
                                <Image src={product.image} alt={product.name} width={100} height={100} className="rounded-md border"/>
                                <p className="text-xs mt-1 line-clamp-2">{product.name}</p>
                            </div>
                            
                            <Plus size={24} className="text-gray-400"/>

                            {frequentlyBought.map(item => (
                                <div key={item.id} className="text-center">
                                    <Image src={item.image} alt={item.name} width={100} height={100} className="rounded-md border"/>
                                    <p className="text-xs mt-1 line-clamp-2">{item.name}</p>
                                </div>
                            ))}
                        </div>
                        <div className="md:ml-auto text-center md:text-left mt-4 md:mt-0 border-l md:pl-6">
                            <p className="text-gray-600">Total Price:</p>
                            <p className="text-2xl font-bold text-pink-500">
                                ৳{(selectedVariant.price + frequentlyBought.reduce((acc, item) => acc + (item.variants?.[0]?.price || 0), 0)).toLocaleString()}
                            </p>
                            <button className="mt-2 w-full bg-purple-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-purple-700 transition-colors">
                                Add All to Bag
                            </button>
                        </div>
                    </div>
                </div>
            )}


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
                    <div className="pb-4 text-gray-600 prose">
                      {item.content}
                    </div>
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
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <MapPin size={20} className="text-gray-500 mr-2" />
                <span>Dhaka, Dhaka North, Banani</span>
                <button className="ml-auto text-blue-600 font-semibold">CHANGE</button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <Truck size={20} className="text-gray-500 mr-3 mt-1" />
                  <div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Home Delivery</span>
                        <span className="font-semibold">৳60</span>
                    </div>
                    <p className="text-xs text-gray-500">2-4 days</p>
                  </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailsPage;