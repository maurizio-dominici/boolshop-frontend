import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import AboutUs from "./pages/AboutUs";
import HomePage from "./pages/HomePage";
import BestSellersSectionListPage from "./pages/section_pages/best_seller_pages/BestSellersSectionListPage";
import LatestArrivalsSectionListPage from "./pages/section_pages/latest_sellers_pages/LatestArrivalsSectionListPage";
import { ParfumeAPIProvider } from "./context/ParfumesContext";
import { TopMessageProvider } from "./context/TopMessageContext";
import { CartPopupProvider } from "./context/CartPopupContext";
import SearchResults from "./pages/section_pages/hero_section_pages/SearchResults";
import ProductDetailsPage from "./components/homepage_components/ProductDetailsPage";
import CheckoutPage from "./pages/section_pages/CheckoutPage";
import CartPage from "./pages/section_pages/CartPage";
import ReciptPage from "./pages/section_pages/ReciptPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./assets/stripe";
import PaymentPage from "./pages/section_pages/PaymentPage";
import ScrollToTop from "./utils/ScrollToTop";

export default function App() {
  return (
    <TopMessageProvider>
      <CartPopupProvider>
        <ParfumeAPIProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Elements stripe={stripePromise}>
              <Routes>
                <Route element={<DefaultLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/parfumes" element={<SearchResults />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/pagamento" element={<PaymentPage />} />
                  <Route path="/recipt" element={<ReciptPage />} />

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
                  <Route
                    path="/product/:slug"
                    element={<ProductDetailsPage />}
                  />

                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </Elements>
          </BrowserRouter>
        </ParfumeAPIProvider>
      </CartPopupProvider>
    </TopMessageProvider>
  );
}
