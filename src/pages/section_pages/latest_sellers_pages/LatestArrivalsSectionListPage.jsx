import { useContext, useEffect } from "react";
import { ParfumeAPIContext } from "../../../context/ParfumesContext";
import ProductList from "../../../components/homepage_components/ProductList";
import ProductListVisualization from "../../../components/ui/ProductListVisualization";
import VisualizationButton from "../../../components/ui/VisualizationButton";

export default function LatestArrivalsSectionListPage() {
  const { recents, visualization, getRecentsParfumes, loading, error } =
    useContext(ParfumeAPIContext);
  useEffect(() => {
    getRecentsParfumes();
  }, []);

  return (
    <>
        {
          visualization === "grid" ? 
            <ProductList
              title="Tutti i nostri Ultimi Arrivi"
              products={recents}
              loading={loading}
              error={error}
              backLink="/"
            />
          : 
            <ProductListVisualization 
              products={recents} 
              link={"/recents"} 
              title={"I nostri Ultimi Arrivi"} 
              text={"Scoprili tutti"} 
            />
        }


        <VisualizationButton />
    </>
  );
}
