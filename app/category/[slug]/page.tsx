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
import { ChevronDown, Search } from "lucide-react";

const allProducts: Product[] = allProductsData as Product[];

const sortOptions = [
  { name: "Default", value: "default" },
  { name: "Name: A-Z", value: "name-asc" },
  { name: "Name: Z-A", value: "name-desc" },
  { name: "Price: Low to High", value: "price-asc" },
  { name: "Price: High to Low", value: "price-desc" },
];

const CategoryPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const [initialProducts, setInitialProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState("default");
  const [pageTitle, setPageTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState({
    priceRange: [0, 100000] as [number, number],
    brands: [] as string[],
    categories: [] as string[], 
  });

  useEffect(() => {
    if (!slug) return;
    let productsToShow: Product[] = [];
    let title = "";

    const formattedSlug = slug.replace(/-/g, " ");

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
    setFilteredProducts(productsToShow); 
    setPageTitle(title.toUpperCase());
  }, [slug]);

  // The main logic for updating the product list when the filter changes
  useEffect(() => {
    let products = [...initialProducts];

    // Search filter
    if (searchQuery) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price filter
    products = products.filter((p) => {
      const price = p.variants?.[0]?.price ?? 0;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });
    // Brand filter
    if (filters.brands.length > 0) {
      products = products.filter((p) => filters.brands.includes(p.brand));
    }
    // Category filter
    if (filters.categories.length > 0) {
      products = products.filter((p) =>
        p.categories?.some((cat) => filters.categories.includes(cat))
      );
    }
    setFilteredProducts(products);
  }, [filters, initialProducts, searchQuery]);

  const filterOptions = useMemo(() => {
    const getCounts = (key: "brand" | "category") => {
      const counts: { [key: string]: number } = {};
      initialProducts.forEach((product) => {
        if (key === "brand") {
          const brand = product.brand;
          if (brand) {
            counts[brand] = (counts[brand] || 0) + 1;
          }
        } else if (key === "category") {
          product.categories?.forEach((cat) => {
            counts[cat] = (counts[cat] || 0) + 1;
          });
        }
      });
      return Object.entries(counts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => a.name.localeCompare(b.name));
    };

    const brands = getCounts("brand");
    const categories = getCounts("category");

    return { brands, categories };
  }, [initialProducts]);

  const handleFilterChange = (
    type: string,
    value: string | [number, number]
  ) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      const key = type as keyof typeof newFilters;

      if (key === "priceRange") {
        newFilters[key] = value as [number, number];
      } else if (Array.isArray(newFilters[key])) {
        const currentValues = newFilters[key] as string[];
        const stringValue = value as string;
        if (currentValues.includes(stringValue)) {
          (newFilters[key] as string[]) = currentValues.filter(
            (v) => v !== stringValue
          );
        } else {
          (newFilters[key] as string[]) = [...currentValues, stringValue];
        }
      }
      return newFilters;
    });
  };

  // sorting logic
  const sortedProducts = useMemo(() => {
    const productsToSort = [...filteredProducts];
    switch (sortOption) {
      case "name-asc":
        return productsToSort.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return productsToSort.sort((a, b) => b.name.localeCompare(a.name));
      case "price-asc":
        return productsToSort.sort(
          (a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0)
        );
      case "price-desc":
        return productsToSort.sort(
          (a, b) => (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0)
        );
      default:
        return productsToSort;
    }
  }, [filteredProducts, sortOption]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Filter Sidebar */}
        <aside className="lg:col-span-1">
          <FilterSidebar
            brands={filterOptions.brands}
            categories={filterOptions.categories}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </aside>

        {/* Right Column: Products */}
        <main className="lg:col-span-3">
          {/* Breadcrumbs and Title */}
          <div className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:underline">
              HOME
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-semibold uppercase">
              {pageTitle}
            </span>
          </div>

          {/* নতুন সার্চ সেকশন */}
          <div className="relative mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name or brand..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Top bar with count and sorting */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <p className="text-gray-600 mb-2 sm:mb-0">
              Showing {sortedProducts.length} products
            </p>
            <Menu as="div" className="relative w-full sm:w-48">
              <Menu.Button className="flex items-center justify-between w-full text-sm border border-gray-300 px-3 py-1.5 rounded-md bg-white hover:bg-gray-50">
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

          <ProductGrid products={sortedProducts} />
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
