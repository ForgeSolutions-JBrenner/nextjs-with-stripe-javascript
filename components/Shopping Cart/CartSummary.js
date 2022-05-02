import React, { useState, useEffect } from "react";
import StripeTestCards from "../Utils/StripeTestCards";
import { useShoppingCart } from "use-shopping-cart";
import { fetchPostJSON } from "../../utils/api-helpers";

export default function CartSummary() {
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);
  const [errorMessage, seterrorMessage] = useState(null);
  const {
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
  } = useShoppingCart();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    seterrorMessage(null);

    //fetch JSON response form checkout session
    const response = await fetchPostJSON(
      "/api/checkout_sessions/cart",
      cartDetails
    );

    if (response.statusCode > 399) {
      console.error(response.message);
      seterrorMessage(response.message);
      setLoading(false);
      return;
    }
    clearCart();
    const sessionId = JSON.stringify({ sessionId: response.id });
    console.log(sessionId);
    //redierectToCheckout(response.id) not functioning properly, workaround using window.location.href
    window.location.href = response.url;
  };
  return (
    <form onSubmit={handleCheckout}>
      <h2>Cart Summary</h2>
      {errorMessage ? (
        <p style={{ color: "red" }}>Error: {errorMessage}</p>
      ) : null}

      {/* This is where we will be rendering our cart */}
      <p suppressHydrationWarning>
        <strong>Selected Products: </strong>
        {cartCount}
      </p>
      <p suppressHydrationWarning>
        <strong>Cart Total: </strong>
        {formattedTotalPrice}
      </p>
      {/* Redirects user to Stripe */}
      <StripeTestCards />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          className="cart-style-background"
          style={{ marginRight: "10px" }}
          type="button"
          onClick={clearCart}
        >
          Clear Cart
        </button>
        <button
          className="cart-style-background"
          type="submit"
          disabled={cartEmpty || loading}
        >
          Checkout
        </button>
      </div>
    </form>
  );
}
