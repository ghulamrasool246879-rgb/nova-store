
"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import {
  useCart,
  type CartProduct,
} from "./CartContext";

export default function AddToCartButton({
  product,
}: {
  product: CartProduct;
}) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1800);
  }

  return (
    <button
      className="button-primary details-cart-button"
      type="button"
      onClick={handleAddToCart}
    >
      {added ? <Check size={18} /> : <ShoppingBag size={18} />}
      {added ? "Added to cart!" : "Add to cart"}
    </button>
  );
}