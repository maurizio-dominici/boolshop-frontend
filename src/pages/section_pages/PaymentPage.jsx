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
      <div className="row">
        <div className="col-7">
          <h4>Riepilogo Ordine</h4>
          <div>
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
          <h4>Dettagli Carrello</h4>
          <ul>
            {checkoutCart.cartProducts.map((item) => (
              <li key={item.id}>
                {item.productName} x {item.quantity} - €{item.productFinalPrice}
              </li>
            ))}
          </ul>
          <div>
            <b>Totale prodotti:</b> €{ordine.total_price}
          </div>
          <div>
            <b>Spedizione:</b> €{ordine.shipping_price}
          </div>
          <div>
            <b>Sconto:</b> -€{ordine.discountAmount}
          </div>
          <div>
            <b>Totale finale:</b> €{ordine.final_price}
          </div>
        </div>
        <div className="col-5">
          <Elements
            stripe={stripePromise}
            options={{ clientSecret, appearance }}
          >
            <PaymentForm ordine={ordine} />
          </Elements>
        </div>
      </div>
    </div>
  );
}
