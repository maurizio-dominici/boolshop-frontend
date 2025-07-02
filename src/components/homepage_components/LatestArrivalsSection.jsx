import { Link } from "react-router-dom";

export default function LatestArrivalsSection() {
  return (
    <section className="latestarrivals py-5 bg-light">
      <div className="container">
        <div className="box-info-latestarrivals d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold">I nostri Ultimi Arrivi</h1>
          <Link to="/latestarrivals">
            <button className="btn btn-primary">Scoprili tutti</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
