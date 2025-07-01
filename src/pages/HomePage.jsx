import BestSellerSection from "../components/homepage_components/BestSellerSection";
import HeroSection from "../components/homepage_components/HeroSection";
import LatestArrivalSection from "../components/homepage_components/LatestArrivalsSection";

export default function Homepage() {
  return (
    <div className="container">
      <h1>HomePage</h1>
      <HeroSection />
      <BestSellerSection />
      <LatestArrivalSection />
    </div>
  );
}
