import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXX");
