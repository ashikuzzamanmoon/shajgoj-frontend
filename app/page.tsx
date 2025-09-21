// app/page.tsx
import AboutSection from "@/components/home/AboutSection/AboutSection";
import CategorySection from "@/components/home/CategorySection/CategorySection";
import FeaturedBrands from "@/components/home/FeaturedBrands/FeaturedBrands";
import GenderSection from "@/components/home/GenderSection/GenderSection";
import HeroSlider from "@/components/home/HeroSlider/HeroSlider";
import PromotionalBanner from "@/components/home/PromotionalBanner/PromotionalBanner";
import PromotionalGrid from "@/components/home/PromotionalGrid/PromotionalGrid";
import StoriesSection from "@/components/home/StoriesSection/StoriesSection";
import TopBrandsOffers from "@/components/home/TopBrandsOffers/TopBrandsOffers";


const Home = () => {

  return (
    <>
      <HeroSlider />
      <PromotionalBanner 
        imageSrc="/images/banners/ponds-banner.webp" 
        href="/category/ponds-beauty-deals"
        altText="Pond's Beauty Deals"
      />
      <PromotionalGrid />
      <TopBrandsOffers />

      <FeaturedBrands />
      <CategorySection />
      <GenderSection />
      <StoriesSection />
      <AboutSection />
    </>
  );
};

export default Home;
