import HeroSection from "../components/homepage_components/HeroSection";
import BestSellersSection from "../components/homepage_components/BestSellersSection";
import LatestArrivalSection from "../components/homepage_components/LatestArrivalsSection";

export default function Homepage() {
  return (
    <div className="container">
      <h1>HomePage</h1>

      {/* Creazione Sezione Componenti della Homepage */}
      <HeroSection />
      <BestSellersSection />
      <LatestArrivalSection />
    </div>
  );
}
