import { useContext, useEffect } from "react";
import { ParfumeAPIContext } from "../../../context/ParfumesContext";
import ProductList from "../../../components/homepage_components/ProductList";

export default function BestSellersSectionListPage() {
  const { bestSellers, getBestSellersParfumes, loading, error } =
    useContext(ParfumeAPIContext);
  console.debug("bestSellers", bestSellers);

  useEffect(() => {
    getBestSellersParfumes();
  }, []);

  return (
    <ProductList
      title="Tutti i nostri Ultimi Arrivi"
      products={bestSellers}
      loading={loading}
      error={error}
      backLink="/"
    />
  );
}
