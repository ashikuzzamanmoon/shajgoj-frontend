// components/home/AboutSection/AboutSection.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const AboutSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* পরিবর্তন: একটি র‍্যাপার div যোগ করা হয়েছে এবং বর্ডারটি এখানে আনা হয়েছে */}
        <div className="border-b pb-6">
          {/* Accordion Header - এখান থেকে বর্ডার সরিয়ে দেওয়া হয়েছে */}
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <h2 className="text-sm tracking-[0.3em] text-gray-700">
              ABOUT SUNDORA
            </h2>
            <ChevronDown
              size={20}
              className={`text-gray-500 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Accordion Content */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isOpen ? "max-h-screen mt-6" : "max-h-0"
            }`}
          >
            <div className="text-gray-600 text-sm space-y-4">
              <p>
                Shop at Sundora, your one stop beauty destination for perfumes
                and beauty in Bangladesh! Indulge in a dreamy array of{" "}
                <strong>
                  skincare, makeup, luxury fragrances, and scented candle
                </strong>{" "}
                from the most coveted authentic brands around the world.
                Discover our selection of luxury beauty products from{" "}
                <strong>
                  Carolina Herrera, Calvin Klein, Paco Rabanne, Hugo Boss,
                  Yankee Candle
                </strong>
                . Get ready to immerse yourself in the world of long lasting
                perfume that will transport you to the heart of Bangladesh
              </p>
              <p>
                Experience our ranges of high performance skincare and{" "}
                <strong>hair care</strong> products from{" "}
                <strong>Clarins, Dr. Barbara Sturm and Natura Bisse</strong>, to
                provide with a personalized skincare routine that will give you
                a healthy skin and a glowing appearance. Whether you’re looking
                to spoil yourself or that special someone, our collection of
                unique and ultra-luxe beauty products and perfumes is sure to
                impress. Enjoy the true beauty shopping experience at Sundora
                and embrace your own inner beauty
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
