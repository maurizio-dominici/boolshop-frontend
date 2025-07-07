import { useState } from "react";
import { useCartPopup } from "../../context/CartPopupContext";
import { Link } from "react-router-dom";

export default function CartPopup() {
  const [cart, setCart] = useState(
    JSON.parse(window.localStorage.getItem("cart"))
  );

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
            <p className="card-text">Riepilogo del carrello</p>
            <p className="card-text">
              {data.cart.length > 0 &&
                data.cart.map((cartItem) => {
                  return (
                    <span key={cartItem.id}>
                      {cartItem.name} - {cartItem.quantity} x €
                      {cartItem.price.toFixed(2)}
                      <br />
                      <button
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
                      </button>
                      <br />
                    </span>
                  );
                })}
              {data.cart.length === 0 && (
                <p className="text-secondary">Il tuo carrello é vuoto.</p>
              )}
            </p>
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
