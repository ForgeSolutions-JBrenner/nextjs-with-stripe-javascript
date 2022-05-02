import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { fetchPostJSON } from "../utils/api-helpers";
import getStripe from "../utils/get-stripe";
import * as config from "../config";
import ElementsForm from "../components/Elements Checkout/ElementsForm";
import Layout from "../components/Layout/Layout";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_PUBLISHABLE_KEY
);

export default function Elementscheckout() {
  const [paymentIntent, setPaymentIntent] = useState(null);
  useEffect(() => {
    fetchPostJSON("/api/payment_intents", {
      amount: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP)
    }).then((data) => {
      setPaymentIntent(data);
    });
  }, [setPaymentIntent]);

  return (
    <Layout title="Donate with Elements | Next.js + JavaScript">
    <div className="page-container">
      <h1>Checkout with Elements</h1>
      <p>Donate to our project 💖</p>
      {paymentIntent ? (
        <>
          <pre> {paymentIntent.id}</pre>
          <Elements
            stripe={stripePromise}
            options={{
              appearance: {
                  theme: 'minimal',
                variables: {
                  colorIcon: "#0098d8",
                //   colorBackground: 'black',
                  colorText: 'black',
                  colorDanger: '#df1b41',
                  fontFamily: 'Ideal Sans, system-ui, sans-serif',
                  borderRadius: '4px',
                },
              },
              clientSecret: paymentIntent.client_secret,
            }}
          >
            <ElementsForm paymentIntent={paymentIntent} />
          </Elements>
        </>
      ) : (
        <>
          <p>Loading...</p>
          <p>{paymentIntent}</p>
        </>
      )}
    </div>
    </Layout>
  );
}
