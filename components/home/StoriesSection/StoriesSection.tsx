// components/home/StoriesSection/StoriesSection.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import storiesData from "@/data/stories.json";

const StoriesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl tracking-[0.3em] text-gray-700">
            SUNDORA STORIES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {storiesData.map((story) => (
            <Link href={story.href} key={story.id} className="block group">
              <div className="relative overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                {/* Image */}
                <Image
                  src={story.image}
                  alt={story.title}
                  width={400}
                  height={400}
                  className="object-cover w-full h-96 transition-transform duration-500 group-hover:scale-105"
                />
                {/* semi transparent overlay for content */}
                <div className="absolute bottom-0 w-full p-4 bg-white/80 backdrop-blur-xs text-center">
                  <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
                    {story.title}
                  </h3>
                  {story.description && (
                    <p className="text-xs text-gray-600 mt-1">{story.description}</p>
                  )}
                  <div className="flex items-center justify-center mt-2 text-sm font-bold text-gray-900 group-hover:text-[#f37920] transition-colors">
                    <span>READ NOW</span>
                    <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;