// components/home/ConcernGrid/ConcernGrid.tsx
import Image from "next/image";
import Link from "next/link";

const concernItems = [
  {
    name: "Acne Treatment",
    imageSrc: "/images/homepage/acne.webp",
    href: "/category/acne",
  },
  {
    name: "Anti Aging",
    imageSrc: "/images/homepage/anti-aging.webp",
    href: "/category/anti-aging",
  },
  {
    name: "Dandruff Solution",
    imageSrc: "/images/homepage/dandruff.webp",
    href: "/category/dandruff",
  },
  {
    name: "Dry Skin Treatment",
    imageSrc: "/images/homepage/dry-skin.webp",
    href: "/category/dry-skin",
  },
  {
    name: "Hair Fall Treatment",
    imageSrc: "/images/homepage/hair-fall.webp",
    href: "/category/hairfall",
  },
  {
    name: "Oil Control",
    imageSrc: "/images/homepage/oil-control.webp",
    href: "/category/oil-control",
  },
  {
    name: "Pore Care",
    imageSrc: "/images/homepage/pore-care.webp",
    href: "/category/pore-care",
  },
  {
    name: "Spot Treatment",
    imageSrc: "/images/homepage/spot-treatment.webp",
    href: "/category/spot-treatment",
  },
  {
    name: "Hair Thinning Solution",
    imageSrc: "/images/homepage/hair-thinning.webp",
    href: "/category/hair-thinning",
  },
  {
    name: "Sun Burn",
    imageSrc: "/images/homepage/sun-burn.webp",
    href: "/category/sun-burn",
  },
];

const ConcernGrid = () => {
  return (
    <section className="container mx-auto my-10 px-4">
      <div className="text-center mb-8">
        <h3 className="text-sm font-semibold tracking-widest text-gray-500">
          SHOP BY CONCERN
        </h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {concernItems.map((item) => (
          <Link href={item.href} key={item.name} className="block group">
            <div className="overflow-hidden">
              <Image
                src={item.imageSrc}
                alt={item.name}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ConcernGrid;
