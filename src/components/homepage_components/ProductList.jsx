import { Link } from "react-router-dom";
import Card from "./Card";

export default function ProductList({ products, loading, error, backLink }) {
  return (
    <div className="container mt-4">
      {loading && <p>Caricamento...</p>}
      {error && <p>Errore nel caricamento dei profumi.</p>}

      {backLink && (
        <div className="mb-3">
          <Link to={backLink} className="btn btn-secondary">
            Torna indietro
          </Link>
        </div>
      )}

      <div className="row">
        {products.map((item) => (
          <div key={item.id} className="col-md-6 col-xl-4 mb-3">
            <Card item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
