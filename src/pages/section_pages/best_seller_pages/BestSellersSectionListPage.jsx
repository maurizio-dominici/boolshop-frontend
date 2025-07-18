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
    <div className="page-container">
      <section className="py-5 bg-light min-vh-100">
        <div className="container">
          <h1 className="text-center fw-bold mb-3 display-5 ">
            Tutti i nostri Best Sellers
          </h1>
          {visualization === "grid" ? (
            <ProductList
              title="Tutti i nostri Best Sellers"
              products={bestSellers}
              loading={loading}
              error={error}
              // backLink="/"
              backLink={-1}
            />
          ) : (
            <ProductListVisualization
              products={bestSellers}
              link={"/bestsellers"}
              title={"I nostri Best Seller"}
              text={"Scoprili tutti"}
            />
          )}
        </div>

        <VisualizationButton />
      </section>
    </div>
  );
}
