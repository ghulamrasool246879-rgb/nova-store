
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, LockKeyhole, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/store/CartContext";

type CheckoutForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
};

const initialForm: CheckoutForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  apartment: "",
  city: "",
  province: "",
  postalCode: "",
  country: "Canada",
};

export default function CheckoutPage() {
  const { items, subtotal, isLoaded } = useCart();
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [error, setError] = useState("");

  function updateField(
    field: keyof CheckoutForm,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty. Please add a product first.");
      return;
    }

    // This is a frontend-only step.
    // We'll connect secure order creation in the next stage.
    setError(
      "Your details are validated. Order placement will be enabled after we connect the database and checkout backend."
    );
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(price);

  if (!isLoaded) {
    return (
      <section className="checkout-page">
        <div className="checkout-container">
          Loading checkout...
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="checkout-page">
        <div className="checkout-empty">
          <ShoppingBag size={42} />
          <h1>Your cart is empty</h1>
          <p>Add something you love before checking out.</p>
          <Link href="/products" className="button-primary">
            Browse products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <Link href="/" className="checkout-brand">
            NOVA<span>.</span>
          </Link>

          <p>
            <LockKeyhole size={15} />
            Secure checkout
          </p>
        </div>

        <Link href="/cart" className="checkout-back">
          <ArrowLeft size={16} />
          Return to cart
        </Link>

        <div className="checkout-layout">
          <div className="checkout-form-column">
            <p className="section-eyebrow">ALMOST YOURS</p>
            <h1>Checkout</h1>
            <p className="checkout-intro">
              Enter your details for delivery.
            </p>

            <form onSubmit={handleSubmit}>
              <section className="checkout-section">
                <h2>Contact information</h2>

                <div className="checkout-field">
                  <label htmlFor="email">Email address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) =>
                      updateField("email", e.target.value)
                    }
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="phone">Phone number *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) =>
                      updateField("phone", e.target.value)
                    }
                    placeholder="+1 555 000 0000"
                    required
                  />
                </div>
              </section>

              <section className="checkout-section">
                <h2>Shipping address</h2>

                <div className="checkout-two-columns">
                  <div className="checkout-field">
                    <label htmlFor="firstName">First name *</label>
                    <input
                      id="firstName"
                      name="given-name"
                      autoComplete="given-name"
                      value={form.firstName}
                      onChange={(e) =>
                        updateField("firstName", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="lastName">Last name *</label>
                    <input
                      id="lastName"
                      name="family-name"
                      autoComplete="family-name"
                      value={form.lastName}
                      onChange={(e) =>
                        updateField("lastName", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="checkout-field">
                  <label htmlFor="address">Street address *</label>
                  <input
                    id="address"
                    name="address"
                    autoComplete="street-address"
                    value={form.address}
                    onChange={(e) =>
                      updateField("address", e.target.value)
                    }
                    placeholder="Street and house number"
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="apartment">
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    id="apartment"
                    name="apartment"
                    autoComplete="address-line2"
                    value={form.apartment}
                    onChange={(e) =>
                      updateField("apartment", e.target.value)
                    }
                    placeholder="Apartment or unit"
                  />
                </div>

                <div className="checkout-two-columns">
                  <div className="checkout-field">
                    <label htmlFor="city">City *</label>
                    <input
                      id="city"
                      name="address-level2"
                      autoComplete="address-level2"
                      value={form.city}
                      onChange={(e) =>
                        updateField("city", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="province">
                      Province / State *
                    </label>
                    <input
                      id="province"
                      name="address-level1"
                      autoComplete="address-level1"
                      value={form.province}
                      onChange={(e) =>
                        updateField("province", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="checkout-two-columns">
                  <div className="checkout-field">
                    <label htmlFor="postalCode">
                      Postal / ZIP code *
                    </label>
                    <input
                      id="postalCode"
                      name="postal-code"
                      autoComplete="postal-code"
                      value={form.postalCode}
                      onChange={(e) =>
                        updateField("postalCode", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="country">Country *</label>
                    <select
                      id="country"
                      name="country-name"
                      autoComplete="country-name"
                      value={form.country}
                      onChange={(e) =>
                        updateField("country", e.target.value)
                      }
                      required
                    >
                      <option value="Canada">Canada</option>
                      <option value="United States">
                        United States
                      </option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="United Kingdom">
                        United Kingdom
                      </option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>
              </section>

              {error && (
                <p className="checkout-message" role="status">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="button-primary checkout-submit"
              >
                Continue to order review
                <span>→</span>
              </button>

              <p className="checkout-disclaimer">
                No payment will be collected on this demo checkout.
              </p>
            </form>
          </div>

          <aside className="checkout-order">
            <p className="section-eyebrow">YOUR SELECTION</p>
            <h2>Order summary</h2>

            <div className="checkout-products">
              {items.map((item) => (
                <div className="checkout-product" key={item.id}>
                  <div className="checkout-product-image">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={75}
                      height={85}
                      unoptimized
                    />
                    <span>{item.quantity}</span>
                  </div>

                  <div className="checkout-product-info">
                    <h3>{item.name}</h3>
                    <p>{formatPrice(item.price)} each</p>
                  </div>

                  <strong>
                    {formatPrice(item.price * item.quantity)}
                  </strong>
                </div>
              ))}
            </div>

            <div className="checkout-total-line">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="checkout-total-line">
              <span>Shipping</span>
              <span>Calculated later</span>
            </div>

            <div className="checkout-total-line">
              <span>Taxes</span>
              <span>Calculated later</span>
            </div>

            <div className="checkout-grand-total">
              <span>Estimated total</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>

            <p className="checkout-note">
              Final shipping charges and applicable taxes will
              be calculated before payment.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}