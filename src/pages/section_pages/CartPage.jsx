import { useState } from "react";
import { Link } from "react-router-dom";

export default function CartPage() {
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
  };

  const removeItem = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    console.debug("updatedCart", updatedCart);
    setCart(updatedCart);
    window.localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>
      {
        cart?.length ?
          <div className="container">
            <h1>IL TUO CARRELLO</h1>
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
                        <b className="text-start">Nome Prodotto:</b> <Link to={`/product/${item.slug}`} className="text-decoration-none">{item.name}</Link>
                      </li>
                      <li>
                        <b>Brand:</b> {item.brand?.brand_name || "-"}
                      </li>
                      <li>
                        <b className="">Taglia:</b> {item.size_name}
                      </li>
                      <li>
                        <b>Formato:</b> {item.size_ml}ml
                      </li>
                    </ul>
                  </div>

                  {/* MOSTRA PREZZI */}
                  <div className="col-md-3">
                    <ul className="mb-0">
                      <li>
                        <b>Prezzo originale:</b> €{item.price}
                      </li>
                      <li>
                        <b>Sconto applicato:</b> {item.discount.discount_amount}%
                      </li>
                      <li>
                        <b>Prezzo scontato:</b> €{getFinalPrice(item)}
                      </li>
                    </ul>
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
              Totale carrello: €
              {/* {
                JSON.parse(window.localStorage.getItem("cart"))
                  .reduce(
                    (sum, item) => sum + item.price * item.quantity,
                      0
                  )
                  .toFixed(2)
              } */}
              {
                JSON.parse(window.localStorage.getItem("cart"))
                  .reduce(
                    (sum, item) => sum + getFinalPrice(item) * item.quantity,
                      0
                  )
                  .toFixed(2)
              }
            </h4>

            <div className="card-footer d-flex justify-content-between">
              <Link to={-1} className="btn btn-outline-secondary my-3">
                Torna indietro
              </Link>
              <Link to="/checkout" className="btn btn-primary my-3">
                Vai al CHECKOUT
              </Link>
            </div>
          </div>
        :
          <div className="container text-center my-5">
            <h2>Il tuo carrello è vuoto</h2>
            <p>Inizia a fare shopping!</p>
            <Link to="/" className="btn btn-primary">
              Torna alla Home
            </Link>
          </div>
      }
    </>
  );
}
