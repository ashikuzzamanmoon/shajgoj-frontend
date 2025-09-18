// components/products/ProductGallery.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  discount: number;
}

const ProductGallery = ({
  images,
  productName,
  discount,
}: ProductGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);

    return () => {
      emblaMainApi.off("select", onSelect);
      emblaMainApi.off("reInit", onSelect);
    };
  }, [emblaMainApi, onSelect]);

  const scrollPrev = useCallback(
    () => emblaMainApi?.scrollPrev(),
    [emblaMainApi]
  );
  const scrollNext = useCallback(
    () => emblaMainApi?.scrollNext(),
    [emblaMainApi]
  );

  return (
    <div>
      {/* --- Main Image Carousel --- */}
      <div className="relative">
        <div className="overflow-hidden rounded-lg" ref={emblaMainRef}>
          <div className="flex">
            {images.map((src, index) => (
              <div
                className="relative flex-[0_0_100%] aspect-square"
                key={index}
              >
                <Image
                  src={src}
                  alt={`${productName} image ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-[#e8c893] text-black text-sm rounded-full w-16 h-16 flex items-center justify-center">
            -{discount}%
          </div>
        )}

        <button
          onClick={scrollPrev}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-md hover:bg-white transition"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={scrollNext}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-md hover:bg-white transition"
        >
          <ChevronRight />
        </button>
      </div>

      {/* --- Thumbnails Carousel --- */}
      <div className="mt-4">
        <div className="overflow-hidden" ref={emblaThumbsRef}>
          <div className="flex gap-4">
            {images.map((src, index) => (
              <button
                onClick={() => onThumbClick(index)}
                key={index}
                className={`flex-[0_0_15%] transition-opacity`}
              >
                <div
                  className={`relative aspect-square border-2 rounded-md overflow-hidden
                  ${
                    index === selectedIndex
                      ? "border-gray-900 opacity-100"
                      : "border-transparent opacity-60"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${productName} thumbnail ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
