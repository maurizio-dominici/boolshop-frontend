import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../../components/PaymentForm";

// QUI CI VA LA VOSTRA CHIAVE PUBBLICA DI STRIPE
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const appearance = {
  theme: "stripe",
  variables: {
    colorPrimary: "#000000",
    spacingUnit: "2px",
    borderRadius: "4px",
  },
};

export default function PaymentPage() {
  const location = useLocation();
  console.log("PaymentPage location.state:", location.state);
  const navigate = useNavigate();
  const { ordine, checkoutCart, clientSecret } = location.state || {};

  useEffect(() => {
    if (!ordine || !clientSecret) {
      return <h1>Dati mancanti</h1>;
    }
  }, [ordine, clientSecret, navigate]);

  if (!ordine || !clientSecret) return null;

  return (
    <div className="container my-5">
      <div className="row justify-content-center g-4">
        <div className="col-12 col-lg-7">
          <div className="card shadow-sm border-0 rounded-4 p-4 mb-4">
            <h4 className="mb-4 fw-bold d-flex align-items-center gap-2">
              <i className="fa-solid fa-receipt text-primary"></i>
              Riepilogo Ordine
            </h4>
            <div className="mb-3">
              <div>
                <b>Nome:</b> {ordine.first_name} {ordine.last_name}
              </div>
              <div>
                <b>Email:</b> {ordine.email}
              </div>
              <div>
                <b>Paese:</b> {ordine.country}
              </div>
              <div>
                <b>Città:</b> {ordine.city}
              </div>
              <div>
                <b>CAP:</b> {ordine.postal_code}
              </div>
              <div>
                <b>Indirizzo:</b> {ordine.street} {ordine.civic_number}
              </div>
            </div>
            <hr />
            <h5 className="fw-bold d-flex align-items-center gap-2 mb-3">
              <i className="fa-solid fa-cart-shopping text-secondary"></i>
              Dettagli Carrello
            </h5>
            <ul className="list-group mb-3">
              {checkoutCart.cartProducts.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-2"
                  style={{ background: "transparent" }}
                >
                  <span>
                    <span className="fw-semibold">{item.productName}</span>
                    <span className="text-muted ms-2">x {item.quantity}</span>
                  </span>
                  <span className="fw-bold text-success">
                    {item.productFinalPrice} €
                  </span>
                </li>
              ))}
            </ul>
            <div className="mb-2">
              <b>Totale prodotti:</b> {ordine.total_price} €
            </div>
            <div className="mb-2">
              <b>Spedizione:</b> {ordine.shipping_price} €
            </div>
            {ordine.discountAmount !== 0 && (
              <div className="mb-2">
                <b>Sconto:</b> {ordine.discountAmount} %
              </div>
            )}
            <div className="mb-2">
              <b>Totale finale:</b>{" "}
              <span className="text-success">{ordine.final_price} €</span>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-5">
          <div className="card shadow-sm border-0 rounded-4 p-4">
            <h5 className="mb-4 fw-bold d-flex align-items-center gap-2">
              <i className="fa-solid fa-credit-card text-primary"></i>
              Pagamento Sicuro
            </h5>
            <Elements
              stripe={stripePromise}
              options={{ clientSecret, appearance }}
            >
              <PaymentForm ordine={ordine} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
}
