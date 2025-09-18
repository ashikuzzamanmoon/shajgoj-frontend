// app/category/[slug]/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import allProductsData from "@/data/products.json";
import { Product } from "@/types";
import FilterSidebar from "@/components/filters/FilterSidebar";
import ProductGrid from "@/components/products/ProductGrid";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

const allProducts: Product[] = allProductsData as Product[];

const sortOptions = [
  { name: "Default", value: "default" },
  { name: "Name: A-Z", value: "name-asc" },
  { name: "Name: Z-A", value: "name-desc" },
  { name: "Price: Low to High", value: "price-asc" },
  { name: "Price: High to Low", value: "price-desc" },
];

const categoryLinks = [
  { name: "FRAGRANCE", href: "/category/fragrance" },
  { name: "SKINCARE", href: "/category/skincare" },
  { name: "MAKEUP", href: "/category/makeup" },
  { name: "HAIR AND BODY", href: "/category/hair-and-body" },
  { name: "CANDLE AND HOME", href: "/category/candle-and-home" },
];

const CategoryPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const [initialProducts, setInitialProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState("default");
  const [pageTitle, setPageTitle] = useState("");

  const [filters, setFilters] = useState({
    priceRange: [0, 100000] as [number, number],
    brands: [] as string[],
    genders: [] as string[],
    mainCategories: [] as string[],
    subCategories: [] as string[],
    sizes: [] as string[],
  });

  useEffect(() => {
    if (!slug) return;
    let productsToShow: Product[] = [];
    let title = "";
    if (slug === "all") {
      productsToShow = allProducts;
      title = "All Products";
    } else if (slug === "sale") {
      productsToShow = allProducts.filter((p) => p.isSale);
      title = "Sale";
    } else if (slug === "new-arrivals") {
      productsToShow = allProducts.filter((p) => p.isNewArrival);
      title = "New Arrivals";
    } else {
      const formattedSlug = slug.replace(/-/g, " ");
      productsToShow = allProducts.filter((product) =>
        product.categories?.some((cat) => cat.toLowerCase() === formattedSlug)
      );
      title = formattedSlug;
      if (productsToShow.length === 0) {
        productsToShow = allProducts.filter(
          (p) =>
            p.brand?.toLowerCase().replace(/ /g, "-") === slug.toLowerCase()
        );
        if (productsToShow.length > 0) {
          title = productsToShow[0].brand;
        }
      }
    }
    setInitialProducts(productsToShow);
    setPageTitle(title.toUpperCase());
  }, [slug]);

  // ফিল্টার পরিবর্তন হলে প্রোডাক্ট তালিকা আপডেট করার মূল লজিক
  useEffect(() => {
    let products = [...initialProducts];

    // Price filter
    products = products.filter((p) => {
      const price = p.variants?.[0]?.price ?? 0;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });
    // Brand filter
    if (filters.brands.length > 0) {
      products = products.filter((p) => filters.brands.includes(p.brand));
    }
    // Gender filter
    if (filters.genders.length > 0) {
      products = products.filter((p) =>
        p.categories?.some((cat) => filters.genders.includes(cat))
      );
    }
    // Main Category filter
    if (filters.mainCategories.length > 0) {
      products = products.filter((p) =>
        p.categories?.some((cat) => filters.mainCategories.includes(cat))
      );
    }
    // SubCategory filter
    if (filters.subCategories.length > 0) {
      products = products.filter((p) =>
        p.categories?.some((cat) => filters.subCategories.includes(cat))
      );
    }
    // Size filter
    if (filters.sizes.length > 0) {
      products = products.filter((p) =>
        p.variants.some((v) => filters.sizes.includes(v.name))
      );
    }

    setFilteredProducts(products);
  }, [filters, initialProducts]);

  // ফিল্টার অপশনগুলো ডাইনামিকভাবে তৈরি করা
  const filterOptions = useMemo(() => {
    const brands = [...new Set(initialProducts.map((p) => p.brand))].sort();
    const allCategories = initialProducts.flatMap((p) => p.categories || []);
    const mainCategories = [
      ...new Set(
        allCategories.filter((c) =>
          [
            "Fragrance",
            "Makeup",
            "Skincare",
            "Hair and Body",
            "Candle and Home",
          ].includes(c)
        )
      ),
    ];
    const genders = [
      ...new Set(
        allCategories.filter((c) => ["Men", "Women", "Unisex"].includes(c))
      ),
    ];
    const subCategories = [
      ...new Set(
        allCategories.filter(
          (c) => !mainCategories.includes(c) && !genders.includes(c)
        )
      ),
    ].sort();
    const sizes = [
      ...new Set(
        initialProducts
          .filter((p) => p.variantType === "size")
          .flatMap((p) => p.variants.map((v) => v.name))
      ),
    ].sort();
    return { brands, genders, mainCategories, subCategories, sizes };
  }, [initialProducts]);

  // ফিল্টার পরিবর্তনের জন্য হ্যান্ডলার ফাংশন আপডেট করা হয়েছে
  const handleFilterChange = (
    type: string,
    value: string | [number, number]
  ) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      const key = type as keyof typeof newFilters;

      if (key === "priceRange") {
        newFilters[key] = value as [number, number];
      } else if (Array.isArray(newFilters[key])) {
        const currentValues = prevFilters[key] as string[];
        const stringValue = value as string;

        // নতুন কপি তৈরি করা হচ্ছে
        if (currentValues.includes(stringValue)) {
          // আইটেমটি অ্যারে থেকে বাদ দেওয়া হচ্ছে
          (newFilters[key] as string[]) = currentValues.filter(
            (v) => v !== stringValue
          );
        } else {
          // আইটেমটি অ্যারেতে যোগ করা হচ্ছে
          (newFilters[key] as string[]) = [...currentValues, stringValue];
        }
      }
      return newFilters;
    });
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 100000],
      brands: [],
      genders: [],
      mainCategories: [],
      subCategories: [],
      sizes: [],
    });
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:underline">
          HOME
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 uppercase">{pageTitle}</span>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg mb-8 text-center">
        <h1 className="text-3xl font-bold">{pageTitle}</h1>
        <p className="mt-2 text-gray-600">Discover our curated selection.</p>
      </div>

      {/* --- টপ ফিল্টার বার (আপনার ডিজাইন অনুযায়ী) --- */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 p-4">
        <div className="flex items-center space-x-4">
          <span className="font-semibold">FILTER RESULTS</span>
          <button
            onClick={resetFilters}
            className="text-xs text-gray-500 hover:underline md:cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
        <div className="flex flex-col space-y-2 w-full mt-4 md:flex-row md:space-y-0 md:space-x-2 md:w-auto md:mt-0">
          {/* Category Dropdown */}
          <Menu as="div" className="relative w-full md:w-auto">
            <Menu.Button className="flex items-center justify-between w-full text-sm border px-3 py-1.5 rounded-md">
              <span>CATEGORY</span>
              <ChevronDown size={16} className="ml-1" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white shadow-lg rounded-md z-10">
              <div className="p-1">
                {categoryLinks.map((link) => (
                  <Menu.Item key={link.href}>
                    {({ active }) => (
                      <Link
                        href={link.href}
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block px-4 py-2 text-sm text-gray-700 rounded-md`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Menu>
          {/* Sort By Dropdown */}
          <Menu as="div" className="relative w-full md:w-48">
            <Menu.Button className="flex items-center justify-between w-full text-sm border px-3 py-1.5 rounded-md">
              <span>
                {sortOptions.find((opt) => opt.value === sortOption)?.name}
              </span>
              <ChevronDown size={16} className="ml-1" />
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-full origin-top-right bg-white shadow-lg rounded-md z-10">
                <div className="p-1">
                  {sortOptions.map((option) => (
                    <Menu.Item key={option.value}>
                      {({ active }) => (
                        <button
                          onClick={() => setSortOption(option.value)}
                          className={`${
                            active ? "bg-gray-100" : ""
                          } group flex rounded-md items-center w-full px-4 py-2 text-sm text-gray-700`}
                        >
                          {option.name}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar
          brands={filterOptions.brands}
          genders={filterOptions.genders}
          mainCategories={filterOptions.mainCategories}
          subCategories={filterOptions.subCategories}
          sizes={filterOptions.sizes}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
};

export default CategoryPage;
