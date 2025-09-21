// components/home/PromotionalGrid/PromotionalGrid.tsx
import Image from 'next/image';
import Link from 'next/link';

// ব্যানারগুলোর ডেটা এখানে রাখছি
const promoItems = [
  {
    imageSrc: "/images/banners/promo-banner-1.webp",
    href: "/category/monsoon-hair-care",
    altText: "Monsoon Hair Care Deals"
  },
  {
    imageSrc: "/images/banners/promo-banner-2.webp",
    href: "/category/mom-and-baby",
    altText: "Mom and Baby Products"
  },
  {
    imageSrc: "/images/banners/promo-banner-3.webp",
    href: "/category/square",
    altText: "Square Brand Products"
  },
  {
    imageSrc: "/images/banners/promo-banner-4.webp",
    href: "/category/korean-skincare-festival",
    altText: "Korean Skincare Festival"
  }
];

const PromotionalGrid = () => {
  return (
    <section className="container mx-auto mt-10 px-4">
      <div className="text-center mb-2">
        <h2 className="font-semibold tracking-wide text-gray-800">
          DEALS YOU CANNOT MISS
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {promoItems.map((item, index) => (
          <Link href={item.href} key={index} className="block group">
            <div className="relative overflow-hidden rounded shadow-sm hover:shadow-xl transition-shadow duration-300">
              <Image
                src={item.imageSrc}
                alt={item.altText}
                width={400}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PromotionalGrid;