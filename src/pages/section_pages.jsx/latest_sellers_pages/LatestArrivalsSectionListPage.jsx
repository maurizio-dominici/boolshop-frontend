import { useContext, useEffect } from "react";
import { ParfumeAPIContext } from "../../../context/ParfumesContext";

export default function LatestArrivalsSectionListPage() {
  const { recents, getRecentsParfumes, loading, error } =
    useContext(ParfumeAPIContext);

  useEffect(() => {
    getRecentsParfumes();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Tutti gli Ultimi Arrivi</h2>

      {loading && <p>Caricamento...</p>}
      {error && <p>Errore nel caricamento dei profumi.</p>}

      <div className="row">
        {recents.map((item) => (
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
                <button className="btn btn-outline-primary">
                  Scopri di più
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
