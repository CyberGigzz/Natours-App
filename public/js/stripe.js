/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";
// import { Stripe } from "stripe";
// const stripe = Stripe(
//   "pk_test_51OQFF9AUgTYYrnBZgahzqjOc8nEr2b2aBrEugjW1hYRcY4QigYHMlJ0pbXG2WArE9M3dSKLljC7DohH9AEc9BOek00nekW9Tce"
// );
import { loadStripe } from "@stripe/stripe-js";

export const bookTour = async (tourId) => {
  const stripe = await loadStripe(
    "pk_test_51OQFF9AUgTYYrnBZgahzqjOc8nEr2b2aBrEugjW1hYRcY4QigYHMlJ0pbXG2WArE9M3dSKLljC7DohH9AEc9BOek00nekW9Tce"
  );
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};
