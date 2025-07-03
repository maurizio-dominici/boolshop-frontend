import { useContext, useEffect } from "react";
import { ParfumeAPIContext } from "../../../context/ParfumesContext";
import ProductList from "../../../components/homepage_components/ProductList";

export default function LatestArrivalsSectionListPage() {
  const { recents, getRecentsParfumes, loading, error } =
    useContext(ParfumeAPIContext);
  useEffect(() => {
    getRecentsParfumes();
  }, []);

  return (
    <ProductList
      title="Tutti i nostri Ultimi Arrivi"
      products={recents}
      loading={loading}
      error={error}
      backLink="/"
    />
  );
}
