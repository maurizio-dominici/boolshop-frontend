import { createContext, useState } from "react";
import axios from "axios";

export const ParfumeAPIContext = createContext();

export const ParfumeAPIProvider = ({ children }) => {
  const [parfumes, setParfumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:3000/parfumes";

  const searchParfumes = (query) => {
    if (query.trim() === "") {
      setParfumes([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    axios
      .get(API_URL)
      .then((response) => {
        const filtered = response.data.filter(
          (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.brand_name.toLowerCase().includes(query.toLowerCase())
        );
        setParfumes(filtered);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setParfumes([]);
        setLoading(false);
      });
  };

  return (
    <ParfumeAPIContext.Provider
      value={{ parfumes, loading, error, searchParfumes }}
    >
      {children}
    </ParfumeAPIContext.Provider>
  );
};
