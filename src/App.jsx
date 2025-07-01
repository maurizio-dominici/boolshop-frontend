import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import AboutUs from "./pages/AboutUs";
import Homepage from "./pages/HomePage";
import BestSellerSectionListPage from "./pages/section_pages.jsx/best_seller_pages/BestSellerSectionListPage";
import BestSellerSectionDettailsPage from "./pages/section_pages.jsx/best_seller_pages/BestSellerSectionDettailsPage";
import LatestArrivalsSectionDetailsPage from "./pages/section_pages.jsx/latest_sellers_pages/LatestArrivalsSectionDetailsPage";
import LatestArrivalsSectionListPage from "./pages/section_pages.jsx/latest_sellers_pages/LatestArrivalsSectionListPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/about-us" element={<AboutUs />} />
          {/* Creazione rotte per la Best Seller page e la Best Seller Dettails Page */}
          <Route path="/bestseller" element={<BestSellerSectionListPage />} />
          <Route
            path="/latestarrivals"
            element={<LatestArrivalsSectionListPage />}
          />
          <Route
            path="/bestseller/dettails"
            element={<BestSellerSectionDettailsPage />}
          />
          <Route
            path="/latestarrivals/details"
            element={<LatestArrivalsSectionDetailsPage />}
          />
          {/* FINE Creazione rotte per la Best Seller page e la Best Seller Dettails Page */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
