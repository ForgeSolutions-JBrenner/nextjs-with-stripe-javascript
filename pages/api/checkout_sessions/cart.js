/*
 * Product data can be loaded from anywhere. In this case, we’re loading it from
 * a local JSON file, but this could also come from an async call to your
 * inventory management service, a database query, or some other API call.
 *
 * The important thing is that the product info is loaded from somewhere trusted
 * so you know the pricing information is accurate.
 */
import inventory from "../../../data/Products";

import Stripe from "stripe";

const { validateCartItems } = require("use-shopping-cart/utilities");
export default async function handler(req, res) {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_KEY);
  if (req.method === "POST") {
    try {
      // Validate the cart details that were sent from the client.
      const productJSON = req.body; //optional depending on codebase or requirements JSON.parse(req.body)
      const line_items = validateCartItems(inventory, productJSON);
      const hasSubscription = line_items.find((item) => {
        return !!item.price_data.recurring;
      });
      // Create Checkout Sessions from body params.
      const params = {
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_address_collection: {
          allowed_countries: ["US", "CA"],
        },
        line_items,
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/useshoppingcart`,
        mode: hasSubscription ? "subscription" : "payment",
      };

      const checkoutSession = await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      console.log(err);
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
