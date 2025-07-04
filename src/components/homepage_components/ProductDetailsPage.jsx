import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/parfumes/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Errore nel caricamento:", err));
  }, [id]);

  if (!product) return <p>Caricamento in corso...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="card-img-top"
          />
        ) : (
          <div className="bg-secondary text-white text-center py-5">
            Nessuna immagine disponibile
          </div>
        )}

        <div className="card-body">
          <h2>{product.name}</h2>
          <p>{product.description}</p>

          <p>
            <strong>Brand:</strong> {product.brand?.brand_name || "Sconosciuto"}
          </p>

          <p>
            <strong>Prezzo:</strong> €{product.price}
          </p>
          <p>
            <strong>Formato:</strong> {product.size_ml}ml
          </p>

          {product.discount?.discount_amount > 0 && (
            <p className="text-success">
              Sconto: -{product.discount.discount_amount}%
            </p>
          )}
        </div>

        <div className="card-footer d-flex justify-content-between">
          <Link to={-1} className="btn btn-outline-secondary">
            Torna indietro
          </Link>
          <Link to="/" className="btn btn-primary">
            Vai alla Home
          </Link>
        </div>
      </div>
    </div>
  );
}
