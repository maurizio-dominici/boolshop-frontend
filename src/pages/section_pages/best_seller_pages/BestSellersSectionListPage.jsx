// IMPORTS
import { useContext, useEffect } from "react";
import { ParfumeAPIContext } from "../../../context/ParfumesContext";
import { Link } from "react-router-dom";

export default function BestSellerSectionListPage() {
  const { bestSellers, getBestSellersParfumes, loading, error } =
    useContext(ParfumeAPIContext);

  useEffect(() => {
    getBestSellersParfumes();
  }, []);
  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Tutti i Best Seller</h2>

      <Link to={"/"}>
        <button className="btn btn-primary btn-box-info-bestseller my-3">
          Ritorna all' Homepage
        </button>
      </Link>

      {loading && <p>Caricamento...</p>}
      {error && <p>Errore nel caricamento dei profumi.</p>}

      <div className="row">
        {bestSellers.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card h-100 text-center">
              <img
                src={item.image}
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
                  <strong>Formato:</strong> {item.size}
                </p>
                <Link to={"/bestsellers/" + item.id}>
                  <button className="btn btn-primary btn-box-info-bestseller my-3">
                    Scopri di più
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
