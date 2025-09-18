"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const sliderImages = [
  "/images/slider/slider.jpg",
  "/images/slider/slider1.jpg",
  "/images/slider/slider2.jpg",
  "/images/slider/slider3.webp",
  "/images/slider/slider4.webp",
  "/images/slider/slider5.webp",
];

const HeroSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, setSelectedIndex]);

  return (
    <section className="relative w-full">
      <div
        className="overflow-hidden aspect-video md:aspect-[2.5/1]"
        ref={emblaRef}
      >
        <div className="flex h-full">
          {sliderImages.map((src, index) => (
            <div className="relative flex-[0_0_100%] h-full" key={index}>
              <Image
                src={src}
                alt={`Slider image ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-10 md:bottom-16 left-1/2 -translate-x-1/2 z-20">
        <Link href="/products">
          <button className="px-2 md:px-7 py-1 md:py-2 text-xs md:text-sm rounded bg-gray-700 bg-opacity-70 text-white font-semibold border border-gray-400 hover:bg-gray-800 hover:bg-opacity-80 transition-colors duration-300">
            SHOP NOW
          </button>
        </Link>
      </div>

      {/* Previous & Next Buttons */}
      <button
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md z-20"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md z-20"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            className={`h-1 w-8 rounded-full transition-all duration-300 ${
              index === selectedIndex ? "bg-white" : "bg-gray-400 opacity-70"
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
