import { NavLink, Link } from "react-router-dom";
import LatestArrivalsSectionDetailsPage from "./LatestArrivalsSectionDetailsPage";

export default function LatestArrivalsSectionListPage() {
  return (
    <div className="row">
      <Link to={"/"}>
        <button className="btn-box-info-latestarrivals my-3">
          Ritorna alla Hompage
        </button>
      </Link>
      <div className="col">
        <LatestArrivalsSectionDetailsPage />
      </div>
      <div className="col">
        <LatestArrivalsSectionDetailsPage />
      </div>
      <div className="col">
        <LatestArrivalsSectionDetailsPage />
      </div>
    </div>
  );
}
