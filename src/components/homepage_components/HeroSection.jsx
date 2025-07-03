// IMPORTS
import { useState, useContext } from "react";
import { ParfumeAPIContext } from "../../context/ParfumesContext";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const [brandId, setBrandId] = useState("");
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
    if (brandId) params.append("brand_id", brandId);
    navigate(`/parfumes?${params.toString()}`);
  };

  return (
    <section className="bg-primary text-white py-5">
      <div className="container text-center py-5">
        <h1 className="display-4 fw-bold mb-3">
          Cerca il tuo profumo preferito
        </h1>
        <p className="lead mb-4">Vivi l'essenza del lusso a ogni spruzzo.</p>
        <form onSubmit={handleSearch}>
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Trova il profumo per te..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="input-group mb-2">
            <select
              className="form-select"
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
            >
              <option value="">Tutte le marche</option>
              <option value="1">Dior</option>
              <option value="2">Chanel</option>
              {/* aggiungere altre marche */}
            </select>
          </div>
          <button className="btn btn-light btn-lg w-100" type="submit">
            Cerca
          </button>
        </form>
      </div>
    </section>
  );
}
