import { Link } from "react-router-dom";
import { useCartPopup } from "../../context/CartPopupContext";
import { useTopMessage } from "../../context/TopMessageContext";

export default function ProductListVisualizationItem({ item }) {
  const { updateCartPopup, setCartPopupData } = useCartPopup();
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
    <div className="card product-card mb-3">
        <div className="row g-0">
          <div className="col-md-2">
            <Link to={`/product/${item.slug}`} className="text-decoration-none">
              <img
                src={item.image}
                alt={item.name}
                style={{ maxHeight: "200px", objectFit: "contain" }}
                className="card-img-top pt-3 img-fluid"
              />
            </Link>
          </div>

          <div className="col-md-5">
            <Link to={`/product/${item.slug}`} className="text-decoration-none">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                {/* <p className="card-text">
                  <small className="text-body-secondary">
                    <strong>Brand: </strong>
                    {item.brand.brand_name}
                  </small>
                </p> */}
                <div>
                  <img src={item.brand.brand_logo} alt={item.brand.brand_name} className="brand-logo"/>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-5">
            <div className="card-body">
              <Link to={`/product/${item.slug}`} className="text-decoration-none">
                <p className="card-text">
                  <strong>Gender:</strong> {item.gender}
                </p>
                <p className="card-text">
                  {/* <small> */}
                  <strong>Prezzo: </strong>

                  {item.discount.discount_amount !== 0 ? (
                    <>
                      <del className="old-price">{getOriginalPrice(item)} € </del>{" "}
                      <span className="new-price">{getFinalPrice(item)} €</span>
                    </>
                  ) : (
                    <>{getOriginalPrice(item)} € </>
                  )}
                  {/* </small> */}
                </p>
                <p className="card-text">
                  {item.discount.discount_amount !== 0 ? (
                    <span id="discount" className="badge">
                      {item.discount.discount_amount} %
                    </span>
                  ) : (
                    <></>
                  )}
                </p>
                <p className="card-text">
                  <strong>Formato: </strong>
                  {item.size_ml} ml ({item.size_name})
                </p>
              </Link>

              <button
                className="btn btn-primary z-1 d-block d-md-none"
                onClick={() => cartAdd(item)}
              >
                <i className="bi bi-cart3 icon-m"></i>
              </button>


            </div>
          </div>
        </div>



      <button
        className="btn btn-primary hovered z-1"
        onClick={() => cartAdd(item)}
      >
        <i className="bi bi-cart3 icon-m"></i>
      </button>
    </div>
  );
}
