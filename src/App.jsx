import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import AboutUs from "./pages/AboutUs";
import HomePage from "./pages/HomePage";
import BestSellersSectionListPage from "./pages/section_pages/best_seller_pages/BestSellersSectionListPage";
import LatestArrivalsSectionListPage from "./pages/section_pages/latest_sellers_pages/LatestArrivalsSectionListPage";
import { ParfumeAPIProvider } from "./context/ParfumesContext";
import SearchResults from "./pages/section_pages/hero_section_pages/SearchResults";
import ProductDetailsPage from "./components/homepage_components/ProductDetailsPage";
import Checkout from "./pages/section_pages/Checkout";
import CartPage from "./pages/section_pages/CartPage";

export default function App() {
  return (
    <ParfumeAPIProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/parfumes" element={<SearchResults />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* Sezioni prodotto */}
            <Route
              path="/bestsellers"
              element={<BestSellersSectionListPage />}
            />
            <Route
              path="/recents"
              element={<LatestArrivalsSectionListPage />}
            />
            <Route path="/cart" element={<CartPage />} />

            {/* Dettaglio prodotto */}
            <Route path="/product/:slug" element={<ProductDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ParfumeAPIProvider>
  );
}
