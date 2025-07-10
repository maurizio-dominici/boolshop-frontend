import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ParfumeAPIContext } from "../../../context/ParfumesContext";
import Card from "../../../components/homepage_components/Card";
import ProductListVisualization from "../../../components/ui/ProductListVisualization";
import VisualizationButton from "../../../components/ui/VisualizationButton";
import { useTopMessage } from "../../../context/TopMessageContext";
export default function SearchResults() {
  const { showTopMessage } = useTopMessage();
  const { parfumes, loading, error, searchParfumes, visualization } =
    useContext(ParfumeAPIContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Leggi i parametri dalla URL
  const params = new URLSearchParams(location.search);
  const [productName, setProductName] = useState(
    params.get("product_name") || ""
  );
  const [brandSlug, setBrandSlug] = useState(params.get("brand_slug") || "");
  const [gender, setGender] = useState(params.get("gender") || "");
  const [minPrice, setMinPrice] = useState(params.get("min_price") || "");
  const [maxPrice, setMaxPrice] = useState(params.get("max_price") || "");
  const [orderBy, setOrderBy] = useState(params.get("order_by") || "");
  const [size, setSize] = useState(params.get("size") || "");
  const [discounted, setDiscounted] = useState(params.get("discounted") || "");
  const [showFilters, setShowFilters] = useState(false);

  // Stati temporanei per i filtri
  const [tempProductName, setTempProductName] = useState(productName);
  const [tempBrandSlug, setTempBrandSlug] = useState(brandSlug);
  const [tempGender, setTempGender] = useState(gender);
  const [tempMinPrice, setTempMinPrice] = useState(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);
  const [tempOrderBy, setTempOrderBy] = useState(orderBy);
  const [tempSize, setTempSize] = useState(size);
  const [tempDiscounted, setTempDiscounted] = useState(discounted);

  // Aggiorna la ricerca quando cambiano i filtri effettivi
  useEffect(() => {
    searchParfumes(
      productName,
      brandSlug,
      gender,
      minPrice,
      maxPrice,
      orderBy,
      size,
      discounted
    );
  }, [
    productName,
    brandSlug,
    gender,
    minPrice,
    maxPrice,
    orderBy,
    size,
    discounted,
  ]);

  // Applica i filtri solo quando premi il bottone
  const handleApplyFilters = () => {
    // Validazione del filtro per price
    if (tempMinPrice && isNaN(tempMinPrice)) {
      showTopMessage("Il prezzo minimo deve essere un numero.", "danger");
      return;
    }

    if (tempMinPrice && Number(tempMinPrice) < 0) {
      showTopMessage("Il prezzo minimo non può essere minore di 0.", "danger");
      return;
    }

    if (tempMinPrice && Number(tempMinPrice) > 1000) {
      showTopMessage(
        "Il prezzo minimo non può essere maggiore di 1000.",
        "danger"
      );
      return;
    }

    if (tempMaxPrice && isNaN(tempMaxPrice)) {
      showTopMessage("Il prezzo massimo deve essere un numero.", "danger");
      return;
    }

    if (tempMaxPrice && Number(tempMaxPrice) < 0) {
      showTopMessage("Il prezzo massimo non può essere minore di 0.", "danger");
      return;
    }

    if (tempMaxPrice && Number(tempMaxPrice) > 1000) {
      showTopMessage(
        "Il prezzo massimo non può essere maggiore di 1000.",
        "danger"
      );
      return;
    }

    if (
      tempMinPrice &&
      tempMaxPrice &&
      parseFloat(tempMinPrice) > parseFloat(tempMaxPrice)
    ) {
      showTopMessage(
        "Il prezzo minimo non può essere maggiore del prezzo massimo.",
        "danger"
      );
      return;
    }

    // Validazione del filtro nome del prodotto
    if (tempProductName && tempProductName.length > 50) {
      showTopMessage(
        "Il nome del prodotto non può essere più lungo di 50 caratteri.",
        "danger"
      );
      return;
    }

    // Validazione del filtro brand
    if (
      tempBrandSlug &&
      !["dior", "chanel", "calvin_klein", "giorgio_armani"].includes(
        tempBrandSlug
      )
    ) {
      showTopMessage(
        "Marca non valida. Scegli tra una di queste: Dior, Chanel, Calvin Klein, Giorgio Armani, Maison Lumière, Nordica Scents.",
        "danger"
      );
      return;
    }

    // Validazione del filtro size
    if (tempSize && !["xs", "s", "m", "l", "xl", "xxl"].includes(tempSize)) {
      showTopMessage(
        "Formato non valido. Scegli tra xs, s, m, l, xl, xxl.",
        "danger"
      );
      return;
    }

    // Validazione del filtro genere
    if (tempGender && !["male", "female", "unisex"].includes(tempGender)) {
      showTopMessage(
        "Genere non valido. Scegli tra Uomo, Donna o Unisex.",
        "danger"
      );
      return;
    }

    // validazione del filtro per ordinamento
    const validOrderBy = [
      "",
      "products.price ASC",
      "products.price DESC",
      "products.name ASC",
      "products.name DESC",
      "products.size_ml ASC",
      "products.size_ml DESC",
    ];
    if (tempOrderBy && !validOrderBy.includes(tempOrderBy)) {
      showTopMessage("Ordinamento non valido.", "danger");
      return;
    }
    // Aggiorna parametri della URL in base ai filtri selezionati
    const newParams = new URLSearchParams(location.search);
    if (tempProductName) newParams.set("product_name", tempProductName);
    else newParams.delete("product_name");
    if (tempBrandSlug) newParams.set("brand_slug", tempBrandSlug);
    else newParams.delete("brand_slug");
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
    if (tempDiscounted) newParams.set("discounted", tempDiscounted);
    else newParams.delete("discounted");

    // Naviga alla nuova URL con i parametri aggiornati
    navigate(`/parfumes?${newParams.toString()}`);
    setProductName(tempProductName);
    setBrandSlug(tempBrandSlug);
    setGender(tempGender);
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
    setOrderBy(tempOrderBy);
    setSize(tempSize);
    setDiscounted(tempDiscounted);
  };
  // Cambia ordinamento quando selezioni una select
  const handleOrderByChange = (e) => {
    setTempOrderBy(e.target.value);
    const newParams = new URLSearchParams(location.search);
    if (e.target.value) newParams.set("order_by", e.target.value);
    else newParams.delete("order_by");
    navigate(`/parfumes?${newParams.toString()}`);
    setOrderBy(e.target.value);
  };

  return (
    <div className="page-container">
      <div className="container mt-4">
        <div className="row mb-3 g-2 align-items-end">
          <div className="col-12 col-md-3">
            <label htmlFor="order-by" className="form-label fw-semibold">
              Ordina per
            </label>
            <select
              id="order-by"
              className="form-select"
              value={tempOrderBy}
              onChange={handleOrderByChange}
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

          <div className="col-12 col-md-3">
            <label htmlFor="product-name" className="form-label fw-semibold">
              Nome prodotto
            </label>
            <input
              id="product-name"
              type="text"
              className="form-control"
              placeholder="Nome prodotto"
              value={tempProductName}
              onChange={(e) => setTempProductName(e.target.value)}
            />
          </div>
          <div className="col">
            <button
              className="btn btn-primary mt-4"
              onClick={handleApplyFilters}
            >
              Applica filtri
            </button>
          </div>

          <div className="col-12 col-md-9 d-flex align-items-end">
            <button
              className="btn btn-secondary w-md-auto"
              onClick={() => setShowFilters((prev) => !prev)}
            >
              {showFilters ? "Nascondi filtri" : "Mostra filtri avanzati"}
            </button>
          </div>
        </div>

        {/* Filtri raggruppati in un menu a tendina */}
        {showFilters && (
          <div className="card card-body mb-3">
            <div className="row row-cols-1 row-cols-md-3 g-3">
              {/* filtro discounted */}
              <div className="col">
                <label htmlFor="discounted" className="form-label fw-semibold">
                  Sconto
                </label>
                <select
                  id="discounted"
                  className="form-select"
                  value={tempDiscounted}
                  onChange={(e) => setTempDiscounted(e.target.value)}
                >
                  <option value="">Tutti</option>
                  <option value="true">Scontati</option>
                  <option value="false">Non Scontati</option>
                </select>
              </div>

              {/* Filtro per size prodotto */}
              <div className="col">
                <label htmlFor="brand-size" className="form-label fw-semibold">
                  Size
                </label>
                <select
                  id="brand-size"
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

              {/* Filtro per marca */}
              <div className="col">
                <label htmlFor="brand-slug" className="form-label fw-semibold">
                  Marca
                </label>
                <select
                  id="brand-slug"
                  className="form-select"
                  value={tempBrandSlug}
                  onChange={(e) => setTempBrandSlug(e.target.value)}
                >
                  <option value="">Tutte le marche</option>
                  <option value="dior">Dior</option>
                  <option value="chanel">Chanel</option>
                  <option value="calvin_klein">Calvin Klein</option>
                  <option value="giorgio_armani">Giorgio Armani</option>
                </select>
              </div>

              {/* Filtro per genere  */}
              <div className="col">
                <label htmlFor="gender" className="form-label fw-semibold">
                  Genere
                </label>
                <select
                  id="gender"
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

              {/* Filtro per prezzo minimo */}
              <div className="col">
                <label htmlFor="min-price" className="form-label fw-semibold">
                  Prezzo minimo
                </label>
                <input
                  id="min-price"
                  type="number"
                  className="form-control"
                  placeholder="Prezzo minimo"
                  value={tempMinPrice}
                  onChange={(e) => setTempMinPrice(e.target.value)}
                />
              </div>

              {/* Filtro per prezzo massimo */}
              <div className="col">
                <label htmlFor="max-price" className="form-label fw-semibold">
                  Prezzo massimo
                </label>
                <input
                  id="max-price"
                  type="number"
                  className="form-control"
                  placeholder="Prezzo massimo"
                  value={tempMaxPrice}
                  onChange={(e) => setTempMaxPrice(e.target.value)}
                />
              </div>

              {/* Bottone per applicare i filtri */}
              <div className="col">
                <button
                  className="btn btn-primary w-100 mt-4"
                  onClick={handleApplyFilters}
                >
                  Applica filtri
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Risultati della ricerca */}
        <h2 className="fw-bold mb-4">Risultati della ricerca</h2>
        {loading && <p>Caricamento...</p>}
        {error && <p>Errore nel caricamento dei profumi.</p>}
        {parfumes.length === 0 && !loading && (
          <p>Nessun profumo trovato per la tua ricerca.</p>
        )}
        <div className="row">
          {visualization === "grid" ? (
            parfumes.map((item) => (
              <div key={item.id} className="col-md-6 col-xl-4 mb-3">
                <Card item={item} />
              </div>
            ))
          ) : (
            <ProductListVisualization products={parfumes} isHomePage={false} />
          )}
        </div>

        <VisualizationButton />
      </div>
    </div>
  );
}
