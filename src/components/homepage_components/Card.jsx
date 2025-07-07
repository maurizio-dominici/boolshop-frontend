import { Link } from "react-router-dom";

export default function Card({ item }) {
  const cartAdd = (product) => {
    // # DEBUG
    // window.localStorage.clear();

    // console.log("product", product);
    // console.log("window.localStorage.getItem('cart')", window.localStorage.getItem("cart"));

    const cart = JSON.parse(window.localStorage.getItem("cart")) || [];

    const isProductInCart =
      cart.find((cartItem) => cartItem.slug === product.slug) === undefined
        ? false
        : true;

    let addedItem = {};
    if (isProductInCart) {
      addedItem = cart.find((cartItem) => cartItem.slug === product.slug);
      // console.log("addedItem", addedItem);
      addedItem.quantity += 1;
    } else {
      addedItem = product;
      addedItem.quantity = 1;
      cart.push(addedItem);
    }
    // console.log("cart", JSON.stringify(cart));

    window.localStorage.setItem("cart", JSON.stringify(cart));
    // console.log(window.localStorage.getItem("cart"));

    console.log(
      "LOG FINALE CARRELLO",
      JSON.parse(window.localStorage.getItem("cart"))
    );

    // window.localStorage.setItem(key, value);
    // window.localStorage.getItem(key);
    // window.localStorage.removeItemItem(key);
  };

  return (
    <div className="card h-100 text-center product-card">
      <Link to={`/product/${item.slug}`} className="text-decoration-none">
        <img
          src={item.image_url}
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
          {item.discount.discount_amount !== 0 && (
            <p>
              <strong>Sconto:</strong> {item.discount.discount_amount}
            </p>
          )}
        </div>
      </Link>
      <button
        className="btn btn-primary hovered z-1"
        onClick={() => cartAdd(item)}
      >
        Aggiungi
      </button>
    </div>
  );
}
