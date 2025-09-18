// app/stories/[slug]/page.tsx
"use client";
import Image from "next/image";
import storiesData from "@/data/stories.json";
import allProductsData from "@/data/products.json";
import { Product, Story, ContentBlock } from "@/types";
import ProductCarousel from "@/components/home/shared/ProductCarousel/ProductCarousel";
import { useParams } from "next/navigation";

const allProducts: Product[] = allProductsData as Product[];

// --- কন্টেন্ট ব্লক রেন্ডার করার জন্য Helper কম্পোনেন্ট ---
const StoryContent = ({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case "image":
      return block.src ? (
        <Image
          src={block.src}
          alt="Story content image"
          width={1200}
          height={600}
          className="my-8 rounded-lg w-full h-auto"
        />
      ) : null;

    case "paragraph":
      return <p className="text-gray-700 leading-relaxed my-6">{block.text}</p>;

    case "subheading":
      return (
        <h2 className="text-2xl font-semibold text-gray-800 my-8 border-b pb-2">
          {block.text}
        </h2>
      );

    case "productCarousel":
      if (!block.productIds) return null;
      const carouselProducts = allProducts.filter((p) =>
        block.productIds!.includes(p.id)
      );
      return <ProductCarousel title="" products={carouselProducts} />;

    default:
      return null;
  }
};

const StoryPage = () => {
  const params = useParams();
  const { slug } = params;
  const story = (storiesData as Story[]).find(
    (s) => s.href === `/stories/${slug}`
  );

  if (!story) {
    return <div>Story not found!</div>;
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* showTitleInPage true হলেই শুধুমাত্র টাইটেল দেখানো হবে */}
        {story.showTitleInPage && (
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8">
            {story.title}
          </h1>
        )}

        {/* --- ডাইনামিক কনটেন্ট --- */}
        <div>
          {story.content?.map((block, index) => (
            <StoryContent key={index} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
