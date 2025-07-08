import {
  useStripe,
  useElements,
  // CardNumberElement,
  // CardExpiryElement,
  // CardCvcElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentForm({ ordine }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:5173/recipt`, // PORTA ALLA PAGINA DI SUCCESSO
      },
      redirect: "if_required",
    });

    if (stripeError) {
      setError(stripeError.message);
      // USIAMO IL TOPMESSAGE PER MOSTRARE L'ERRORE (?)
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      navigate("/recipt", { state: { ordine } });
    }
    localStorage.clear();
    setLoading(false);
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <PaymentElement />

      <button
        className="btn btn-primary mt-3"
        type="submit"
        disabled={!stripe || loading}
      >
        {loading ? "Pagamento in corso..." : "Paga"}
      </button>
      {error && <div className="text-danger mt-2">{error}</div>}
    </form>
  );
}
