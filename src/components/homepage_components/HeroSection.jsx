// IMPORTS
import { useState } from "react";

export default function HeroSection() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Ricerca inviata:", query);
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
      </div>
    </section>
  );
}
