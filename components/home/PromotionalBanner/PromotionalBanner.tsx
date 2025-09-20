// components/home/PromotionalBanner/PromotionalBanner.tsx
import Image from 'next/image';
import Link from 'next/link';

interface PromotionalBannerProps {
  imageSrc: string;
  href: string;
  altText: string;
}

const PromotionalBanner = ({ imageSrc, href, altText }: PromotionalBannerProps) => {
  return (
 <section className="my-4">
      <div className="container mx-auto px-4">
        <Link href={href}>
          <div className="w-full relative rounded overflow-hidden" style={{ height: 'auto', minHeight: '50px' }}>
            <Image
              src={imageSrc}
              alt={altText}
              width={1200}
              height={400}
              className="w-full h-auto object-contain"
              style={{ height: 'auto' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default PromotionalBanner;