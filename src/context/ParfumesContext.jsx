import { createContext, useState } from "react";
import axios from "axios";

export const ParfumeAPIContext = createContext();

export const ParfumeAPIProvider = ({ children }) => {
  const [parfumes, setParfumes] = useState([]);
  const [recents, setRecents] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    productName: "",
    brandSlug: "",
    gender: "",
    minPrice: "",
    maxPrice: "",
    orderBy: "",
    size: "",
    discounted: "",
  });

  const validateFilters = (filters) => {
    if (filters.minPrice && isNaN(filters.minPrice)) {
      return "Il prezzo minimo deve essere un numero.";
    }
    if (filters.minPrice && Number(filters.minPrice) < 0) {
      return "Il prezzo minimo non può essere minore di 0.";
    }
    if (filters.minPrice && Number(filters.minPrice) > 1000) {
      return "Il prezzo minimo non può essere maggiore di 1000.";
    }
    if (filters.maxPrice && isNaN(filters.maxPrice)) {
      return "Il prezzo massimo deve essere un numero.";
    }
    if (filters.maxPrice && Number(filters.maxPrice) < 0) {
      return "Il prezzo massimo non può essere minore di 0.";
    }
    if (filters.maxPrice && Number(filters.maxPrice) > 1000) {
      return "Il prezzo massimo non può essere maggiore di 1000.";
    }
    if (
      filters.minPrice &&
      filters.maxPrice &&
      parseFloat(filters.minPrice) > parseFloat(filters.maxPrice)
    ) {
      return "Il prezzo minimo non può essere maggiore del prezzo massimo.";
    }
    if (filters.productName && filters.productName.length > 50) {
      return "Il nome del prodotto non può essere più lungo di 50 caratteri.";
    }
    if (
      filters.brandSlug &&
      ![
        "dior",
        "chanel",
        "calvin_klein",
        "giorgio_armani",
        "maison_lumière",
        "nordica_scents",
      ].includes(filters.brandSlug)
    ) {
      return "Marca non valida. Scegli tra una di queste: Dior, Chanel, Calvin Klein, Giorgio Armani, Maison Lumière, Nordica Scents.";
    }
    if (
      filters.size &&
      !["xs", "s", "m", "l", "xl", "xxl"].includes(filters.size)
    ) {
      return "Formato non valido. Scegli tra xs, s, m, l, xl, xxl.";
    }
    if (
      filters.gender &&
      !["male", "female", "unisex"].includes(filters.gender)
    ) {
      return "Genere non valido. Scegli tra Uomo, Donna o Unisex.";
    }
    const validOrderBy = [
      "",
      "products.price ASC",
      "products.price DESC",
      "products.name ASC",
      "products.name DESC",
      "products.size_ml ASC",
      "products.size_ml DESC",
    ];
    if (filters.orderBy && !validOrderBy.includes(filters.orderBy)) {
      return "Ordinamento non valido.";
    }
    return null; // Nessun errore
  };

  // Funzione per aggiornare i filtri
  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const BASE_URL = "http://localhost:3000/parfumes";

  const searchParfumes = (customFilters) => {
    setLoading(true);
    // Usa i filtri passati o quelli nello state
    const activeFilters = customFilters || filters;
    const params = new URLSearchParams();
    if (activeFilters.productName)
      params.append("product_name", activeFilters.productName);
    if (activeFilters.brandSlug)
      params.append("brand_slug", activeFilters.brandSlug);
    if (activeFilters.gender) params.append("gender", activeFilters.gender);
    if (activeFilters.minPrice)
      params.append("min_price", activeFilters.minPrice);
    if (activeFilters.maxPrice)
      params.append("max_price", activeFilters.maxPrice);
    if (activeFilters.orderBy) params.append("order_by", activeFilters.orderBy);
    if (activeFilters.size) params.append("size", activeFilters.size);
    if (activeFilters.discounted)
      params.append("discounted", activeFilters.discounted);

    axios
      .get(`${BASE_URL}?${params.toString()}`)
      .then((response) => {
        setParfumes(response.data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setParfumes([]);
        setLoading(false);
      });
  };

  const getRecentsParfumes = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/recents`)
      .then((res) => {
        setRecents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setRecents([]);
        setLoading(false);
      });
  };

  const getBestSellersParfumes = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/bestsellers`)
      .then((res) => {
        setBestSellers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setBestSellers([]);
        setLoading(false);
      });
  };

  return (
    <ParfumeAPIContext.Provider
      value={{
        parfumes,
        loading,
        error,
        filters,
        validateFilters,
        updateFilters,
        searchParfumes,
        recents,
        getRecentsParfumes,
        bestSellers,
        getBestSellersParfumes,
      }}
    >
      {children}
    </ParfumeAPIContext.Provider>
  );
};
