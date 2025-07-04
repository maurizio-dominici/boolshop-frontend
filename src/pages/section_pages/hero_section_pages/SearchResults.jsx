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
  const [productName, setProductName] = useState(
    params.get("product_name") || ""
  );
  const [brandId, setBrandId] = useState(params.get("brand_id") || "");
  const [gender, setGender] = useState(params.get("gender") || "");
  const [minPrice, setMinPrice] = useState(params.get("min_price") || "");
  const [maxPrice, setMaxPrice] = useState(params.get("max_price") || "");
  const [orderBy, setOrderBy] = useState(params.get("order_by") || "");
  const [size, setSize] = useState(params.get("size") || "");

  // Stati temporanei per i filtri
  const [tempProductName, setTempProductName] = useState(productName);
  const [tempBrandId, setTempBrandId] = useState(brandId);
  const [tempGender, setTempGender] = useState(gender);
  const [tempMinPrice, setTempMinPrice] = useState(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);
  const [tempOrderBy, setTempOrderBy] = useState(orderBy);
  const [tempSize, setTempSize] = useState(size);

  // Aggiorna la ricerca quando cambiano i filtri effettivi
  useEffect(() => {
    searchParfumes(
      productName,
      brandId,
      gender,
      minPrice,
      maxPrice,
      orderBy,
      size
    );
  }, [productName, brandId, gender, minPrice, maxPrice, orderBy, size]);

  // Applica i filtri solo quando premi il bottone
  const handleApplyFilters = () => {
    const newParams = new URLSearchParams(location.search);
    if (tempProductName) newParams.set("product_name", tempProductName);
    else newParams.delete("product_name");
    if (tempBrandId) newParams.set("brand_id", tempBrandId);
    else newParams.delete("brand_id");
    if (tempGender) newParams.set("gender", tempGender);
    else newParams.delete("gender");
    if (tempMinPrice) newParams.set("min_price", tempMinPrice);
    else newParams.delete("min_price");
    if (tempMaxPrice) newParams.set("max_price", tempMaxPrice);
    else newParams.delete("max_price");
    if (tempOrderBy) newParams.set("order_by", tempOrderBy);
    else newParams.delete("order_by");
    if (tempSize) newParams.set("size", tempSize);
    else newParams.delete("size");

    navigate(`/parfumes?${newParams.toString()}`);
    setProductName(tempProductName);
    setBrandId(tempBrandId);
    setGender(tempGender);
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
    setOrderBy(tempOrderBy);
    setSize(tempSize);
  };

  return (
    <div className="container mt-4">
      {/* Filtri */}
      <div className="row mb-3">
        <div className="col">
          <select
            className="form-select"
            value={tempOrderBy}
            onChange={(e) => setTempOrderBy(e.target.value)}
          >
            <option value="">Ordina per...</option>
            <option value="products.price ASC">Prezzo crescente</option>
            <option value="products.price DESC">Prezzo decrescente</option>
            <option value="products.name ASC">Nome A-Z</option>
            <option value="products.name DESC">Nome Z-A</option>
            <option value="products.size_ml ASC">Min Size</option>
            <option value="products.size_ml DESC">Max Size</option>
          </select>
        </div>

        <div className="col">
          <select
            className="form-select"
            value={tempSize}
            onChange={(e) => setTempSize(e.target.value)}
          >
            <option value="">Filtra per Size</option>
            <option value="xs">xs</option>
            <option value="s">s</option>
            <option value="m">m</option>
            <option value="l">l</option>
            <option value="xl">xl</option>
            <option value="xxl">xxl</option>
          </select>
        </div>

        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Nome prodotto"
            value={tempProductName}
            onChange={(e) => setTempProductName(e.target.value)}
          />
        </div>
        <div className="col">
          <select
            className="form-select"
            value={tempBrandId}
            onChange={(e) => setTempBrandId(e.target.value)}
          >
            <option value="">Tutte le marche</option>
            <option value="1">Dior</option>
            <option value="2">Chanel</option>
            {/* aggiungere altre marche */}
          </select>
        </div>
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
