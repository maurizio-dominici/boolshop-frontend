import { NavLink, Link } from "react-router-dom";

export default function BestSellerSection() {
  return (
    <section className="bestseller">
      <div className="container">
        <div className="box-info-bestseller d-flex justify-content-between align-items-center my-3">
          <h1>I NOSTRI BEST-SELLER</h1>

          <Link to={"/bestseller"}>
            <button className="btn-box-info-bestseller">SCOPRILI TUTTI</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
