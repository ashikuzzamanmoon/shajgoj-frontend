// components/home/CategorySection/CategorySection.tsx
import Image from "next/image";
import Link from "next/link";
import categories from "@/data/categories.json";

const CategorySection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl tracking-[0.3em] text-gray-700">
            SHOP BY CATEGORY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {categories.map((category) => (
            <Link
              href={category.href}
              key={category.name}
              className="block group"
            >
              <div className="relative overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
