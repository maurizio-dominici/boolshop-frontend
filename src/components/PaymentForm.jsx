import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
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

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(undefined, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

    if (stripeError) {
      setError(stripeError.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // Redirect SPA-style
      navigate("/success", { state: { ordine } });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
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
