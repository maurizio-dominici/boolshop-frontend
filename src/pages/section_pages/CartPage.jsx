import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartPopup } from "../../context/CartPopupContext";

export default function CartPage() {
  const { updateCartPopup } = useCartPopup();

  const [cart, setCart] = useState(
    JSON.parse(window.localStorage.getItem("cart"))
  );
  console.debug("cart", cart);

  function getFinalPrice(item) {
    return parseFloat(
      (item.price - (item.price * item.discount.discount_amount) / 100).toFixed(
        2
      )
    );
  }

  const updateQuantity = (item, value) => {
    const updatedCart = cart.map((cartItem) => {
      return item.id === cartItem.id
        ? { ...cartItem, quantity: cartItem.quantity + value }
        : cartItem;
    });
    const filteredCart = updatedCart.filter(
      (cartItem) => cartItem.quantity > 0
    );

    setCart(filteredCart);
    window.localStorage.setItem("cart", JSON.stringify(filteredCart));
    console.log(JSON.parse(window.localStorage.getItem("cart")));
    updateCartPopup(updatedCart);
  };

  const removeItem = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    console.debug("updatedCart", updatedCart);
    setCart(updatedCart);
    window.localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartPopup(updatedCart);
  };

  /* parte nuova formattazione prezzo */

  function getOriginalPrice(item) {
    return item.price.toFixed(2);
  }

  function getFinalPrice(item) {
    const test =
      item.price - (item.price * item.discount.discount_amount) / 100;

    return parseFloat(test).toFixed(2);
  }

  return (
    <>
      {cart?.length ? (
        <div className="container">
          <h1>IL TUO CARRELLO</h1>

          <div className="d-flex justify-content-between my-3">
            <Link to={-1} className="btn btn-outline-primary">
              Torna indietro
            </Link>
            <Link to="/checkout" className="btn btn-primary">
              Vai al CHECKOUT
            </Link>
          </div>

          <div className="row my-5">
            {cart.map((item) => (
              <div className="row align-items-center mb-4" key={item.id}>
                {/* CI VA L'IMG */}
                <div className="col-md-2 text-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ maxWidth: "100px" }}
                  />
                </div>
                {/* DETTAGLI PRODOTTO */}
                <div className="col-md-3">
                  <ul className="mb-0">
                    <li>
                      <b className="text-start">Nome Prodotto:</b>{" "}
                      <Link
                        to={`/product/${item.slug}`}
                        className="text-decoration-none"
                      >
                        {item.name}
                      </Link>
                    </li>
                    <li>
                      <b>Brand:</b> {item.brand?.brand_name || "-"}
                    </li>
                    <li>
                      <b className="">Taglia:</b> {item.size_name}
                    </li>
                    <li>
                      <b>Formato:</b> {item.size_ml} ml
                    </li>
                  </ul>
                </div>

                {/* MOSTRA PREZZI */}
                <div className="col-md-3">
                  {item.discount.discount_amount > 0 ? (
                    <ul className="mb-0">
                      <li>
                        <b>Prezzo originale: </b>
                        <del className="old-price">
                          {getOriginalPrice(item)} €
                        </del>
                      </li>
                      <li>
                        <b>Sconto applicato: </b>{" "}
                        {item.discount.discount_amount}%
                      </li>
                      <li>
                        <b>Prezzo scontato: </b>
                        <span className="new-price">
                          {getFinalPrice(item)} €
                        </span>
                      </li>
                    </ul>
                  ) : (
                    <ul className="mb-0">
                      <li>
                        <b>Prezzo originale: </b>{" "}
                        <span>{getOriginalPrice(item)} €</span>
                      </li>
                    </ul>
                  )}
                </div>
                {/* CONTROLLO QUANTITÁ */}
                <div className="col-md-4 d-flex align-items-center justify-content-end gap-3">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => updateQuantity(item, -1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <div className="">{item.quantity}</div>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => updateQuantity(item, 1)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => removeItem(item)}
                  >
                    ELIMINA
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h4>
            Totale carrello:
            <span>
              {" "}
              {JSON.parse(window.localStorage.getItem("cart"))
                .reduce(
                  (sum, item) => sum + getFinalPrice(item) * item.quantity,
                  0
                )
                .toFixed(2)}{" "}
              €
            </span>
            {/* {
                JSON.parse(window.localStorage.getItem("cart"))
                  .reduce(
                    (sum, item) => sum + item.price * item.quantity,
                      0
                  )
                  .toFixed(2)
              } */}
          </h4>
        </div>
      ) : (
        <div className="container text-center my-5">
          <h2>Il tuo carrello è vuoto</h2>
          <p>Inizia a fare shopping!</p>
          <Link to="/" className="btn btn-primary">
            Torna alla Home
          </Link>
        </div>
      )}
    </>
  );
}
