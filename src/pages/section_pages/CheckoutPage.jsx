import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
useNavigate;
import Payment from "../../components/Payment";

// LA CHIAMATA API LA FACCIO QUI OPPURE LA FACCIAMO NEL CONTEXT E LA RICHIEDIAMO QUI? PER ORA LA FACCIO QUI

const BASE_URL = "http://localhost:3000";

// CARREL

export default function Checkout() {
  function getFinalPrice(item) {
    return parseFloat(
      (item.price - (item.price * item.discount.discount_amount) / 100).toFixed(
        2
      )
    );
  }
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

  const [clientInfo, setClientInfo] = useState(initialClientInfo);

  const handleInputChange = (e) => {
    setClientInfo((clientInfo) => ({
      ...clientInfo,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${BASE_URL}/checkout`, clientInfo).then((res) => {
      console.log(res.data);
      setClientInfo(initialClientInfo);
      const ordine = res.data;
      navigate("/recipt", { state: { ordine } });
      localStorage.clear();
    });
  };

  return (
    <div className="container">
      <form className="row g-3" onSubmit={handleSubmit}>
        {/* CLIENT INFOS */}

        {/* ANAGRAFICI */}

        {/* NOME */}
        <div className="col-12 col-md-6 col-lg-3">
          <label htmlFor="first_name" className="form-label">
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            value={clientInfo.first_name}
            onChange={handleInputChange}
            placeholder="Es. Mario"
            required
          />
        </div>
        {/* COGNOME */}
        <div className="col-12 col-md-6 col-lg-3">
          <label htmlFor="last_name" className="form-label">
            Cognome
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            value={clientInfo.last_name}
            onChange={handleInputChange}
            placeholder="Es. Rossi"
            required
          />
        </div>
        {/* EMAIL */}
        <div className="col-12 col-lg-6">
          <label htmlFor="email" className="form-label">
            E-Mail
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={clientInfo.email}
            onChange={handleInputChange}
            placeholder="Es. mario.rossi@gmail.com"
            required
          />
        </div>

        {/* DATI INDIRIZZO */}

        <div className="col-12 col-md-4">
          <label htmlFor="country" className="form-label">
            Paese
          </label>
          <select
            className="form-select"
            id="country"
            value={clientInfo.country}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Seleziona provincia
            </option>
            <option value="italy">Italia</option>
            <option value="france">Francia</option>
            <option value="spain">Spagna</option>
          </select>
        </div>

        {/* CITTÁ */}

        <div className="col-12 col-md-4">
          <label htmlFor="city" className="form-label">
            Cittá
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            value={clientInfo.city}
            onChange={handleInputChange}
            placeholder="Es. Roma"
            required
          />
        </div>

        {/* CODICE POSTALE */}

        <div className="col-12 col-md-4">
          <label htmlFor="postal_code" className="form-label">
            Codice Postale
          </label>
          <input
            type="text"
            className="form-control"
            id="postal_code"
            value={clientInfo.postal_code}
            onChange={handleInputChange}
            placeholder="Es. 00031"
            pattern="\d{5}"
            maxLength={5}
            required
          />
        </div>

        {/* NOME STRADA INDIRIZZO */}

        <div className="col-12 col-md-9">
          <label htmlFor="street" className="form-label">
            Indirizzo
          </label>
          <input
            type="text"
            className="form-control"
            id="street"
            value={clientInfo.street}
            onChange={handleInputChange}
            placeholder="Es. Via Roma"
            required
          />
        </div>

        {/* NUMERO CIVICO */}

        <div className="col-12 col-md-3">
          <label htmlFor="civic_number" className="form-label">
            Numero Civico
          </label>
          <input
            type="number"
            className="form-control"
            id="civic_number"
            value={clientInfo.civic_number}
            onChange={handleInputChange}
            placeholder="Es. 123"
            max={9999}
            required
          />
        </div>

        {/* DISCOUNT CODE */}
        <div className="col-12">
          <label htmlFor="user_discount_code" className="form-label">
            Hai un codice sconto? Usalo qui
          </label>
          <input
            type="text"
            className="form-control"
            id="user_discount_code"
            value={clientInfo.user_discount_code}
            onChange={handleInputChange}
          />
        </div>

        {/* RIEPILOGO CARRELLO DA AGGIUNGE */}

        <div className="col-12">
          <h5>Riepilogo Carrello</h5>
          {clientInfo.cart && clientInfo.cart.length > 0 ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Prodotto</th>
                    <th>Quantità</th>
                    <th>Prezzo unitario</th>
                    <th>Totale</th>
                  </tr>
                </thead>
                <tbody>
                  {clientInfo.cart.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>€{item.price}</td>
                      <td>€{(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3}>
                      <b>Totale ordine</b>
                    </td>
                    <td>
                      <b>
                        €
                        {/* {clientInfo.cart
                          .reduce(
                            (sum, item) => sum + item.price * item.quantity,
                            0
                          )
                          .toFixed(2)} */}
                        {clientInfo.cart
                          .reduce(
                            (sum, item) =>
                              sum + getFinalPrice(item) * item.quantity,
                            0
                          )
                          .toFixed(2)}
                      </b>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <div>Il carrello è vuoto.</div>
          )}
        </div>

        {/* SALVA I DATI INSERITI, TANTO IMPORTANTE, 
        CALCOLEREMO IL TOTALE FINALE NEL BACK CON VALIDAZIONE DEL CODICE SCONTO,
         BISOGNA TROVARE IL MODO PER MOSTRARLO FORSE? 
         ALTRIMENTI NON FACCIAMO VEDERE NULLA E NEL PAGAMENTO STRIPE SARÁ PRESENTE IL PREZZO SCONTATO 
         SE IL CODICE É VALIDO */}

        <div className="col-12 col-md-3">
          <button className="btn btn-primary w-100" type="submit">
            Paga ora
            {/* (**Inserisci i dati per procedere col pagamento) */}
          </button>
        </div>
      </form>

      {/* <h3 className="mt-5">PAGAMENTO CON STRIPE</h3> */}

      <Payment />
      {/* PARTE FRONT CON STRIPE, GESTIREMO DOPO MA NON SO ANCORA BENE COME, 
        SICURO CHIAMATA API CHE CREA paymentIntent E CON UN res.json RIPORTA IL client_secret,
         NECESSARIO AL FRONT */}
      {/* <div className="card-footer d-flex flex-column flex-md-row justify-content-between">
        <Link to={-1} className="btn btn-outline-secondary my-3">
          Torna indietro
        </Link>
        <Link to="/recipit" className="btn btn-primary my-3 disabled">
          Paga ora
        </Link>
      </div> */}
    </div>
  );
}
