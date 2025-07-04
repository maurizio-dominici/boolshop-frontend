import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/parfumes/${slug}`)
      .then((res) => setProduct(res.data[0]))
      .catch((err) => console.error("Errore nel caricamento:", err));
  }, [slug]);

  console.debug("ProductDetailsPage product", product);

  if (!product) return <p>Caricamento in corso...</p>;

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
    <div className="container mt-5">
      <div className="card shadow">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="card-img-top"
          />
        ) : (
          <div className="bg-secondary text-white text-center py-5">
            Nessuna immagine disponibile
          </div>
        )}

        <div className="card-body">
          <h2>{product.name}</h2>
          <p>{product.description}</p>

          <p>
            <strong>Brand:</strong> {product.brand?.brand_name || "Sconosciuto"}
          </p>

          <p>
            <strong>Prezzo:</strong> €{product.price}
          </p>
          <p>
            <strong>Formato:</strong> {product.size_ml}ml
          </p>

          {product.discount?.discount_amount > 0 && (
            <p className="text-success">
              Sconto: -{product.discount.discount_amount}%
            </p>
          )}
        </div>

        <button onClick={() => cartAdd(product)} className="btn btn-success">
          Aggiungi al carrello
        </button>

        <div className="card-footer d-flex justify-content-between">
          <Link to={-1} className="btn btn-outline-secondary">
            Torna indietro
          </Link>
          <Link to="/" className="btn btn-primary">
            Vai alla Home
          </Link>
        </div>
      </div>
    </div>
  );
}
