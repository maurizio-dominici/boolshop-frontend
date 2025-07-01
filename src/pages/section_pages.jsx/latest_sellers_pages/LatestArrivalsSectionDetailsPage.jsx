import { Link, NavLink } from "react-router-dom";

export default function LatestArrivalsSectionDetailsPage() {
  return (
    <>
      <div className="card h-100">
        <img className="img-parfume" src="./vite.svg" alt="" />
        <div className="card-title">
          <h2>"ciao"</h2>
        </div>
        <div className="card-body">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga quae
          </p>
          <div className="box-info d-flex justify-content-between align-items-center">
            <Link to={"/LatestArrivals/details"}>
              <button className="btn-box-info-latestarrivals">
                Scopri di più
              </button>
            </Link>
            <Link to={"/latestarrivals"}>
              <button className="btn-box-info-latestarrivals">
                Ritorna alla lista degli Ultimi Arrivi
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
