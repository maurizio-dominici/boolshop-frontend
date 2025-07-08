import React from "react";

export default function DiscountedSelect({ value, onChange }) {
  return (
    <div>
      <label htmlFor="discounted" className="form-label">
        Sconto
      </label>
      <select
        id="discounted"
        className="form-select"
        value={value}
        onChange={onChange}
      >
        <option value="">Tutti</option>
        <option value="true">Scontati</option>
        <option value="false">Non Scontati</option>
      </select>
    </div>
  );
}
