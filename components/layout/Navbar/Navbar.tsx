/* eslint-disable @typescript-eslint/no-explicit-any */
// components/layout/Navbar.tsx
"use client";

import { useRef, useState, Fragment, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Transition } from "@headlessui/react";
import { Search, Heart, User, ShoppingBag, Menu } from "lucide-react";
import navigationData from "@/data/navigation.json";
import MobileMenu from "./MobileMenu";
import { useCart } from "@/context/CartContext";
import allProductsData from "@/data/products.json";
import { Product } from "@/types";
import AuthModal from "@/components/auth/AuthModal";

const allProducts: Product[] = allProductsData as Product[];

const pillColorClasses: { [key: string]: string } = {
  "bg-blue-600": "bg-blue-600",
  "bg-pink-600": "bg-pink-600",
  "bg-purple-600": "bg-purple-600",
  "bg-teal-500": "bg-teal-500",
  "bg-green-700": "bg-green-700",
};

interface NavigationItem {
  name: string;
  href: string;
  isPill: boolean;
  pillColor?: string;
  megaMenu?: any;
}

const Navbar = () => {
  const router = useRouter();
  const { toggleCart, itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 10));
      setShowSearchDropdown(true);
    } else {
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 200);
  };

  const getProductLink = (product: Product) => {
    if (product.categories && product.categories.length > 0) {
      const categoryMappings: { [key: string]: string } = {
        skincare: "skin",
        "personal care": "personal-care",
        "mom and baby": "mom-and-baby",
        "mom & baby": "mom-and-baby",
        fragrance: "fragrance",
        undergarments: "undergarments",
        jewellery: "jewellery",
        makeup: "makeup",
        hair: "hair",
        men: "men",
      };

      for (const category of product.categories) {
        const categoryLower = category.toLowerCase();

        if (categoryMappings[categoryLower]) {
          return `/category/${categoryMappings[categoryLower]}`;
        }

        if (
          ["makeup", "hair", "skincare", "fragrance", "men", "women"].some(
            (main) =>
              categoryLower.includes(main) || main.includes(categoryLower)
          )
        ) {
          return `/category/${categoryLower.replace(/\s+/g, "-")}`;
        }
      }
    }

    if (product.brand) {
      const brandSlug = product.brand.toLowerCase().replace(/\s+/g, "-");
      return `/category/${brandSlug}`;
    }

    return "/category/all";
  };

  const handleSearchResultClick = (url: string) => {
    setShowSearchDropdown(false);
    setSearchQuery("");
    // Use router.push for client-side navigation (preserves cart state)
    router.push(url);
  };

  const getUniqueBrands = () => {
    const brands = new Set<string>();
    searchResults.forEach((product) => {
      if (product.brand) {
        brands.add(product.brand);
      }
    });
    return Array.from(brands).slice(0, 3);
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          {/* --- Main Header (for Desktop) --- */}
          <div className="hidden md:flex justify-between items-center py-4">
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-3xl font-bold tracking-widest">
                SHAJGOJ
              </Link>
              <Link href="/brands" className="text-sm font-semibold">
                BRANDS
              </Link>
            </div>

            {/* Desktop Search */}
            <div className="w-full max-w-md mx-8 relative" ref={searchRef}>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search size={20} className="text-gray-400" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery && setShowSearchDropdown(true)}
                  placeholder="Search for Products, Brands..."
                  className="w-full pl-10 pr-4 py-2 border-2 border-pink-500 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              {/* Search Dropdown */}
              {showSearchDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                  {searchResults.length > 0 ? (
                    <>
                      {/* Products Section */}
                      <div className="p-2">
                        <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                          Products
                        </div>
                        {searchResults.map((product) => {
                          const productUrl = getProductLink(product);
                          return (
                            <button
                              key={product.id}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                handleSearchResultClick(productUrl);
                              }}
                              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-md transition-colors w-full text-left cursor-pointer"
                            >
                              {product.image && (
                                <div className="relative w-12 h-12 flex-shrink-0">
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover rounded"
                                    sizes="48px"
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-900 truncate">
                                  {product.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {product.brand}
                                </div>
                                <div className="text-sm font-semibold text-pink-600">
                                  ৳ {product.variants?.[0]?.price || 0}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Brands Section */}
                      {getUniqueBrands().length > 0 && (
                        <div className="border-t border-gray-100 p-2">
                          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                            Brands
                          </div>
                          {getUniqueBrands().map((brand) => (
                            <Link
                              key={brand}
                              href={`/category/${brand
                                .toLowerCase()
                                .replace(/ /g, "-")}`}
                              onClick={() => {
                                setShowSearchDropdown(false);
                                setSearchQuery("");
                              }}
                              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-md transition-colors"
                            >
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-bold text-gray-600">
                                  {brand.charAt(0)}
                                </span>
                              </div>
                              <span className="text-sm font-medium text-gray-700">
                                {brand}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      No products found for &quot;{searchQuery}&quot;
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <Link href="/wishlist">
                <button className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  <Heart size={16} />
                  <span>WISHLIST</span>
                </button>
              </Link>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center space-x-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold"
              >
                <User size={16} />
                <span>LOGIN</span>
              </button>
              <button
                onClick={toggleCart}
                className="flex items-center space-x-2 bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold"
              >
                <ShoppingBag size={16} />
                <span>BAG</span>
                <span>({itemCount})</span>
              </button>
            </div>
          </div>

          {/* --- Main Header (For Mobile) --- */}
          <div className="md:hidden flex flex-col">
            <div className="flex justify-between items-center py-4">
              <button onClick={() => setIsMobileMenuOpen(true)}>
                <Menu size={28} />
              </button>
              <Link href="/" className="text-2xl font-bold tracking-widest">
                SHAJGOJ
              </Link>
              <div>{/* any icon here */}</div>
            </div>

            {/* Mobile Search */}
            <div className="relative mb-3" ref={searchRef}>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search size={20} className="text-gray-400" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setShowSearchDropdown(true)}
                placeholder="Search for Products, Brands..."
                className="w-full pl-10 pr-4 py-2 border-2 border-pink-500 rounded-full focus:outline-none focus:ring-1 focus:ring-pink-400"
              />

              {/* Mobile Search Dropdown */}
              {showSearchDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
                  {searchResults.length > 0 ? (
                    <div className="p-2">
                      {searchResults.map((product) => {
                        const productUrl = getProductLink(product);
                        return (
                          <button
                            key={product.id}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              handleSearchResultClick(productUrl);
                            }}
                            className="flex items-center gap-3 px-2 py-2 hover:bg-gray-50 rounded-md w-full text-left cursor-pointer"
                          >
                            {product.image && (
                              <div className="relative w-10 h-10 flex-shrink-0">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-cover rounded"
                                  sizes="40px"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-900 truncate">
                                {product.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {product.brand}
                              </div>
                              <div className="text-sm font-semibold text-pink-600">
                                ৳ {product.variants?.[0]?.price || 0}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-gray-500 text-sm">
                      No products found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <hr className="hidden md:block border-gray-200" />

          {/* --- Navigation Bar (For Desktop) --- */}
          <nav className="hidden md:flex justify-center items-center h-12 relative">
            <ul className="flex items-center space-x-6 text-sm">
              {(navigationData as NavigationItem[]).map((item) => (
                <li
                  key={item.name}
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                  className="py-3"
                >
                  <Link
                    href={item.href}
                    className={`font-medium transition-colors pb-2 ${
                      openMenu === item.name
                        ? "text-pink-500 border-b-2 border-pink-500"
                        : "text-gray-600 hover:text-pink-500"
                    }`}
                  >
                    {item.isPill ? (
                      <span
                        className={`px-3 py-1.5 text-white text-xs font-bold rounded-full ${
                          pillColorClasses[item.pillColor || ""] ||
                          "bg-gray-500"
                        }`}
                      >
                        {item.name}
                      </span>
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </Link>
                  {item.megaMenu && (
                    <Transition
                      show={openMenu === item.name}
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-full w-full z-20">
                        <div className="bg-white shadow-lg">
                          <div className="max-w-7xl mx-auto px-4">
                            <div className="flex">
                              {item.megaMenu.map(
                                (section: any, index: number) => (
                                  <div
                                    key={section.title}
                                    className={`space-y-3 p-8 flex-1 ${
                                      index % 2 !== 0
                                        ? "bg-gray-50"
                                        : "bg-white"
                                    }`}
                                  >
                                    <h3 className="font-bold text-gray-800">
                                      {section.title}
                                    </h3>
                                    <ul className="space-y-2">
                                      {section.links.map((link: any) => (
                                        <li key={link.name}>
                                          <Link
                                            href={link.href}
                                            className="text-gray-500 hover:text-pink-500 hover:underline"
                                          >
                                            {link.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Transition>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
