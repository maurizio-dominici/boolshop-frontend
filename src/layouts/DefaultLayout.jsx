import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import TopMessage from "../components/ui/TopMessage";
import CartPopup from "../components/ui/CartPopup";
import Footer from "../components/footer";

export default function DefaultLayout() {
  return (
    <>
      <TopMessage />
      <CartPopup />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
