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
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        <h1 className="text-center fw-bold mb-4 text-danger display-5">
          Tutti i nostri Ultimi Arrivi
        </h1>
        <div className="d-flex justify-content-end mb-3">
          <VisualizationButton />
        </div>

        {visualization === "grid" ? (
          <ProductList
            title="Tutti i nostri Ultimi Arrivi"
            products={recents}
            loading={loading}
            error={error}
            // backLink="/"
            backLink={-1}
          />
        ) : (
          <ProductListVisualization
            products={recents}
            link={"/recents"}
            title={"I nostri Ultimi Arrivi"}
            text={"Scoprili tutti"}
          />
        )}
      </div>

      <VisualizationButton />
    </section>
  );
}
