import { useContext, useEffect } from "react";
import { ParfumeAPIContext } from "../../context/ParfumesContext";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function BestSellersSection() {
  const { bestSellers, getBestSellersParfumes } = useContext(ParfumeAPIContext);

  useEffect(() => {
    getBestSellersParfumes();
  }, []);
  return (
    <section className="pt-3 bg-light">
      <div className="container">
        <div className="d-md-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold">I nostri Best Seller</h2>
          <Link to="/bestsellers">
            <button className="btn btn-primary">Scoprili tutti</button>
          </Link>
        </div>
        <div className="row">
          {bestSellers.slice(0, 6).map((parfume) => (
            <div key={parfume.id} className="col-md-6 col-xl-4 mb-3">
              <Card item={parfume} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
