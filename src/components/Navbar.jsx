import { NavLink, Link } from "react-router-dom";
import { useCartPopup } from "../context/CartPopupContext";

export default function Navbar() {
  const { showCartPopup, data } = useCartPopup();

  return (
    <nav className="navbar navbar-expand-lg px-3">
      <div className="container-fluid p-0">
        <Link className="navbar-brand" to="/">
          <img className="logo" src="/boolshop-parfumes-logo.jpg" alt="Logo" />
        </Link>

        <div className="d-flex justify-content-between align-items-center gap-1">
          <div className="d-flex d-lg-none align-items-center gap-1">
            <NavLink
              to={"/parfumes"}
              // className="nav-link"
              // className="btn btn-outline-secondary py-2 px-3"
              className="btn btn-primary py-2 px-3"
            >
              <i className="bi bi-search icon-xl"></i>
            </NavLink>

            <button
              onClick={() => {
                const cart = JSON.parse(window.localStorage.getItem("cart")) || [];
                showCartPopup(cart);
                console.log("cart", cart);
              }}
              // className="btn btn-primary position-relative py-2 px-3"
              className="btn btn-secondary position-relative py-2 px-3"
            >
              <i className="bi bi-cart3 icon-xl"></i>
            </button>
          </div>

          <button
            className="navbar-toggler py-2 px-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            // aria-controls="navbarSupportedContent"
            // aria-expanded="false"
            // aria-label="Toggle navigation"
          >
            {/* <span className="navbar-toggler-icon"></span> */}
            <i id="hamburger-menu" className="bi bi-list"></i>
          </button>
        </div>



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

      <div className="d-none d-lg-flex align-items-center gap-1">
        <NavLink
          to={"/parfumes"}
          // className="nav-link"
          // className="btn btn-outline-secondary py-2 px-3"
          className="btn btn-primary py-2 px-3"
        >
          <i className="bi bi-search icon-xl"></i>
        </NavLink>

        <button
          onClick={() => {
            const cart = JSON.parse(window.localStorage.getItem("cart")) || [];
            showCartPopup(cart);
            console.log("cart", cart);
          }}
          // className="btn btn-primary position-relative py-2 px-3"
          className="btn btn-secondary position-relative py-2 px-3"
        >
          <i className="bi bi-cart3 icon-xl"></i>
        </button>
      </div>
    </nav>
  );
}
