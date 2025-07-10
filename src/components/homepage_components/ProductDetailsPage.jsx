import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartPopup } from "../../context/CartPopupContext";

import axios from "axios";

import { useTopMessage } from "../../context/TopMessageContext";

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const { updateCartPopup, showCartPopup } = useCartPopup();

  const { showTopMessage } = useTopMessage();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/parfumes/${slug}`)
      .then((res) => setProduct(res.data[0]))
      .catch((err) => console.error("Errore nel caricamento:", err));
  }, [slug]);

  console.debug("ProductDetailsPage product", product);

  if (!product) return <p>Caricamento in corso...</p>;

  const handleInputChange = (e) => {
    setProduct((product) => ({
      ...product,
      [e.target.id]: e.target.value,
    }));
  };

  // const cartAdd = (product) => {
  //   const cart = JSON.parse(window.localStorage.getItem("cart")) || [];

  //   const isProductInCart =
  //     cart.find((cartItem) => cartItem.slug === product.slug) === undefined
  //       ? false
  //       : true;

  //   let addedItem = {};
  //   if (isProductInCart) {
  //     addedItem = cart.find((cartItem) => cartItem.slug === product.slug);
  //     addedItem.quantity += 1;
  //   } else {
  //     addedItem = product;
  //     addedItem.quantity = 1;
  //     cart.push(addedItem);
  //   }

  //   window.localStorage.setItem("cart", JSON.stringify(cart));
  //   updateCartPopup(cart);

  //   console.log(
  //     "LOG FINALE CARRELLO",
  //     JSON.parse(window.localStorage.getItem("cart"))
  //   );
  // };

  // DA RIVEDERE BENE

  const cartAdd = (product) => {
    const cart = JSON.parse(window.localStorage.getItem("cart")) || [];
    const isProductInCart =
      cart.find((cartItem) => cartItem.slug === product.slug) === undefined
        ? false
        : true;

    if (!product.quantity) product.quantity = 1;

    let addedItem = {};
    if (isProductInCart) {
      addedItem = cart.find((cartItem) => cartItem.slug === product.slug);
      addedItem.quantity =
        parseInt(addedItem.quantity) + parseInt(product.quantity);
    } else {
      addedItem = product;
      cart.push(addedItem);
    }

    window.localStorage.setItem("cart", JSON.stringify(cart));
    updateCartPopup(cart);
    showTopMessage("Aggiunto al carrello", "success");

    console.log(
      "LOG FINALE CARRELLO",
      JSON.parse(window.localStorage.getItem("cart"))
    );
  };

  /* parte nuova formattazione prezzo */

  function getOriginalPrice(product) {
    return product.price.toFixed(2);
  }

  function getFinalPrice(product) {
    const test =
      product.price - (product.price * product.discount.discount_amount) / 100;

    return parseFloat(test).toFixed(2);
  }

  return (
    <div className="page-container">
      <div className="container mt-5">
        <div className="d-flex justify-content-between mb-3">
          <Link to={-1} className="btn btn-secondary">
            Torna indietro
          </Link>
          <Link to="/" className="btn btn-primary">
            Vai alla Home
          </Link>
        </div>
        {/* <div className="card shadow row"> */}
        <div className="card shadow">
          <div className="row">
            <div className="col-12 col-md-4">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  // className="card-img-top d-block col-12 col-md-6"
                  className="card-img-top img-fluid pt-3"
                  style={{ maxHeight: "300px", objectFit: "contain" }}
                />
              ) : (
                // <div className="bg-secondary text-white text-center py-5 col-12 col-md-6">
                <div className="bg-secondary text-white text-center py-5">
                  Nessuna immagine disponibile
                </div>
              )}
            </div>
            <div className="col-12 col-md-8">
              {/* <div className="card-body col-12 col-md-6"> */}
              <div className="card-body">
                <h2>{product.name}</h2>
                <div>{product.description}</div>

                <div>
                  <strong>Brand:</strong>{" "}
                  {product.brand?.brand_name || "Sconosciuto"}
                </div>

                <div>
                  <div>
                    <strong>Formato:</strong> {product.size_ml} ml
                  </div>
                  <strong>Prezzo: </strong>
                  {product.discount.discount_amount !== 0 ? (
                    <>
                      <del className="old-price">
                        {getOriginalPrice(product)} €{" "}
                      </del>{" "}
                      <span className="new-price">
                        {getFinalPrice(product)} €
                      </span>
                    </>
                  ) : (
                    <>{getOriginalPrice(product)} €</>
                  )}
                </div>

                {product.discount.discount_amount !== 0 ? (
                  <span id="discount" className="badge">
                    {product.discount.discount_amount} %
                  </span>
                ) : (
                  <></>
                )}
                <div className="d-flex gap-3 align-items-center mt-3">
                  <input
                    type="text"
                    id="quantity"
                    value={product.quantity}
                    onChange={handleInputChange}
                    placeholder="1"
                    pattern="\d"
                    maxLength={2}
                    defaultValue={1}
                  />
                  <button
                    onClick={() => cartAdd(product)}
                    className="btn btn-primary"
                  >
                    Aggiungi al carrello
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
