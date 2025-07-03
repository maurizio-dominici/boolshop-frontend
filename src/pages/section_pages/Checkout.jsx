import { useState, useEffect } from "react";

export default function Checkout({ cart }) {
  return (
    <div className="container">
      <form className="row g-3">
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
            placeholder="Es. Mario"
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
            placeholder="Es. Rossi"
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
            placeholder="Es. mario.rossi@gmail.com"
          />
        </div>

        {/* DATI INDIRIZZO */}

        <div className="col-4">
          <label htmlFor="country" className="form-label">
            Paese
          </label>
          <select className="form-select" id="country" defaultValue="">
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
            placeholder="Es. Roma"
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
            placeholder="Es. 00031"
            pattern="\d{5}"
            maxLength={5}
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
            placeholder="Es. Via Roma"
          />
        </div>

        {/* NUMERO CIVICO */}

        <div className="col-3">
          <label htmlFor="civic_number" className="form-label">
            Numero Civico
          </label>
          <input
            type="text"
            className="form-control"
            id="civic_number"
            placeholder="Es. 123"
            max={9999}
          />
        </div>

        {/* DISCOUNT CODE */}
        <div className="col-12">
          <label htmlFor="user_discount_code" className="form-label">
            Hai un codice sconto? Usalo qui
          </label>
          <input type="text" className="form-control" id="user_discount_code" />
        </div>
      </form>
    </div>
  );
}
