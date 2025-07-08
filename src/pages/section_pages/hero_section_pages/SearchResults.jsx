import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ParfumeAPIContext } from "../../../context/ParfumesContext";
import Card from "../../../components/homepage_components/Card";
import Filters from "../../../components/Filters";
import OrderBySelect from "../../../components/OrderBySelect";
import DiscountedSelect from "../../../components/DiscountedSelect";

export default function SearchResults() {
  const {
    parfumes,
    loading,
    error,
    searchParfumes,
    filters,
    updateFilters,
    validateFilters,
  } = useContext(ParfumeAPIContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [advancedTempFilters, setAdvancedTempFilters] = useState({
    productName: filters.productName,
    brandSlug: filters.brandSlug,
    gender: filters.gender,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    size: filters.size,
  });

  // Aggiorna la ricerca quando cambiano i filtri nelle dipendenze
  useEffect(() => {
    searchParfumes(filters);
  }, [filters]);

  // Applica i filtri solo quando premi il bottone
  const handleApplyFilters = () => {
    const fullFilters = {
      ...filters,
      ...advancedTempFilters,
    };

    const validationError = validateFilters(fullFilters);
    if (validationError) {
      alert(validationError);
      return;
    }

    updateFilters(fullFilters);
    searchParfumes(fullFilters);

    const newParams = new URLSearchParams(location.search);
    if (fullFilters.productName)
      newParams.set("product_name", fullFilters.productName);
    else newParams.delete("product_name");
    if (fullFilters.brandSlug)
      newParams.set("brand_slug", fullFilters.brandSlug);
    else newParams.delete("brand_slug");
    if (fullFilters.gender) newParams.set("gender", fullFilters.gender);
    else newParams.delete("gender");
    if (fullFilters.minPrice) newParams.set("min_price", fullFilters.minPrice);
    else newParams.delete("min_price");
    if (fullFilters.maxPrice) newParams.set("max_price", fullFilters.maxPrice);
    else newParams.delete("max_price");
    if (fullFilters.orderBy) newParams.set("order_by", fullFilters.orderBy);
    else newParams.delete("order_by");
    if (fullFilters.size) newParams.set("size", fullFilters.size);
    else newParams.delete("size");
    if (fullFilters.discounted)
      newParams.set("discounted", fullFilters.discounted);
    else newParams.delete("discounted");

    navigate(`/parfumes?${newParams.toString()}`);
  };
  // Cambia ordinamento quando selezioni una select
  const handleOrderByChange = (e) => {
    updateFilters({ orderBy: e.target.value });
  };
  // Seleziona prodotti se scontati o non
  const handleDiscountedChange = (e) => {
    updateFilters({ discounted: e.target.value });
  };
  // Gestisce il cambiamento dei filtri avanzati
  const handleFiltersChange = (newFilters) => {
    updateFilters(newFilters);
  };

  return (
    <div className="container mt-4">
      <div className="row mb-3 g-2">
        {/* Colonna Order By */}
        <div className="col-12 col-md-3">
          <OrderBySelect
            value={filters.orderBy}
            onChange={handleOrderByChange}
          />
        </div>

        {/* Colonna sconti */}
        <div className="col-12 col-md-3">
          <DiscountedSelect
            value={filters.discounted}
            onChange={handleDiscountedChange}
          />
        </div>
        <div className="col-12 col-md-9 d-flex align-items-end">
          <button
            className="btn btn-outline-secondary w-md-auto"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            {showFilters ? "Nascondi filtri" : "Mostra filtri avanzati"}
          </button>
        </div>
      </div>
      {/* Colonna filtri */}
      {showFilters && (
        <Filters
          filters={advancedTempFilters}
          onChange={(newFilters) =>
            setAdvancedTempFilters((prev) => ({ ...prev, ...newFilters }))
          }
          onApply={handleApplyFilters}
        />
      )}

      {/* Risultati della ricerca */}
      <h2 className="fw-bold mb-4">Risultati della ricerca</h2>
      {loading && <p>Caricamento...</p>}
      {error && <p>Errore nel caricamento dei profumi.</p>}
      {parfumes.length === 0 && !loading && (
        <p>Nessun profumo trovato per la tua ricerca.</p>
      )}
      <div className="row">
        {parfumes.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <Card item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
