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

        <div className="row">
          {/* Colonna 1 */}
          <div className="col">
            <div className="card h-100 shadow">
              <img
                className="card-img-top"
                src="/img/oud.jpg"
                alt="Oud Royale"
              />
              <div className="card-body">
                <h5 className="card-title">Oud Royale</h5>
                <p className="card-text">Un profumo ricco e avvolgente.</p>
                <Link to="/latestarrivals/details">
                  <button className="btn btn-outline-primary">
                    Scopri di più
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Colonna 2 */}
          <div className="col">
            <div className="card h-100 shadow">
              <img
                className="card-img-top"
                src="/img/rose.jpg"
                alt="Rose Éclat"
              />
              <div className="card-body">
                <h5 className="card-title">Rose Éclat</h5>
                <p className="card-text">
                  Eleganza floreale per ogni occasione.
                </p>
                <Link to="/latestarrivals/details">
                  <button className="btn btn-outline-primary">
                    Scopri di più
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Colonna 3 */}
          <div className="col">
            <div className="card h-100 shadow">
              <img
                className="card-img-top"
                src="/img/citrus.jpg"
                alt="Citrus Lux"
              />
              <div className="card-body">
                <h5 className="card-title">Citrus Lux</h5>
                <p className="card-text">Freschezza agrumata e sofisticata.</p>
                <Link to="/latestarrivals/details">
                  <button className="btn btn-outline-primary">
                    Scopri di più
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
