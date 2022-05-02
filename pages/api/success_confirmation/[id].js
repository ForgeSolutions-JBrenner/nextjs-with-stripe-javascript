import Stripe from "stripe";
const stripe = require("stripe")(process.env.SECRET_KEY);

export default async function handler(req, res) {
  const { id } = req.query;
  if (id.includes("cs")) {
    const session = await stripe.checkout.sessions.retrieve(id);
    res.status(200).json({ session });
  } else {
    const session = await stripe.paymentIntents.retrieve(id);
    res.status(200).json({ session });
  }
}
