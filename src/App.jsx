import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import AboutUs from "./pages/AboutUs";
import Homepage from "./pages/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
