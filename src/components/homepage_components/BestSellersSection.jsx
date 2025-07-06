import { useContext, useEffect } from "react";
import { ParfumeAPIContext } from "../../context/ParfumesContext";
import { Link } from "react-router-dom";

export default function BestSellersSection() {
  const { bestSellers, getBestSellersParfumes } = useContext(ParfumeAPIContext);

  useEffect(() => {
    getBestSellersParfumes();
  }, []);
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">I nostri Best Seller</h2>
          <Link to="/bestsellers">
            <button className="btn btn-primary">Scoprili tutti</button>
          </Link>
        </div>
        <div className="row">
          {bestSellers.slice(0, 3).map((parfume) => (
            <div key={parfume.id} className="col-md-4 mb-3">
              <Link 
                to={`/product/${parfume.slug}`} 
                className="text-decoration-none"
              >
                <div className="card h-100 shadow-sm">
                  <img
                    src={parfume.image_url}
                    className="card-img-top"
                    alt={parfume.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{parfume.name}</h5>
                    <p className="card-text">{parfume.description}</p>
                    <p className="fw-bold">{parfume.price}€</p>
                    <img
                      src={parfume.brand.brand_logo}
                      alt={parfume.brand.brand_name}
                      style={{ height: "30px" }}
                    />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
