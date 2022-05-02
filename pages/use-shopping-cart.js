import React from "react";
import Layout from "../components/Layout/Layout";
import Cart from "../components/Shopping Cart/Cart";
import CartSummary from "../components/Shopping Cart/CartSummary";
import Products from "../components/Shopping Cart/Products";
function useshoppingcart() {
  return (
    <Layout>
      <div className="page-container">
        <h1>Shopping Cart</h1>
        <p>
          Powered by the{" "}
          <a href="https://useshoppingcart.com">use-shopping-cart</a> React
          hooks library.
        </p>
        <Cart>
          <CartSummary />
          <Products />
        </Cart>
      </div>
    </Layout>
  );
}

export default useshoppingcart;
