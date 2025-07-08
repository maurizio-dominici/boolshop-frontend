import { useState } from "react";
import { useCartPopup } from "../../context/CartPopupContext";
import { Link } from "react-router-dom";

export default function CartPopup() {
  const { data, hideCartPopup, updateCartPopup } = useCartPopup();

  console.log("data", data);
  // console.log("data.show", data.show);

  if (!data.show) return <></>;

  console.log("data", data);
  // console.log("data.show", data.show);

  if (!data.show) return <></>;

  const updateQuantity = (item, value) => {
    const updatedCart = data.cart.map((cartItem) => {
      return item.id === cartItem.id
        ? { ...cartItem, quantity: cartItem.quantity + value }
        : cartItem;
    });
    const filteredCart = updatedCart.filter(
      (cartItem) => cartItem.quantity > 0
    );

    window.localStorage.setItem("cart", JSON.stringify(filteredCart));
    console.log(JSON.parse(window.localStorage.getItem("cart")));
    updateCartPopup(updatedCart);
  };

  const removeItem = (item) => {
    const updatedCart = data.cart.filter((cartItem) => cartItem.id !== item.id);
    console.debug("updatedCart", updatedCart);
    window.localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartPopup(updatedCart);
  };
  /* IMPORTO FUNZIONE DA CARD */

  function getFinalPrice(item) {
    return parseFloat(
      (item.price - (item.price * item.discount.discount_amount) / 100).toFixed(
        2
      )
    );
  }

  return (
    <>
      {data.show && (
        <div id="CartPopup" className="card">
          <div className="card-header d-flex justify-content-between mt-1">
            <h2 className="card-title fs-5">Il tuo carrello</h2>
            <button
              onClick={hideCartPopup}
              type="button"
              className="btn btn-close"
            ></button>
          </div>
          <div className="card-body">
            <p className="card-text">
              <strong>Riepilogo del carrello:</strong>
            </p>
            <div className="card-text">
              {data.cart.length > 0 &&
                data.cart.map((cartItem) => {
                  return (
                    <span key={cartItem.id}>
                      {/* {cartItem.name} : {cartItem.quantity} x <span> </span>
                      {cartItem.price.toFixed(2)} € */}
                      <br />
                      {/* parte nuova */}
                      <span>
                        <strong>{cartItem.name} : </strong>
                        {cartItem.quantity} x <span> </span>
                        {getFinalPrice(cartItem)} €
                      </span>

                      <div className="d-flex align-items-center">
                        <button
                          className="btn "
                          onClick={() => removeItem(cartItem)}
                        >
                          <i className="bi bi-trash"></i>{" "}
                        </button>
                        <button
                          className="btn "
                          onClick={() => updateQuantity(cartItem, -1)}
                          disabled={cartItem.quantity <= 1}
                        >
                          -
                        </button>
                        <button
                          className="btn "
                          onClick={() => updateQuantity(cartItem, 1)}
                        >
                          +
                        </button>
                      </div>
                      {/* <button
                        className="btn m-1"
                        onClick={() => removeItem(cartItem)}
                      >
                        <i className="bi bi-trash"></i>{" "}
                      </button>
                      <button
                        className="btn m-1"
                        onClick={() => updateQuantity(cartItem, -1)}
                        disabled={cartItem.quantity <= 1}
                      >
                        -
                      </button>
                      <button
                        className="btn m-1"
                        onClick={() => updateQuantity(cartItem, 1)}
                      >
                        +
                      </button> */}
                      <br />
                    </span>
                  );
                })}

                {/* parte nuova */}
                <span>
                  <strong>Totale ordine: </strong>
                  {JSON.parse(window.localStorage.getItem("cart"))
                    .reduce(
                      (sum, item) =>
                        sum + getFinalPrice(item) * item.quantity,
                      0
                    )
                    .toFixed(2)}{" "}
                  €
                </span>
              {data.cart.length === 0 && (
                <p className="text-secondary">Il tuo carrello é vuoto.</p>
              )}
            </div>
          </div>
          {data.cart.length > 0 && (
            <Link to={"/cart"} className="btn btn-primary m-2">
              Vai al Carrello
            </Link>
          )}
        </div>
      )}
    </>
  );
}
