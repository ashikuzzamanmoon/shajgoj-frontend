// app/page.tsx
import AboutSection from "@/components/home/AboutSection/AboutSection";
import CategorySection from "@/components/home/CategorySection/CategorySection";
import FeaturedBrands from "@/components/home/FeaturedBrands/FeaturedBrands";
import GenderSection from "@/components/home/GenderSection/GenderSection";
import HeroSlider from "@/components/home/HeroSlider/HeroSlider";
import ProductCarousel from "@/components/home/shared/ProductCarousel/ProductCarousel";
import StoriesSection from "@/components/home/StoriesSection/StoriesSection";
import allProducts from "@/data/products.json";

const Home = () => {

  const newArrivalProducts = allProducts.filter(
    (product) => product.isNewArrival
  );
  return (
    <>
      <HeroSlider />
      <FeaturedBrands />
      <CategorySection />
      <GenderSection />
      <StoriesSection />
      <AboutSection />
    </>
  );
};

export default Home;
