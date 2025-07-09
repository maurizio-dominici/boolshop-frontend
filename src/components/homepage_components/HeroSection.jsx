// IMPORTS
import { useState, useContext } from "react";
import { ParfumeAPIContext } from "../../context/ParfumesContext";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  // const [brandId, setBrandId] = useState("");
  // const [gender, setGender] = useState("");
  // const [minPrice, setMinPrice] = useState("");
  // const [maxPrice, setMaxPrice] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  // const { loading, searchParfumes } = useContext(ParfumeAPIContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setErrorMsg("Inserisci una parola chiave per la ricerca.");
      return;
    }
    setErrorMsg("");
    const params = new URLSearchParams();
    params.append("product_name", query);
    // if (brandId) params.append("brand_id", brandId);
    navigate(`/parfumes?${params.toString()}`);
  };

  return (
    <section className="hero-section hero-area text-white py-2">
      <div className="container hero-content text-center py-4">
        <h1 className="display-4 fw-bold mb-3 hero-title">
          Cerca il tuo profumo preferito
        </h1>
        <p className="lead mb-4 fs-4 hero-subtitle">
          Vivi l'essenza del lusso a ogni spruzzo.
        </p>
        <form onSubmit={handleSearch}>
          <div className="input-group mb-2 search-input-group">
            <input
              type="text"
              className="form-control form-control-lg search-input"
              placeholder="Trova il profumo per te..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {errorMsg && (
            <div className="alert alert-danger mb-2 search-error">
              {errorMsg}
            </div>
          )}
          <button
            className="btn btn-light btn-lg w-100 mt-3 search-button"
            type="submit"
          >
            Cerca
          </button>
        </form>
      </div>
    </section>
  );
}
