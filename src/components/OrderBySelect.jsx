import React from "react";

export default function OrderBySelect({ value, onChange }) {
  return (
    <div>
      <label htmlFor="order-by" className="form-label">
        Ordina per
      </label>
      <select
        id="order-by"
        className="form-select"
        value={value}
        onChange={onChange}
      >
        <option value="">Ordina per...</option>
        <option value="products.price ASC">Prezzo crescente</option>
        <option value="products.price DESC">Prezzo decrescente</option>
        <option value="products.name ASC">Nome A-Z</option>
        <option value="products.name DESC">Nome Z-A</option>
        <option value="products.size_ml ASC">Min Size</option>
        <option value="products.size_ml DESC">Max Size</option>
      </select>
    </div>
  );
}
