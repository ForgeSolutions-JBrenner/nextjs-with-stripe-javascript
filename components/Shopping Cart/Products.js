import React from "react";
import products from "../../data/products";
import { formatCurrencyString } from "use-shopping-cart";
import { useShoppingCart } from "use-shopping-cart";

export default function Products() {
  const { addItem, removeItem } = useShoppingCart();
  return (
    <section className="products">
      {products.map((product) => (
        <div key={product.id} className="product">
          <img
            style={{ borderRadius: "10px" }}
            src={product.image}
            alt={product.name}
          />
          <h2>{product.name}</h2>
          <p className="price">
            {formatCurrencyString({
              value: product.price,
              currency: product.currency,
            })}
          </p>
          <button
            className="cart-style-background"
            onClick={() => {
              addItem(product);
            }}
          >
            Add to Cart
          </button>
          <button
            className="cart-style-background"
            onClick={() => removeItem(product.id)}
          >
            Remove Item
          </button>
        </div>
      ))}
    </section>
  );
}
