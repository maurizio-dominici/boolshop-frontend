import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import AboutUs from "./pages/AboutUs";
import Homepage from "./pages/HomePage";
import BestSellersSectionListPage from "./pages/section_pages/best_seller_pages/BestSellersSectionListPage";
import BestSellersSectionDetailsPage from "./pages/section_pages/best_seller_pages/BestSellersSectionDetailsPage";
import LatestArrivalsSectionDetailsPage from "./pages/section_pages/latest_sellers_pages/LatestArrivalsSectionDetailsPage";
import LatestArrivalsSectionListPage from "./pages/section_pages/latest_sellers_pages/LatestArrivalsSectionListPage";
import { ParfumeAPIProvider } from "./context/ParfumesContext";
import SearchResults from "./pages/section_pages/hero_section_pages/SearchResults";

export default function App() {
  return (
    <ParfumeAPIProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<Homepage />} />
            <Route path="/parfumes" element={<SearchResults />} />
            <Route path="/about-us" element={<AboutUs />} />
            {/* Creazione rotte per la Best Seller page e la Best Seller Dettails Page */}
            <Route
              path="/bestsellers"
              element={<BestSellersSectionListPage />}
            />
            <Route
              path="/bestsellers/:id"
              element={<BestSellersSectionDetailsPage />}
            />
            <Route
              path="/recents"
              element={<LatestArrivalsSectionListPage />}
            />

            <Route
              path="/recents/details/:id"
              element={<LatestArrivalsSectionDetailsPage />}
            />

            {/* FINE Creazione rotte per la Best Seller page e la Best Seller Dettails Page */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ParfumeAPIProvider>
  );
}
