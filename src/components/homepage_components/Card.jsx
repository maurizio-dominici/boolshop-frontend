import { Link } from "react-router-dom";
import { useCartPopup } from "../../context/CartPopupContext";

export default function Card({ item }) {
  const { updateCartPopup } = useCartPopup();

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

    updateCartPopup(cart);

    console.log(
      "LOG FINALE CARRELLO",
      JSON.parse(window.localStorage.getItem("cart"))
    );
  };

  return (
    <div className="card h-100 text-center product-card">
      <Link to={`/product/${item.slug}`} className="text-decoration-none">
        <img
          src={item.image}
          alt={item.name}
          className="card-img-top"
          style={{ maxHeight: "200px", objectFit: "contain" }}
        />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>

          <p className="card-text">{item.description}</p>
          <p>
            <strong>Brand:</strong> {item.brand.brand_name}
          </p>
          <p>
            <strong>Gender</strong> {item.gender}
          </p>
          <p>
            <strong>Prezzo:</strong> {item.price}€
          </p>
          <p>
            <strong>Formato:</strong> {item.size_ml}ml
          </p>
          {item.discount.discount_amount !== 0 ? (
            <span id="discount" className="badge">
              {item.discount.discount_amount}%
            </span>
          ) : (
            <></>
          )}
        </div>
      </Link>
      <button
        className="btn btn-primary hovered z-1"
        onClick={() => cartAdd(item)}
      >
        <i className="bi bi-cart3 m-3 icon-m"></i>
      </button>
    </div>
  );
}
