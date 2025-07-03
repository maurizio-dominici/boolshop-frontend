import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ParfumeAPIContext } from "../../../context/ParfumesContext";

export default function SearchResults() {
  const { parfumes, loading, error, searchParfumes } =
    useContext(ParfumeAPIContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Leggi i parametri dalla URL
  const params = new URLSearchParams(location.search);
  const [productName] = useState(params.get("product_name") || "");
  const [gender, setGender] = useState(params.get("gender") || "");
  const [minPrice, setMinPrice] = useState(params.get("min_price") || "");
  const [maxPrice, setMaxPrice] = useState(params.get("max_price") || "");

  // Stati temporanei per i filtri
  const [tempGender, setTempGender] = useState(gender);
  const [tempMinPrice, setTempMinPrice] = useState(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);

  // Aggiorna la ricerca quando cambiano i filtri effettivi
  useEffect(() => {
    searchParfumes(productName, "", gender, minPrice, maxPrice);
  }, [productName, gender, minPrice, maxPrice]);

  // Applica i filtri solo quando premi il bottone
  const handleApplyFilters = () => {
    const newParams = new URLSearchParams(location.search);
    if (tempGender) newParams.set("gender", tempGender);
    else newParams.delete("gender");
    if (tempMinPrice) newParams.set("min_price", tempMinPrice);
    else newParams.delete("min_price");
    if (tempMaxPrice) newParams.set("max_price", tempMaxPrice);
    else newParams.delete("max_price");

    navigate(`/parfumes?${newParams.toString()}`);
    setGender(tempGender);
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
  };

  return (
    <div className="container mt-4">
      {/* Filtri */}
      <div className="row mb-3">
        <div className="col">
          <select
            className="form-select"
            value={tempGender}
            onChange={(e) => setTempGender(e.target.value)}
          >
            <option value="">Tutti i generi</option>
            <option value="male">Uomo</option>
            <option value="female">Donna</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>
        <div className="col">
          <input
            type="number"
            className="form-control"
            placeholder="Prezzo minimo"
            value={tempMinPrice}
            onChange={(e) => setTempMinPrice(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="number"
            className="form-control"
            placeholder="Prezzo massimo"
            value={tempMaxPrice}
            onChange={(e) => setTempMaxPrice(e.target.value)}
          />
        </div>
        <div className="col">
          <button
            className="btn btn-primary w-100"
            onClick={handleApplyFilters}
          >
            Applica filtri
          </button>
        </div>
      </div>
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
                  <strong>Brand:</strong> {item.brand.brand_name}
                </p>
                <p>
                  <strong>Gender</strong> {item.gender}
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
