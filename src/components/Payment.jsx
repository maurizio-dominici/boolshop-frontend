import { CardElement } from "@stripe/react-stripe-js";

export default function Payment() {
  return (
    <form>
      <label>Inserisci la tua carta</label>
      <CardElement />
      <button type="submit" disabled>
        Invia
      </button>
    </form>
  );
}
