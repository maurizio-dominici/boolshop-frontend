import React from "react";

const brands = [
  { value: "", label: "Tutte le marche" },
  { value: "dior", label: "Dior" },
  { value: "chanel", label: "Chanel" },
  { value: "calvin_klein", label: "Calvin Klein" },
  { value: "giorgio_armani", label: "Giorgio Armani" },
  { value: "maison_lumière", label: "Maison Lumière" },
  { value: "nordica_scents", label: "Nordica Scents" },
];

const sizes = [
  { value: "", label: "Filtra per Size" },
  { value: "xs", label: "xs" },
  { value: "s", label: "s" },
  { value: "m", label: "m" },
  { value: "l", label: "l" },
  { value: "xl", label: "xl" },
  { value: "xxl", label: "xxl" },
];

const genders = [
  { value: "", label: "Tutti i generi" },
  { value: "male", label: "Uomo" },
  { value: "female", label: "Donna" },
  { value: "unisex", label: "Unisex" },
];

export default function Filters({ filters, onChange, onApply }) {
  // Handler generico per input/select
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <div className="card card-body mb-3">
      <div className="row row-cols-1 row-cols-md-3 g-3">
        {/* Nome prodotto */}
        <div className="col">
          <label htmlFor="product-name" className="form-label">
            Nome prodotto
          </label>
          <input
            id="product-name"
            name="productName"
            type="text"
            className="form-control"
            placeholder="Nome prodotto"
            value={filters.productName || ""}
            onChange={handleChange}
          />
        </div>
        {/* Size */}
        <div className="col">
          <label htmlFor="brand-size" className="form-label">
            Size
          </label>
          <select
            id="brand-size"
            name="size"
            className="form-select"
            value={filters.size || ""}
            onChange={handleChange}
          >
            {sizes.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        {/* Marca */}
        <div className="col">
          <label htmlFor="brand-slug" className="form-label">
            Marca
          </label>
          <select
            id="brand-slug"
            name="brandSlug"
            className="form-select"
            value={filters.brandSlug || ""}
            onChange={handleChange}
          >
            {brands.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
        {/* Genere */}
        <div className="col">
          <label htmlFor="gender" className="form-label">
            Genere
          </label>
          <select
            id="gender"
            name="gender"
            className="form-select"
            value={filters.gender || ""}
            onChange={handleChange}
          >
            {genders.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
        </div>
        {/* Prezzo minimo */}
        <div className="col">
          <label htmlFor="min-price" className="form-label">
            Prezzo minimo
          </label>
          <input
            id="min-price"
            name="minPrice"
            type="number"
            className="form-control"
            placeholder="Prezzo minimo"
            value={filters.minPrice || ""}
            onChange={handleChange}
          />
        </div>
        {/* Prezzo massimo */}
        <div className="col">
          <label htmlFor="max-price" className="form-label">
            Prezzo massimo
          </label>
          <input
            id="max-price"
            name="maxPrice"
            type="number"
            className="form-control"
            placeholder="Prezzo massimo"
            value={filters.maxPrice || ""}
            onChange={handleChange}
          />
        </div>
        {/* Bottone applica */}
        <div className="col">
          <button
            className="btn btn-primary w-100 mt-4"
            type="button"
            onClick={onApply}
          >
            Applica filtri
          </button>
        </div>
      </div>
    </div>
  );
}
