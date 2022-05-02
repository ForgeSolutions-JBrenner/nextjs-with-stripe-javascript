import React from "react";
import { CartProvider } from "use-shopping-cart";

export default function Cart({ children }) {
  return (
    <CartProvider
      mode="payment"
      cartMode="checkout-session"
      stripe={process.env.NEXT_PUBLIC_PUBLISHABLE_KEY}
      currency="usd"
    >
      <>{children}</>
    </CartProvider>
  );
}
