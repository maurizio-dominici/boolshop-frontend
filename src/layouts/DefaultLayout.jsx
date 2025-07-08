import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import TopMessage from "../components/ui/TopMessage";
import CartPopup from "../components/ui/CartPopup";
// import VisualizationButton from "../components/ui/VisualizationButton";
import Footer from "../components/footer";

export default function DefaultLayout() {
  return (
    <>
      <TopMessage />
      {/* <VisualizationButton /> */}
      <CartPopup />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
