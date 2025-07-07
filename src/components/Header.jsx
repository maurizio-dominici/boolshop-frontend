import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center bg-body-tertiary">
        <Navbar />
        <NavLink
          to={"/cart"}
          className="nav-link bi bi-cart3 m-3 icon-xl"
        ></NavLink>
      </div>
    </>
  );
}
