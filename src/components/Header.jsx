import Navbar from "../components/Navbar";

export default function Header() {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center bg-body-tertiary">
        <Navbar />
        <i class="bi bi-cart3 m-3 icon-xl"></i>
      </div>
    </>
  );
}
