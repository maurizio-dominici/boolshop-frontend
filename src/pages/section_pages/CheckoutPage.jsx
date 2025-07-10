import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTopMessage } from "../../context/TopMessageContext";

// LA CHIAMATA API LA FACCIO QUI OPPURE LA FACCIAMO NEL CONTEXT E LA RICHIEDIAMO QUI? PER ORA LA FACCIO QUI

const BASE_URL = "http://localhost:3000";

// CARREL

export default function Checkout() {
  const { showTopMessage } = useTopMessage();

  const navigate = useNavigate();

  const initialClientInfo = {
    first_name: "",
    last_name: "",
    email: "",
    country: "",
    city: "",
    postal_code: "",
    street: "",
    civic_number: 0,
    user_discount_code: "",

    // DATI DEL CARRELLO DA PRENDERE TRAMITE LOCAL STORAGE, PER ORA LO SIMULO HARDCODANDO I DATI
    cart: JSON.parse(localStorage.getItem("cart")),
  };

  function getFinalPrice(item) {
    const test =
      item.price - (item.price * item.discount.discount_amount) / 100;

    return parseFloat(test).toFixed(2);
  }

  const [clientInfo, setClientInfo] = useState(initialClientInfo);

  const handleInputChange = (e) => {
    setClientInfo((clientInfo) => ({
      ...clientInfo,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios

      // CHECKOUT, USA IL TEST, DA CAMBIARE CON LA CHIAMATA API REALE

      .post(
        // `${BASE_URL}/checkout  `,
        `${BASE_URL}/checkout/test`,
        clientInfo
      )
      .then((res) => {
        setClientInfo(initialClientInfo);
        const ordine = res.data.orderRecap;
        const checkoutCart = res.data.checkoutCart;
        const clientSecret = res.data.clientSecret;
        navigate(
          // "/recipt",
          "/pagamento",
          {
            state: { ordine, checkoutCart, clientSecret },
          }
        );
      })
      .catch((err) => {
        const errorMessage = err?.response?.data?.error;
        return showTopMessage(errorMessage, "danger");
      });
  };

  function getFinalPrice(item) {
    return parseFloat(
      (item.price - (item.price * item.discount.discount_amount) / 100).toFixed(
        2
      )
    );
  }

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
    <div className="container py-4">
      <form
        className="row g-4 justify-content-center"
        onSubmit={handleSubmit}
        style={{ maxWidth: 900, margin: "0 auto" }}
      >
        <div className="col-12">
          <div className="card shadow-sm border-0 rounded-4 p-4 mb-4">
            <h4 className="mb-4 fw-bold d-flex align-items-center gap-2">
              <i className="fa-solid fa-user-check text-primary"></i>
              Dati Cliente
            </h4>
            <div className="row g-3">
              {/* NOME */}
              <div className="col-12 col-md-6 col-lg-3">
                <label htmlFor="first_name" className="form-label fw-semibold">
                  Nome
                </label>
                <input
                  type="text"
                  className="form-control rounded-3 shadow-sm"
                  id="first_name"
                  value={clientInfo.first_name}
                  onChange={handleInputChange}
                  placeholder="Mario"
                  required
                />
              </div>
              {/* COGNOME */}
              <div className="col-12 col-md-6 col-lg-3">
                <label htmlFor="last_name" className="form-label fw-semibold">
                  Cognome
                </label>
                <input
                  type="text"
                  className="form-control rounded-3 shadow-sm"
                  id="last_name"
                  value={clientInfo.last_name}
                  onChange={handleInputChange}
                  placeholder="Rossi"
                  required
                />
              </div>
              {/* EMAIL */}
              <div className="col-12 col-lg-6">
                <label htmlFor="email" className="form-label fw-semibold">
                  E-Mail
                </label>
                <input
                  type="email"
                  className="form-control rounded-3 shadow-sm"
                  id="email"
                  value={clientInfo.email}
                  onChange={handleInputChange}
                  placeholder="mario.rossi@email.com"
                  required
                />
              </div>
              {/* PAESI */}
              <div className="col-12 col-md-4">
                <label htmlFor="country" className="form-label fw-semibold">
                  Paese
                </label>
                <select
                  className="form-select rounded-3 shadow-sm"
                  id="country"
                  value={clientInfo.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Seleziona paese
                  </option>
                  <option value="italy">Italia</option>
                  <option value="france">Francia</option>
                  <option value="spain">Spagna</option>
                </select>
              </div>
              {/* CITTÁ */}
              <div className="col-12 col-md-4">
                <label htmlFor="city" className="form-label fw-semibold">
                  Città
                </label>
                <input
                  type="text"
                  className="form-control rounded-3 shadow-sm"
                  id="city"
                  value={clientInfo.city}
                  onChange={handleInputChange}
                  placeholder="Roma"
                  required
                />
              </div>
              {/* CODICE POSTALE */}
              <div className="col-12 col-md-4">
                <label htmlFor="postal_code" className="form-label fw-semibold">
                  Codice Postale
                </label>
                <input
                  type="text"
                  className="form-control rounded-3 shadow-sm"
                  id="postal_code"
                  value={clientInfo.postal_code}
                  onChange={handleInputChange}
                  placeholder="00031"
                  pattern="\d{5}"
                  maxLength={5}
                  required
                />
              </div>
              {/* INDIRIZZO */}
              <div className="col-12 col-md-9">
                <label htmlFor="street" className="form-label fw-semibold">
                  Indirizzo
                </label>
                <input
                  type="text"
                  className="form-control rounded-3 shadow-sm"
                  id="street"
                  value={clientInfo.street}
                  onChange={handleInputChange}
                  placeholder="Via Roma"
                  required
                />
              </div>
              {/* NUMERO CIVICO */}
              <div className="col-12 col-md-3">
                <label
                  htmlFor="civic_number"
                  className="form-label fw-semibold"
                >
                  Numero Civico
                </label>
                <input
                  type="number"
                  className="form-control rounded-3 shadow-sm"
                  id="civic_number"
                  value={clientInfo.civic_number}
                  onChange={handleInputChange}
                  placeholder="123"
                  max={9999}
                  required
                />
              </div>
              {/* DISCOUNT CODE */}
              <div className="col-12">
                <label
                  htmlFor="user_discount_code"
                  className="form-label fw-semibold"
                >
                  <i className="fa-solid fa-ticket text-secondary me-1"></i>
                  Hai un codice sconto? Usalo qui
                </label>
                <input
                  type="text"
                  className="form-control rounded-3 shadow-sm"
                  id="user_discount_code"
                  value={clientInfo.user_discount_code}
                  onChange={handleInputChange}
                  placeholder="Inserisci codice sconto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIEPILOGO CARRELLO */}
        <div className="col-12">
          <div className="card shadow-sm border-0 rounded-4 p-4 mb-4">
            <h5 className="mb-4 fw-bold d-flex align-items-center gap-2">
              <i className="fa-solid fa-cart-shopping text-secondary"></i>
              Riepilogo Carrello
            </h5>
            {clientInfo.cart && clientInfo.cart.length > 0 ? (
              <div className="table-responsive">
                <table className="table align-middle mb-0 rounded-3 overflow-hidden cart-table-modern">
                  <thead
                    className="bg-light sticky-top"
                    style={{ top: 0, zIndex: 1 }}
                  >
                    <tr>
                      <th className="text-center">Prodotto</th>
                      <th className="text-center">Quantità</th>
                      <th className="text-center">Prezzo originale</th>
                      {/* Mostra colonna "Prezzo scontato" solo se almeno un prodotto ha sconto */}
                      {clientInfo.cart.some(
                        (item) => item.discount.discount_amount > 0
                      ) && <th className="text-center">Prezzo scontato</th>}
                      <th className="text-center">Totale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientInfo.cart.map((item) => (
                      <tr key={item.id} className="cart-row">
                        <td className="text-center fw-semibold">{item.name}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-center">
                          {item.discount.discount_amount > 0 ? (
                            <span className="text-decoration-line-through text-muted">
                              {getOriginalPrice(item)} €
                            </span>
                          ) : (
                            <span className="fw-bold">
                              {getOriginalPrice(item)} €
                            </span>
                          )}
                        </td>
                        {/* Mostra solo se almeno un prodotto ha sconto */}
                        {clientInfo.cart.some(
                          (i) => i.discount.discount_amount > 0
                        ) && (
                          <td className="text-center">
                            {item.discount.discount_amount > 0 ? (
                              <span className="text-success fw-bold">
                                {getFinalPrice(item)} €
                              </span>
                            ) : (
                              <span className="text-muted">—</span>
                            )}
                          </td>
                        )}
                        <td className="text-center fw-semibold">
                          {(getFinalPrice(item) * item.quantity).toFixed(2)} €
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-light">
                      <td className="text-center fw-bold">Totale ordine</td>
                      {/* colspan dinamico in base alla presenza della colonna sconto */}
                      <td
                        colSpan={
                          2 +
                          (clientInfo.cart.some(
                            (item) => item.discount.discount_amount > 0
                          )
                            ? 1
                            : 0)
                        }
                      ></td>
                      <td className="text-center fw-bold">
                        {clientInfo.cart
                          .reduce(
                            (sum, item) =>
                              sum + getFinalPrice(item) * item.quantity,
                            0
                          )
                          .toFixed(2)}{" "}
                        €
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <div className="alert alert-warning mt-3">
                Il carrello è vuoto.
              </div>
            )}
          </div>
        </div>

        {/* BOTTONI */}
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
            <Link
              to={"/cart"}
              className="btn btn-outline-secondary w-100 w-md-auto"
            >
              <i className="fa-solid fa-arrow-left me-2"></i>
              Torna al carrello
            </Link>
            <button className="btn btn-primary w-100 w-md-auto" type="submit">
              <i className="fa-solid fa-credit-card me-2"></i>
              Paga ora
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
