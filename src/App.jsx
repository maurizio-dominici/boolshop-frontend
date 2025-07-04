import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import AboutUs from "./pages/AboutUs";
import HomePage from "./pages/HomePage";
import BestSellersSectionListPage from "./pages/section_pages/best_seller_pages/BestSellersSectionListPage";
import LatestArrivalsSectionListPage from "./pages/section_pages/latest_sellers_pages/LatestArrivalsSectionListPage";
import { ParfumeAPIProvider } from "./context/ParfumesContext";
import SearchResults from "./pages/section_pages/hero_section_pages/SearchResults";
import ProductDetailsPage from "./components/homepage_components/ProductDetailsPage";

export default function App() {
  return (
    <ParfumeAPIProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/parfumes" element={<SearchResults />} />

            {/* Sezioni prodotto */}
            <Route
              path="/bestsellers"
              element={<BestSellersSectionListPage />}
            />
            <Route
              path="/recents"
              element={<LatestArrivalsSectionListPage />}
            />

            {/* Dettaglio prodotto */}
            <Route path="/product/:id" element={<ProductDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ParfumeAPIProvider>
  );
}
