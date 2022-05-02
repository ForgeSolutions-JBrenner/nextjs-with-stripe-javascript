import {
  CURRENCY,
  MIN_AMOUNT,
  MAX_AMOUNT
} from "../../../config";
import { formatAmountForStripe } from "../../../utils/stripe-helpers";

import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }

  const { amount, payment_intent_id } = req.body;

  //validate the amount that was passwed from the client
  if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
    res.status(500).json({ statusCode: 400, message: "Invalid Amount." });
    return;
  }
  if (payment_intent_id) {
    try {
      const current_intent = await stripe.paymentIntents.retrieve(
        payment_intent_id
      );

      //if paymentintent has been created, just update the amount
      if (current_intent) {
        const updated_intent = await stripe.paymentIntents.update(
          payment_intent_id,
          {
            amount: formatAmountForStripe(amount, CURRENCY),
          }
        );
        res.status(200).json(updated_intent);
        console.log(updated_intent);
        return;
      }
    } catch (error) {
      if (error.code !== "resource_missing") {
        const errorMessage =
          error instanceof Error ? error.message : "Internal server error";
        res.status(500).json({ statusCode: 500, message: errorMessage });
        return;
      }
    }
  }

  try {
    //create paymentintent from body params.
    const params = (Stripe.PaymentIntentCreateParams = {
      amount: formatAmountForStripe(amount, CURRENCY),
      currency: CURRENCY,
      description: process.env.STRIPE_PAYMENT_DESCRIPTION ?? "",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    const payment_intent = await stripe.paymentIntents.create(params);
    res.status(200).json(payment_intent);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
}
