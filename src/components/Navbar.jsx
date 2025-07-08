import { NavLink, Link } from "react-router-dom";
import { useCartPopup } from "../context/CartPopupContext";


export default function Navbar() {
  const { showCartPopup, data } = useCartPopup();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-3">
      <div className="container-fluid p-0">
        <Link className="navbar-brand" to="/">
          Logo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to={"/"} className="nav-link" aria-current="page">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/bestsellers"} className="nav-link">
                Best Sellers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/recents"} className="nav-link">
                Ultimi Arrivi
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/cart"} className="nav-link">
                Carrello
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/about-us"} className="nav-link">
                About us
              </NavLink>
            </li>
          </ul>
        </div>
      </div>



      <div className="d-flex align-items-center gap-1">
        <NavLink 
          to={"/parfumes"} 
          // className="nav-link"
          className="btn btn-outline-secondary"
        >
          <i className="bi bi-search icon-xl"></i>
        </NavLink>

        <button
          onClick={() => {
            const cart = JSON.parse(window.localStorage.getItem("cart")) || [];
            showCartPopup(cart);
            console.log("cart", cart);
          }}
          className="btn btn-primary position-relative"
        >
          <i className="bi bi-cart3 icon-xl"></i>
        </button>
      </div>
    </nav>
  );
}
