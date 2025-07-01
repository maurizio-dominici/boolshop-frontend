import HeroSection from "../components/homepage_components/HeroSection";
import BestSellerSection from "../components/homepage_components/BestSellerSection";
import LatestArrivalsSection from "../components/homepage_components/LatestArrivalsSection";

export default function Homepage() {
  return (
    <div className="container">
      <h1>HomePage</h1>
      {/* Creazione Sezione Componenti della Homepage */}
      <HeroSection />
      <BestSellerSection />
      <LatestArrivalsSection />
    </div>
  );
}
