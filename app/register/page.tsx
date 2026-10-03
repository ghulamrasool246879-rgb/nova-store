
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { LockKeyhole, Mail, UserRound } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    setMessage(
      "Your form is valid. Account creation will be enabled when we connect the backend."
    );
  }

  return (
    <section className="account-page">
      <div className="account-card">
        <Link href="/" className="account-brand">
          NOVA<span>.</span>
        </Link>

        <p className="section-eyebrow">JOIN NOVA</p>
        <h1>Create your account</h1>
        <p className="account-description">
          Create an account to prepare for a simpler shopping experience.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="account-field">
            <label htmlFor="register-name">Full name</label>
            <div className="account-input-wrap">
              <UserRound size={18} />
              <input
                id="register-name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="account-field">
            <label htmlFor="register-email">Email address</label>
            <div className="account-input-wrap">
              <Mail size={18} />
              <input
                id="register-email"
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
            <label htmlFor="register-password">Password</label>
            <div className="account-input-wrap">
              <LockKeyhole size={18} />
              <input
                id="register-password"
                type="password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={8}
                required
              />
            </div>
          </div>

          <div className="account-field">
            <label htmlFor="confirm-password">Confirm password</label>
            <div className="account-input-wrap">
              <LockKeyhole size={18} />
              <input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                placeholder="Enter your password again"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                minLength={8}
                required
              />
            </div>
          </div>

          {error && (
            <p className="account-error" role="alert">
              {error}
            </p>
          )}

          {message && (
            <p className="account-message" role="status">
              {message}
            </p>
          )}

          <button type="submit" className="button-primary account-submit">
            Create account <span>→</span>
          </button>
        </form>

        <p className="account-switch">
          Already have an account?{" "}
          <Link href="/login">Sign in</Link>
        </p>

        <Link href="/products" className="account-back">
          Continue shopping
        </Link>
      </div>
    </section>
  );
}