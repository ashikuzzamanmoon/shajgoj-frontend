// components/home/TopBrandsOffers/TopBrandsOffers.tsx
import Image from 'next/image';
import Link from 'next/link';

const offerItems = [
  {
    imageSrc: "/images/banners/top-offer-1.webp",
    href: "/category/skin-cafe",
    altText: "Trimmer Offer"
  },
  {
    imageSrc: "/images/banners/top-offer-2.webp",
    href: "/category/neutrogena",
    altText: "Limited Time Glow Deals"
  },
  {
    imageSrc: "/images/banners/top-offer-3.webp",
    href: "/category/jewellery",
    altText: "Jewellery Collection"
  },
  {
    imageSrc: "/images/banners/top-offer-4.webp",
    href: "/category/cerave",
    altText: "CeraVe up to 30% off"
  },
  {
    imageSrc: "/images/banners/top-offer-5.webp",
    href: "/category/chardike",
    altText: "Chardike Offer"
  },
  {
    imageSrc: "/images/banners/top-offer-6.webp",
    href: "/category/reckitt",
    altText: "New Arrival 15% off"
  }
];

const TopBrandsOffers = () => {
  return (
    <section className="container mx-auto mt-10 px-4">
      <div className="text-center mb-2">
        <h2 className="font-semibold tracking-wide text-gray-800">
          TOP BRANDS & OFFERS
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {offerItems.map((item, index) => (
          <Link href={item.href} key={index} className="block group">
            <div className="relative overflow-hidden rounded shadow-sm hover:shadow-xl transition-shadow duration-300">
              <Image
                src={item.imageSrc}
                alt={item.altText}
                width={600}
                height={300}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopBrandsOffers;