// IMPORTS
import { useState } from "react";
import axios from "axios";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    setLoading(true);

    axios
      .get("http://localhost:3000/parfumes")
      .then((response) => {
        const filtered = response.data.filter(
          (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.brand_name.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Errore durante la ricerca:", error);
        setLoading(false);
      });
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
                className="btn btn-light btn-lg"
                type="button"
                onClick={handleSearch}
              >
                Cerca
              </button>
            </div>
          </div>
        </div>

        {/* Risultati da inserire in un componente a parte passando results*/}
        <div className="row mt-5">
          {loading && <p className="text-white">Caricamento profumi...</p>}
          {!loading && results.length === 0 && (
            <p className="text-white">Nessun profumo trovato.</p>
          )}
          {!loading &&
            results.map((perfume) => (
              <div className="col-md-4 mb-4" key={perfume.id}>
                <div className="card h-100">
                  {perfume.image_url ? (
                    <img
                      src={perfume.image_url}
                      className="card-img-top"
                      alt={perfume.name}
                    />
                  ) : (
                    <div className="bg-secondary text-white py-5">
                      <p className="mb-0">Nessuna immagine</p>
                    </div>
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{perfume.name}</h5>
                    <p className="card-text">{perfume.description}</p>
                    <p className="fw-bold mb-1">Brand: {perfume.brand_name}</p>
                    <p className="mb-1">
                      Prezzo: €{perfume.price}
                      {perfume.discount_amount > 0 && (
                        <span className="text-success">
                          (-{perfume.discount_amount}%)
                        </span>
                      )}
                    </p>
                    <p className="mb-0">Formato: {perfume.size_ml}ml</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
