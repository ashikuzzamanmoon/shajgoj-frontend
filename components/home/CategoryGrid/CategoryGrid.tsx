// components/home/CategoryGrid/CategoryGrid.tsx
import Image from "next/image";
import Link from "next/link";

const categoryItems = [
  {
    name: "Makeup",
    imageSrc: "/images/homepage/makeup.webp",
    href: "/category/makeup",
  },
  {
    name: "K-Beauty",
    imageSrc: "/images/homepage/k-beauty.webp",
    href: "/category/k-beauty",
  },
  {
    name: "Hair Care",
    imageSrc: "/images/homepage/hair-care.webp",
    href: "/category/hair",
  },
  {
    name: "Mom & Baby",
    imageSrc: "/images/homepage/mom-baby.webp",
    href: "/category/mom-and-baby",
  },
  {
    name: "Skin Care",
    imageSrc: "/images/homepage/skin-care.webp",
    href: "/category/skin",
  },
  {
    name: "Accessories",
    imageSrc: "/images/homepage/accessories.webp",
    href: "/category/accessories",
  },
  {
    name: "Undergarments",
    imageSrc: "/images/homepage/undergarments.webp",
    href: "/category/undergarments",
  },
  {
    name: "Fragrance",
    imageSrc: "/images/homepage/fragrance.webp",
    href: "/category/fragrance",
  },
];

const CategoryGrid = () => {
  return (
    <section className="container mx-auto my-8 px-4">
      <div className="text-center mb-4">
        <h3 className="text-sm font-semibold tracking-widest text-gray-500">
          SHOP BEAUTY PRODUCTS BY CATEGORY
        </h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categoryItems.map((item) => (
          <Link href={item.href} key={item.name} className="block group">
            <div className="overflow-hidden">
              <Image
                src={item.imageSrc}
                alt={item.name}
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

export default CategoryGrid;
