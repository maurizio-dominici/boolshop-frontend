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
    <div className="page-container cart">
      {cart?.length ? (
        <div className="container py-4">
          <h1 className="mb-4 text-center fw-bold">IL TUO CARRELLO</h1>
          <div className="row gy-4">
            {cart.map((item) => (
              <div className="col-12" key={item.id}>
                <div className="card shadow-sm p-3 h-100">
                  <div className="row align-items-center g-3">
                    {/* CI VA L'IMG */}
                    <div className="col-4 col-md-2 text-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded"
                        style={{
                          maxWidth: "90px",
                          maxHeight: "90px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    {/* DETTAGLI PRODOTTO */}
                    <div className="col-8 col-md-3">
                      <ul className="mb-0 list-unstyled small">
                        <li>
                          <b>Nome Prodotto:</b>{" "}
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
                          <b>Taglia:</b> {item.size_name}
                        </li>
                        <li>
                          <b>Formato:</b> {item.size_ml} ml
                        </li>
                      </ul>
                    </div>
                    {/* MOSTRA PREZZI */}
                    <div className="col-12 col-md-3 mt-3 mt-md-0">
                      {item.discount.discount_amount > 0 ? (
                        <ul className="mb-0 list-unstyled">
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
                        <ul className="mb-0 list-unstyled">
                          <li>
                            <b>Prezzo originale: </b>{" "}
                            <span>{getOriginalPrice(item)} €</span>
                          </li>
                        </ul>
                      )}
                    </div>
                    {/* CONTROLLO QUANTITÁ */}
                    <div className="col-md-6 col-xl-4 d-flex align-items-center justify-content-md-end justify-content-start gap-2 gap-md-3 mt-3 mt-md-0">
                      <button
                        className="btn btn-secondary"
                        onClick={() => updateQuantity(item, -1)}
                        disabled={item.quantity <= 1}
                        aria-label="Diminuisci quantità"
                      >
                        -
                      </button>
                      <div className="fw-bold px-2">{item.quantity}</div>
                      <button
                        className="btn btn-secondary"
                        onClick={() => updateQuantity(item, 1)}
                        aria-label="Aumenta quantità"
                      >
                        +
                      </button>
                      <button
                        // className="btn btn-secondary ms-2"
                        className="btn btn-outline-primary ms-2"
                        onClick={() => removeItem(item)}
                        aria-label="Elimina prodotto"
                      >
                        ELIMINA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row justify-content-end mt-4">
            <div className="col-12 col-md-6">
              <div className="card p-3 shadow-sm">
                <h4 className="mb-3 text-end">
                  Totale carrello:
                  <span className="ms-2 fw-bold">
                    {JSON.parse(window.localStorage.getItem("cart"))
                      .reduce(
                        (sum, item) =>
                          sum + getFinalPrice(item) * item.quantity,
                        0
                      )
                      .toFixed(2)}{" "}
                    €
                  </span>
                </h4>
              </div>
            </div>
          </div>
          <div className="card-footer bg-transparent border-0 d-flex flex-md-row justify-content-between align-items-center gap-2 px-0">
            <Link to={-1} className="btn btn-secondary">
              Torna indietro
            </Link>
            <Link to="/checkout" className="btn btn-primary">
              Vai al CHECKOUT
            </Link>
          </div>
        </div>
      ) : (
        <div className="container text-center my-5">
          <h2 className="mb-3">Il tuo carrello è vuoto</h2>
          <p>Inizia a fare shopping!</p>
          <Link to="/" className="btn btn-primary mt-3">
            Torna alla Home
          </Link>
        </div>
      )}
    </div>
  );
}
