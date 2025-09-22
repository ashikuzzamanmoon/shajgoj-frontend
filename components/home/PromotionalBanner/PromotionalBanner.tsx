// components/home/PromotionalBanner/PromotionalBanner.tsx
import Image from "next/image";
import Link from "next/link";

const PromotionalBanner = () => {
  const imageSrc = "/images/banners/ponds-banner.webp";
  const href = "/category/ponds-beauty-deals";
  const altText = "Pond's Beauty Deals";
  return (
    <section className="my-4">
      <div className="container mx-auto px-4">
        <Link href={href}>
          <div
            className="w-full relative rounded overflow-hidden"
            style={{ height: "auto", minHeight: "50px" }}
          >
            <Image
              src={imageSrc}
              alt={altText}
              width={1200}
              height={400}
              className="w-full h-auto object-contain"
              style={{ height: "auto" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default PromotionalBanner;
