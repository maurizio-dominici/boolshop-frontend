import { Link } from "react-router-dom";

export default function ProductList({
  title,
  products,
  loading,
  error,
  backLink,
}) {
  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">{title}</h2>

      {loading && <p>Caricamento...</p>}
      {error && <p>Errore nel caricamento dei profumi.</p>}

      <div className="row">
        {products.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card h-100 text-center">
              <img
                src={item.image_url || item.image}
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
                  <strong>Formato:</strong> {item.size || item.size_ml}ml
                </p>
                <Link to={`/product/${item.id}`}>
                  <button className="btn btn-outline-primary">
                    Dettagli prodotto
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {backLink && (
        <div className="mt-4">
          <Link to={backLink} className="btn btn-secondary">
            Torna indietro
          </Link>
        </div>
      )}
    </div>
  );
}
