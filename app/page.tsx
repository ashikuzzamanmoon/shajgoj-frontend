// app/page.tsx
import AboutSection from "@/components/home/AboutSection/AboutSection";
import CategoryGrid from "@/components/home/CategoryGrid/CategoryGrid";
import CategorySection from "@/components/home/CategorySection/CategorySection";
import ConcernGrid from "@/components/home/ConcernGrid/ConcernGrid";
import FeaturedBrands from "@/components/home/FeaturedBrands/FeaturedBrands";
import GenderSection from "@/components/home/GenderSection/GenderSection";
import HeroSlider from "@/components/home/HeroSlider/HeroSlider";
import OfferBlocks from "@/components/home/OfferBlocks/OfferBlocks";
import PromotionalBanner from "@/components/home/PromotionalBanner/PromotionalBanner";
import PromotionalGrid from "@/components/home/PromotionalGrid/PromotionalGrid";
import StoriesSection from "@/components/home/StoriesSection/StoriesSection";
import TopBrandsOffers from "@/components/home/TopBrandsOffers/TopBrandsOffers";

const Home = () => {
  return (
    <>
      <HeroSlider />
      <PromotionalBanner />
      <PromotionalGrid />
      <TopBrandsOffers />
      <OfferBlocks />
      <CategoryGrid />
      <ConcernGrid />

      <FeaturedBrands />
      <CategorySection />
      <GenderSection />
      <StoriesSection />
      <AboutSection />
    </>
  );
};

export default Home;
