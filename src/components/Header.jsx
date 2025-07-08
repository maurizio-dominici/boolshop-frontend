import Navbar from "../components/Navbar";

export default function Header() {
  return (
    <>
      <div className="bg-body-tertiary position-sticky top-0 z-3 shadow-sm">
        <Navbar />
      </div>
    </>
  );
}
