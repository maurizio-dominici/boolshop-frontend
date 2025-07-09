import HeroSection from "../components/homepage_components/HeroSection";
import BestSellersSection from "../components/homepage_components/BestSellersSection";
import LatestArrivalSection from "../components/homepage_components/LatestArrivalsSection";
import ProductListVisualization from "../components/ui/ProductListVisualization";
import VisualizationButton from ".../../../components/ui/VisualizationButton";

import { useContext, useEffect } from "react";
import { ParfumeAPIContext } from "../context/ParfumesContext";

export default function Homepage() {
  const {
    bestSellers,
    recents,
    getBestSellersParfumes,
    getRecentsParfumes,
    visualization,
  } = useContext(ParfumeAPIContext);

  useEffect(() => {
    getBestSellersParfumes();
    getRecentsParfumes();
  }, []);

  return (
    <div className="container my-3">
      {/* Creazione Sezione Componenti della Homepage */}
      <HeroSection />

      {visualization === "grid" ? (
        <BestSellersSection />
      ) : (
        <ProductListVisualization
          products={bestSellers}
          isHomepage={true}
          link={"/bestsellers"}
          title={"I nostri Best Seller"}
          text={"Scoprili tutti"}
        />
      )}

      {visualization === "grid" ? (
        <LatestArrivalSection />
      ) : (
        <ProductListVisualization
          products={recents}
          isHomepage={true}
          link={"/recents"}
          title={"I nostri Ultimi Arrivi"}
          text={"Scoprili tutti"}
        />
      )}

      <VisualizationButton />
    </div>
  );
}
