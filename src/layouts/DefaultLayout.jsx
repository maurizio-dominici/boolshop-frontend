import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
