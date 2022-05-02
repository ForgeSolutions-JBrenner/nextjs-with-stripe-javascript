import Stripe from "stripe";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_SECRET_KEY);

export default async function handler(req, res) {
  // const {quantity} = req.body.quantity
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1KrR0bJHor0NWRvvArajOqbN",
          quantity: 2,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.origin}/?result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/?canceled=true`,
    });
    res.redirect(303, session.url);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
}
