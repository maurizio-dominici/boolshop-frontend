import { createContext, useState } from "react";
import axios from "axios";

export const ParfumeAPIContext = createContext();

export const ParfumeAPIProvider = ({ children }) => {
  const [visualization, setVisualization] = useState("grid"); // "grid" or "list"
  const [parfumes, setParfumes] = useState([]);
  const [recents, setRecents] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = "http://localhost:3000/parfumes";

  const searchParfumes = (
    query,
    brandSlug,
    gender,
    minPrice,
    maxPrice,
    orderBy,
    size,
    discounted
  ) => {
    // if (!query.trim()) {
    //   setParfumes([]);
    //   setLoading(false);
    //   setError(null);
    //   return;
    // }

    setLoading(true);

    const params = new URLSearchParams();
    params.append("product_name", query);
    if (brandSlug) params.append("brand_slug", brandSlug);
    if (gender) params.append("gender", gender);
    if (minPrice) params.append("min_price", minPrice);
    if (maxPrice) params.append("max_price", maxPrice);
    if (orderBy) params.append("order_by", orderBy);
    if (size) params.append("size", size);
    if (discounted) params.append("discounted", discounted);

    axios
      .get(`${BASE_URL}?${params.toString()}`)
      .then((response) => {
        console.log(response);
        setParfumes(response.data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
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
        // filters,
        // validateFilters,
        // updateFilters,
        searchParfumes,
        recents,
        getRecentsParfumes,
        bestSellers,
        getBestSellersParfumes,
        visualization,
        setVisualization,
      }}
    >
      {children}
    </ParfumeAPIContext.Provider>
  );
};
