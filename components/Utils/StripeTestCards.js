import React from "react";

 export default function StripeTestCards() {
  return (
    <div>
      Use any of the{" "}
      <a href="https://stripe.com/docs/testing#cards">Stripe Test Cards </a>
      for this demo, e.g.{" "}
      <div className="card-number">
        4242<span></span>4242<span></span>4242<span></span>4242
      </div>
      .
    </div>
  );
};

