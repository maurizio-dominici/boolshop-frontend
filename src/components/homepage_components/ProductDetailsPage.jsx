import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartPopup } from "../../context/CartPopupContext";

import axios from "axios";

import { useTopMessage } from "../../context/TopMessageContext";

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const { updateCartPopup } = useCartPopup();

  const { showTopMessage } = useTopMessage();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/parfumes/${slug}`)
      .then((res) => setProduct(res.data[0]))
      .catch((err) => console.error("Errore nel caricamento:", err));
  }, [slug]);

  console.debug("ProductDetailsPage product", product);

  if (!product) return <p>Caricamento in corso...</p>;

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
    <div className="container mt-5">
      {/* <div className="card shadow row"> */}
      <div className="card shadow">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            // className="card-img-top d-block col-12 col-md-6"
            className="card-img-top d-block"
            style={{ maxHeight: "300px", objectFit: "contain" }}
          />
        ) : (
          // <div className="bg-secondary text-white text-center py-5 col-12 col-md-6">
          <div className="bg-secondary text-white text-center py-5">
            Nessuna immagine disponibile
          </div>
        )}

        {/* <div className="card-body col-12 col-md-6"> */}
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

          <button onClick={() => cartAdd(product)} className="btn btn-success">
            Aggiungi al carrello
          </button>
        </div>

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
