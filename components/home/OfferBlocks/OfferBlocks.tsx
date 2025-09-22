// components/home/OfferBlocks/OfferBlocks.tsx
import Image from "next/image";
import Link from "next/link";

const offerData = [
  {
    imageSrc: "/images/homepage/offer-bogo.webp",
    href: "/category/bogo",
    altText: "Buy 1 Get 1 Offer",
  },
  {
    imageSrc: "/images/homepage/offer-combo.webp",
    href: "/category/combo",
    altText: "Perfect Match Combo",
  },
  {
    imageSrc: "/images/homepage/offer-exclusive.webp",
    href: "/category/offers",
    altText: "Exclusive Offers",
  },
  {
    imageSrc: "/images/homepage/offer-sale.webp",
    href: "/category/clearance-sale",
    altText: "Clearance Sale",
  },
];

const OfferBlocks = () => {
  return (
    <section className="container mx-auto my-8 px-4">
      <div className="text-center mb-4">
        <h3 className="text-sm font-semibold tracking-widest text-gray-500">
          LIMITED TIME OFFERS
        </h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {offerData.map((offer, index) => (
          <Link href={offer.href} key={index} className="block group">
            <div className="overflow-hidden rounded-lg">
              <Image
                src={offer.imageSrc}
                alt={offer.altText}
                width={400}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default OfferBlocks;
