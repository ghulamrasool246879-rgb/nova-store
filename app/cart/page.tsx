
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import { useCart } from "@/components/store/CartContext";

export default function CartPage() {
  const {
    items,
    cartCount,
    subtotal,
    isLoaded,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(price);

  if (!isLoaded) {
    return (
      <section className="cart-page">
        <div className="cart-container">
          <p>Loading your cart...</p>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="cart-page">
        <div className="cart-container cart-empty">
          <div className="cart-empty-icon">
            <ShoppingBag size={36} />
          </div>

          <p className="section-eyebrow">YOUR SHOPPING BAG</p>
          <h1>Your cart is empty</h1>

          <p>
            Looks like you haven't found your favourites yet.
            Explore our collection and discover something special.
          </p>

          <Link href="/products" className="button-primary">
            Explore products
          </Link>

          <Link href="/" className="cart-back-link">
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-container">
        <div className="cart-heading">
          <div>
            <p className="section-eyebrow">YOUR SELECTION</p>
            <h1>Shopping Cart</h1>
            <p>
              {cartCount} {cartCount === 1 ? "item" : "items"} in
              your bag
            </p>
          </div>

          <Link href="/products" className="cart-continue-link">
            Continue shopping <span>→</span>
          </Link>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <Link
                  href={`/products/${item.id}`}
                  className="cart-item-image"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={180}
                    height={200}
                    unoptimized
                  />
                </Link>

                <div className="cart-item-info">
                  <div>
                    <p className="cart-item-label">NOVA COLLECTION</p>

                    <Link href={`/products/${item.id}`}>
                      <h2>{item.name}</h2>
                    </Link>

                    <p className="cart-item-price">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="cart-item-actions">
                    <div
                      className="quantity-control"
                      aria-label={`Quantity for ${item.name}`}
                    >
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                      >
                        <Minus size={14} />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      type="button"
                      className="cart-remove-button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={15} />
                      Remove
                    </button>
                  </div>
                </div>

                <div className="cart-item-total">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <p className="section-eyebrow">ORDER SUMMARY</p>
            <h2>Your order</h2>

            <div className="summary-line">
              <span>Subtotal ({cartCount} items)</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="summary-line">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="summary-line">
              <span>Taxes</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Estimated subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>

            <p className="cart-shipping-note">
              Shipping and applicable taxes will be calculated
              before you place your order.
            </p>

            <Link
              href="/checkout"
              className="button-primary cart-checkout-button"
            >
              Proceed to checkout <span>→</span>
            </Link>

            <Link
              href="/products"
              className="cart-back-link"
            >
              <ArrowLeft size={15} />
              Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}