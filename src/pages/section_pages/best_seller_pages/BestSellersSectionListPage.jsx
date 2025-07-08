import { useContext, useEffect } from "react";
import { ParfumeAPIContext } from "../../../context/ParfumesContext";
import ProductList from "../../../components/homepage_components/ProductList";
import ProductListVisualization from "../../../components/ui/ProductListVisualization";
import VisualizationButton from "../../../components/ui/VisualizationButton";

export default function BestSellersSectionListPage() {
  const { bestSellers, visualization, getBestSellersParfumes, loading, error } =
    useContext(ParfumeAPIContext);
  console.debug("bestSellers", bestSellers);

  useEffect(() => {
    getBestSellersParfumes();
  }, []);

  return (

    <>
        {
          visualization === "grid" ? 
            <ProductList
              title="Tutti i nostri Best Sellers"
              products={bestSellers}
              loading={loading}
              error={error}
              // backLink="/"
              backLink={-1}
            />
          : 
            <ProductListVisualization 
              products={bestSellers} 
              link={"/bestsellers"} 
              title={"I nostri Best Seller"} 
              text={"Scoprili tutti"} 
            />
        }

        <VisualizationButton />
    </>
  );
}
