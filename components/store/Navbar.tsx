
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";

import { useCart } from "./CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <header className="site-header">
      <div className="announcement">
        Free shipping on orders over $100
      </div>

      <nav className="navbar container">
        <Link
          href="/"
          className="brand"
          onClick={() => setMenuOpen(false)}
        >
          NOVA<span>.</span>
        </Link>

        <div
          className={`nav-links ${menuOpen ? "nav-open" : ""}`}
        >
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link
            href="/products"
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </Link>

          <a
            href="/#featured"
            onClick={() => setMenuOpen(false)}
          >
            Featured
          </a>

          <a
            href="/#about"
            onClick={() => setMenuOpen(false)}
          >
            About
          </a>
        </div>

        <div className="nav-actions">
          <Link
            href="/products"
            aria-label="Search products"
          >
            <Search size={21} />
          </Link>

          <Link href="/login" aria-label="My account">
            <UserRound size={21} />
          </Link>

          <Link
            href="/cart"
            className="cart-link"
            aria-label={`Shopping cart, ${cartCount} items`}
          >
            <ShoppingBag size={21} />

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}