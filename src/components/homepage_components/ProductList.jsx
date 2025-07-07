import { Link } from "react-router-dom";
import Card from "./Card";

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
            <Card item={item} />
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
