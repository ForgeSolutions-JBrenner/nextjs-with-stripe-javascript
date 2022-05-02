import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from "../../../config";
import { formatAmountForStripe } from "../../../utils/stripe-helpers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const amount = req.body.amount;
    try {
      //Validate the amount passed from the client.
      if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
        throw new Error("Invalid Amount");
      }
      //Create Checkout Session from body params
      const params = {
        line_items: [
          {
            price_data: {
              currency: "usd",
              unit_amount: formatAmountForStripe(amount, CURRENCY),
              product_data: {
                name: "brief description of product",
                description: "this is the description",
              },
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/donate-with-checkout`,
      };

      const checkoutSession = await stripe.checkout.sessions.create(params);
      res.status(200).json(checkoutSession);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
