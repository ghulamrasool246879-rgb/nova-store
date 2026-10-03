
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { LockKeyhole, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "Login form validated. Account authentication will be enabled when we connect the backend."
    );
  }

  return (
    <section className="account-page">
      <div className="account-card">
        <Link href="/" className="account-brand">
          NOVA<span>.</span>
        </Link>

        <p className="section-eyebrow">WELCOME BACK</p>
        <h1>Sign in to your account</h1>
        <p className="account-description">
          Sign in to access your account and manage your orders.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="account-field">
            <label htmlFor="login-email">Email address</label>
            <div className="account-input-wrap">
              <Mail size={18} />
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="account-field">
            <label htmlFor="login-password">Password</label>
            <div className="account-input-wrap">
              <LockKeyhole size={18} />
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
          </div>

          {message && (
            <p className="account-message" role="status">
              {message}
            </p>
          )}

          <button type="submit" className="button-primary account-submit">
            Sign in <span>→</span>
          </button>
        </form>

        <p className="account-switch">
          Don't have an account?{" "}
          <Link href="/register">Create one</Link>
        </p>

        <Link href="/products" className="account-back">
          Continue shopping
        </Link>
      </div>
    </section>
  );
}