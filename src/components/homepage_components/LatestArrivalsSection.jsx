import { useContext, useEffect } from "react";
import { ParfumeAPIContext } from "../../context/ParfumesContext";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function LatestArrivalsSection() {
  const { recents, getRecentsParfumes } = useContext(ParfumeAPIContext);

  useEffect(() => {
    getRecentsParfumes();
  }, []);

  return (
    <section className="py-3 bg-light">
      <div className="container">
        <div className="d-md-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold">I nostri Ultimi Arrivi</h2>
          <Link to="/recents">
            <button className="btn btn-primary">Scoprili tutti</button>
          </Link>
        </div>
        <div className="row">
          {recents.slice(0, 6).map((parfume) => (
            <div key={parfume.id} className="col-md-6 col-xl-4 mb-3">
              <Card item={parfume} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
