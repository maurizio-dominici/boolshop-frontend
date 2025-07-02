import { NavLink, Link } from "react-router-dom";
import BestSellerSectionDettailsPage from "./BestSellerSectionDettailsPage";

export default function BestSellerSectionListPage() {
  return (
    <div className="row">
      <Link to={"/"}>
        <button className="btn btn-primary btn-box-info-bestseller my-3">
          Ritorna alla Hompage
        </button>
      </Link>
      <div className="col">
        <BestSellerSectionDettailsPage />
      </div>
      <div className="col">
        <BestSellerSectionDettailsPage />
      </div>
      <div className="col">
        <BestSellerSectionDettailsPage />
      </div>
    </div>
  );
}
