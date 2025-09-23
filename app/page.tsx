// app/page.tsx
import CategoryGrid from "@/components/home/CategoryGrid/CategoryGrid";
import ConcernGrid from "@/components/home/ConcernGrid/ConcernGrid";
import HeroSlider from "@/components/home/HeroSlider/HeroSlider";
import OfferBlocks from "@/components/home/OfferBlocks/OfferBlocks";
import PromotionalBanner from "@/components/home/PromotionalBanner/PromotionalBanner";
import PromotionalGrid from "@/components/home/PromotionalGrid/PromotionalGrid";
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
    </>
  );
};

export default Home;
