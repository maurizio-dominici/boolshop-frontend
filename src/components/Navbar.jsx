import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
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
    </nav>
  );
}
