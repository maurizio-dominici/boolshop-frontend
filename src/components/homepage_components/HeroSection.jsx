// IMPORTS
import { useState, useContext } from "react";
import { ParfumeAPIContext } from "../../context/ParfumesContext";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { loading, searchParfumes } = useContext(ParfumeAPIContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setErrorMsg("Inserisci una parola chiave per la ricerca.");
      return;
    }
    setErrorMsg("");
    searchParfumes(query);
    navigate(`/search?product_name=${encodeURIComponent(query)}`);
  };

  return (
    <section className="bg-primary text-white py-5">
      <div className="container text-center py-5">
        <h1 className="display-4 fw-bold mb-3">
          Cerca il tuo profumo preferito
        </h1>
        <p className="lead mb-4">Vivi l'essenza del lusso a ogni spruzzo.</p>

        <div className="row justify-content-center mt-5">
          <div className="col-md-8 col-lg-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Trova il profumo per te..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                to={"/search"}
                className="btn btn-light btn-lg"
                type="button"
                onClick={handleSearch}
              >
                Cerca
              </button>
            </div>
            {errorMsg && (
              <div className="alert alert-danger mt-3">{errorMsg}</div>
            )}
            {loading && (
              <div className="alert alert-info mt-3">
                Caricamento in corso...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
