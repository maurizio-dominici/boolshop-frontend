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
    colorPrimary: "#06062a",
    colorText: "#06062a",
    colorTextSecondary: "#06062a",
    iconColor: "#e7c75a",
    spacingUnit: "2px",
    borderRadius: "4px",
  },
};

// --- Utility prezzi e sconti per coerenza con le altre pagine ---
function getOriginalPrice(item) {
  const price =
    item.price ?? item.productOriginalPrice ?? item.productFinalPrice ?? 0;
  return Number(price).toFixed(2);
}
function getFinalPrice(item) {
  if (item.discount && item.discount.discount_amount) {
    const discounted =
      (item.price ?? item.productFinalPrice ?? 0) -
      ((item.price ?? item.productFinalPrice ?? 0) *
        item.discount.discount_amount) /
        100;
    return Number(discounted).toFixed(2);
  }
  return Number(item.productFinalPrice ?? item.price ?? 0).toFixed(2);
}

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
    <div className="page-container">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card shadow-sm border-0 rounded-4 p-4">
              <h1 className="mb-4 fw-bold d-flex align-items-center gap-2">
                <i className="fa-solid fa-file-invoice-dollar text-primary"></i>
                Riepilogo Ordine & Pagamento
              </h1>
              {/* Dati Cliente */}
              <div className="mb-4">
                <table className="table table-borderless mb-0">
                  <tbody>
                    <tr>
                      <th className="text-end" style={{ width: "180px" }}>
                        Nome:
                      </th>
                      <td>
                        {ordine.first_name} {ordine.last_name}
                      </td>
                    </tr>
                    <tr>
                      <th className="text-end">Email:</th>
                      <td>{ordine.email}</td>
                    </tr>
                    <tr>
                      <th className="text-end">Paese:</th>
                      <td>{ordine.country}</td>
                    </tr>
                    <tr>
                      <th className="text-end">Città:</th>
                      <td>{ordine.city}</td>
                    </tr>
                    <tr>
                      <th className="text-end">CAP:</th>
                      <td>{ordine.postal_code}</td>
                    </tr>
                    <tr>
                      <th className="text-end">Indirizzo:</th>
                      <td>
                        {ordine.street} {ordine.civic_number}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Tabella prodotti */}
              <div className="table-responsive mb-4">
                <table className="table cart-table-modern align-middle">
                  <thead>
                    <tr>
                      <th>Prodotto</th>
                      <th>Quantità</th>
                      <th>Prezzo unitario</th>
                      <th>Totale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checkoutCart.cartProducts.map((item) => (
                      <tr key={item.id}>
                        <td>{item.productName}</td>
                        <td>{item.quantity}</td>
                        <td>{getOriginalPrice(item)} €</td>
                        <td>{getFinalPrice(item)} €</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Totali riepilogo */}
              <ul className="list-group mb-4">
                <li className="list-group-item d-flex justify-content-between">
                  <span className="fw-semibold">Totale prodotti:</span>
                  <span>{ordine.total_price} €</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span className="fw-semibold">Spedizione:</span>
                  <span>{ordine.shipping_price} €</span>
                </li>
                {ordine.discountAmount !== 0 && (
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-semibold">Sconto:</span>
                    <span>{ordine.discountAmount} %</span>
                  </li>
                )}
                <li className="list-group-item d-flex justify-content-between">
                  <span className="fw-semibold">Totale finale:</span>
                  <span className="text-success fw-bold">
                    {(
                      Number(ordine.final_price) + Number(ordine.shipping_price)
                    ).toFixed(2)}
                    €
                  </span>
                </li>
              </ul>
              {/* Form pagamento Stripe */}
              <div className="mt-4">
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
      </div>
    </div>
  );
}
