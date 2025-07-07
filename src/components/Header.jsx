import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";

import { useCartPopup } from "../context/CartPopupContext";

export default function Header() {
  const { showCartPopup, data } = useCartPopup();

  return (
    <>
      <div className="d-flex justify-content-between align-items-center bg-body-tertiary">
        <Navbar />

        <button
          onClick={() => {
            const cart = JSON.parse(window.localStorage.getItem("cart")) || [];
            showCartPopup(cart);

            console.log("cart", cart);
          }}
          className="btn btn-primary position-relative"
        >
          <i className="bi bi-cart3 m-3 icon-xl"></i>
        </button>
      </div>
    </>
  );
}
