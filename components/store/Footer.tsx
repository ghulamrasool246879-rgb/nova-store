
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand">
            NOVA<span>.</span>
          </Link>

          <p>
            Thoughtfully selected products for modern living.
            Discover your next favorite thing.
          </p>

          <div className="social-links">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <Link href="/">Home</Link>
          <Link href="/products">Shop all</Link>
          <Link href="/#featured">Featured products</Link>
        </div>

        <div className="footer-column">
          <h3>Account</h3>
          <Link href="/login">Sign in</Link>
          <Link href="/register">Create account</Link>
          <Link href="/dashboard">My dashboard</Link>
        </div>

        <div className="footer-column">
          <h3>Discover NOVA</h3>
          <p>New arrivals, product highlights, and more.</p>

          <Link href="/products" className="footer-cta">
            Explore the store <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} NOVA Store. All rights reserved.
        </p>
        <p>Designed for everyday living.</p>
      </div>
    </footer>
  );
}