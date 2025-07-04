import { useState, useEffect } from "react";
import axios from "axios";

// LA CHIAMATA API LA FACCIO QUI OPPURE LA FACCIAMO NEL CONTEXT E LA RICHIEDIAMO QUI? PER ORA LA FACCIO QUI

const BASE_URL = "http://localhost:3000";

// CARREL

export default function Checkout() {
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
    axios
      .post(`${BASE_URL}/checkout`, clientInfo)
      .then((res) => console.log(res.data));
    console.log("Dati cliente:", clientInfo);
    setClientInfo(initialClientInfo);
    localStorage.clear();
    // Qui potresti voler reindirizzare l'utente a una pagina di conferma o pagamento
  };

  return (
    <div className="container">
      <form className="row g-3" onSubmit={handleSubmit}>
        {/* CLIENT INFOS */}

        {/* ANAGRAFICI */}

        {/* NOME */}
        <div className="col-3">
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
        <div className="col-3">
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
        <div className="col-6">
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

        <div className="col-4">
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

        <div className="col-4">
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

        <div className="col-4">
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

        <div className="col-9">
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

        <div className="col-3">
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

        <div className="col-3">
          <button className="btn btn-primary" type="submit">
            Vai al pagamento
          </button>
        </div>
      </form>
    </div>
  );
}
