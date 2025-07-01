import { NavLink, Link } from "react-router-dom";

export default function BestSellerSection() {
  return (
    <section className="bestseller">
      <div className="container">
        <div className="box-info-bestseller d-flex justify-content-between align-items-center">
          <h1>I nostri Best-Seller</h1>

          <Link to={"/bestseller"}>
            <button className="btn-box-info-bestseller">Scoprili</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
