"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import brandsData from "@/data/brands.json";

const FeaturedBrands = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* --- Section Heading --- */}
        <div className="text-center mb-8">
          <h2 className="md:text-3xl tracking-widest text-gray-700 md:mb-2">
            YOUR TRUE BEAUTY DESTINATION
          </h2>
          <p className="md:text-3xl tracking-widest text-gray-700">
            FOR PERFUMES AND COSMETICS IN BANGLADESH
          </p>
        </div>
        <div className="text-center md:mt-20 md:mb-12 my-8">
          <h3 className="text-xl md:text-2xl tracking-[0.3em] text-gray-500">
            FEATURED BRANDS
          </h3>
        </div>

        {/* --- Brand logo slider --- */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {brandsData.map((brand, index) => (
                <div
                  className="relative flex-[0_0_50%] sm:flex-[0_0_33.33%] md:flex-[0_0_20%] lg:flex-[0_0_16.66%] p-4"
                  key={index}
                >
                  <Link
                    href={brand.href}
                    className="flex items-center justify-center h-24 p-4 border border-black transition-shadow hover:shadow-lg"
                  >
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      width={120}
                      height={40}
                      className="object-contain"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* --- slider navigation button --- */}
          <button
            className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-gray-500 hover:text-black transition-colors"
            onClick={scrollPrev}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-gray-500 hover:text-black transition-colors"
            onClick={scrollNext}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands;
