// app/brands/page.tsx
import React from "react";
import Link from "next/link";
import brandsData from "@/data/brands.json";

interface GroupedBrands {
  [key: string]: { name: string; href: string }[];
}

const BrandsPage = () => {
  const groupedBrands = brandsData
    .sort((a, b) => a.name.localeCompare(b.name))
    .reduce((acc, brand) => {
      const firstLetter = brand.name[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(brand);
      return acc;
    }, {} as GroupedBrands);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl tracking-[0.3em] text-gray-700">
            ALL OUR BRANDS IN SHAJGOJ
          </h1>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-sm text-gray-500 mb-12">
          {alphabet.map((letter) => (
            <React.Fragment key={letter}>
              <Link
                href={`#brand-${letter}`}
                className="hover:text-black hover:underline"
              >
                {letter}
              </Link>
              {letter !== "Z" && <span className="text-gray-300">•</span>}
            </React.Fragment>
          ))}
        </div>

        {/* --- Brand List --- */}
        <div className="space-y-8">
          {Object.keys(groupedBrands).map((letter) => (
            <div key={letter} id={`brand-${letter}`} className="pt-8 border-t">
              <div className="flex flex-row gap-4 md:gap-8">
                {/* Capital letter */}
                <div className="w-1/6 md:w-[10%]">
                  <h2 className="text-5xl font-light text-gray-800">
                    {letter}
                  </h2>
                </div>
                {/* Brand name */}
                <div className="w-5/6 md:w-[90%]">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {groupedBrands[letter].map((brand) => (
                      <Link
                        key={brand.name}
                        href={brand.href}
                        className="text-gray-700 hover:text-black hover:underline text-sm"
                      >
                        {brand.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsPage;
