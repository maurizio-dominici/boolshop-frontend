import { Link } from "react-router-dom";
import { useCartPopup } from "../../context/CartPopupContext";
import { useTopMessage } from "../../context/TopMessageContext";

export default function Card({ item }) {
  const { cartPopupData, updateCartPopup, setCartPopupData } = useCartPopup();
  const { showTopMessage } = useTopMessage();

  const cartAdd = (product) => {
    const cart = JSON.parse(window.localStorage.getItem("cart")) || [];

    const isProductInCart =
      cart.find((cartItem) => cartItem.slug === product.slug) === undefined
        ? false
        : true;

    let addedItem = {};
    if (isProductInCart) {
      addedItem = cart.find((cartItem) => cartItem.slug === product.slug);
      addedItem.quantity += 1;
    } else {
      addedItem = product;
      addedItem.quantity = 1;
      cart.push(addedItem);
    }

    window.localStorage.setItem("cart", JSON.stringify(cart));

    setCartPopupData(cart);
    updateCartPopup(cart);
    showTopMessage("Aggiunto al carrello", "success");
    // showTopMessage("Aggiunto al carrello", "success", false);

    console.log(
      "LOG FINALE CARRELLO",
      JSON.parse(window.localStorage.getItem("cart"))
    );
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
    <div className="card h-100 text-center product-card">
      {/* <Link to={`/product/${item.slug}`} className="text-decoration-none"> */}
        <Link to={`/product/${item.slug}`} className="text-decoration-none mb-0">
          <img
            src={item.image}
            alt={item.name}
            className="card-img-top img-fluid pt-3"
            style={{ maxHeight: "200px", objectFit: "contain" }}
          />
        </Link>
        <div className="card-body mb-0">
          <Link to={`/product/${item.slug}`} className="text-decoration-none mb-0">
            <h5 className="card-title">{item.name}</h5>

            <div className="card-text">{item.description}</div>
            <div className="mt-2 mb-1">
              <img src={item.brand.brand_logo} alt={item.brand.brand_name} className="brand-logo"/>
            </div>
            <div>
              <strong>Brand:</strong> {item.brand.brand_name}
            </div>
            <div>
              <strong>Gender:</strong> {item.gender}
            </div>
            <div>
              <div>
                <strong>Formato:</strong> {item.size_ml} ml
              </div>
              <strong>Prezzo: </strong>
              {item.discount.discount_amount !== 0 ? (
                <>
                  <del className="old-price">{getOriginalPrice(item)} € </del>{" "}
                  <span className="new-price">{getFinalPrice(item)} €</span>
                </>
              ) : (
                <>{getOriginalPrice(item)} €</>
              )}
            </div>
          </Link>


          {/* <button
            className="btn btn-primary z-1 d-block d-md-none w-100 mt-3"
            onClick={() => cartAdd(item)}
          >
            <i className="bi bi-cart3 m-3 icon-m"></i>
          </button> */}
          <button
            className="btn btn-primary z-1 d-block d-md-none w-100 mt-3"
            onClick={() => cartAdd(item)}
          >
            Aggiungi al carrello
          </button>

          {item.discount.discount_amount !== 0 ? (
            <span id="discount" className="badge">
              {item.discount.discount_amount} %
            </span>
          ) : (
            <></>
          )}
        </div>
      {/* </Link> */}
      <button
        className="btn btn-primary hovered z-1"
        onClick={() => cartAdd(item)}
      >
        <i className="bi bi-cart3 icon-m"></i>
      </button>
    </div>
  );
}
