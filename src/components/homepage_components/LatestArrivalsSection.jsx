import { useEffect, useState } from "react";
import axios from "axios";

export default function LatestArrivals() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products?sort=latest")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Errore nel caricamento prodotti:", err));
  }, []);

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="mb-4 text-center fw-bold">Ultimi Arrivi</h2>
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow">
                <img
                  src={`/img/${product.image_url}`}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="fw-bold">{product.price} €</p>
                  <button className="btn btn-primary">
                    Aggiungi al carrello
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
