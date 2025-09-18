"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import ProductCard from "@/components/products/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types";

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

const ProductCarousel = ({ title, products }: ProductCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const updateButtonState = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, []);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
    updateButtonState(emblaApi);
  }, [emblaApi, setScrollProgress, updateButtonState]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi
      .on("scroll", onScroll)
      .on("reInit", onScroll)
      .on("select", onScroll);

    // Clean up the event listeners
    return () => {
      emblaApi
        .off("scroll", onScroll)
        .off("reInit", onScroll)
        .off("select", onScroll);
    };
  }, [emblaApi, onScroll]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl tracking-[0.3em] text-gray-700">{title}</h2>
        </div>

        <div className="relative -mx-6">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 px-6">
              {products.map((product) => (
                <div
                  className="flex-[0_0_50%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%]"
                  key={product.id}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          <button
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-gray-500 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            aria-label="Previous products"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-gray-500 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            aria-label="Next products"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* --- Progress Bar --- */}
        <div className="mt-8">
          <div className="bg-gray-200 h-1 w-full rounded-full">
            <div
              className="bg-gray-600 h-1 rounded-full"
              style={{ width: `${scrollProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
