import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import AboutUs from "./pages/AboutUs";
import Homepage from "./pages/HomePage";
import BestSellersSectionListPage from "./pages/section_pages/best_seller_pages/BestSellersSectionListPage";
import LatestArrivalsSectionListPage from "./pages/section_pages/latest_sellers_pages/LatestArrivalsSectionListPage";
import { ParfumeAPIProvider } from "./context/ParfumesContext";
import SearchResults from "./pages/section_pages/hero_section_pages/SearchResults";
import ProductDetailsPage from "./pages/section_pages/latest_sellers_pages/ProductDetailsPageRecents";

export default function App() {
  return (
    <ParfumeAPIProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<Homepage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/about-us" element={<AboutUs />} />

            {/* Lista dei Best Seller */}
            <Route
              path="/bestsellers"
              element={<BestSellersSectionListPage />}
            />

            {/* Lista degli Ultimi Arrivi */}
            <Route
              path="/recents"
              element={<LatestArrivalsSectionListPage />}
            />

            {/* Dettagli del prodotto (valido sia per bestsellers che recents) */}
            <Route path="/product/:id" element={<ProductDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ParfumeAPIProvider>
  );
}
