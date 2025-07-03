import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ParfumeAPIContext } from "../../../context/ParfumesContext";

export default function SearchResults() {
  const { parfumes, loading, error, searchParfumes } =
    useContext(ParfumeAPIContext);
  const location = useLocation();

  // Prendi la query dalla URL
  const params = new URLSearchParams(location.search);
  const query = params.get("query") || "";

  // Esegui la ricerca quando cambia la query
  useEffect(() => {
    if (query) {
      searchParfumes(query);
    }
  }, [query]);

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">
        Risultati della ricerca{query ? ` per "${query}"` : ""}
      </h2>
      {loading && <p>Caricamento...</p>}
      {error && <p>Errore nel caricamento dei profumi.</p>}
      {parfumes.length === 0 && !loading && (
        <p>Nessun profumo trovato per la tua ricerca.</p>
      )}
      <div className="row">
        {parfumes.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card h-100 text-center">
              <img
                src={item.image_url}
                alt={item.name}
                className="card-img-top"
                style={{ maxHeight: "200px", objectFit: "contain" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p>
                  <strong>Brand:</strong> {item.brand_name}
                </p>
                <p>
                  <strong>Prezzo:</strong> {item.price}€
                </p>
                <p>
                  <strong>Formato:</strong> {item.size_ml}ml
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
