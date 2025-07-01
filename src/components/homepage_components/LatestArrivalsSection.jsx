import { NavLink, Link } from "react-router-dom";

export default function LatestArrivalsSection() {
  return (
    <section className="latestarrivals">
      <div className="container">
        <div className="box-info-latestarrivals d-flex justify-content-between align-items-center">
          <h1>I nostri Ultimi Arrivi</h1>
          <Link to="/latestarrivals">
            <button className="btn-box-info-latestarrivals">Scoprili</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
