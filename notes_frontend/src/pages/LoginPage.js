import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

/**
 * PUBLIC_INTERFACE
 * Login page UI and logic.
 */
export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(form.username, form.password);
      navigate("/");
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
    }
  }

  function onInputChange(ev) {
    setForm({ ...form, [ev.target.name]: ev.target.value });
  }

  return (
    <div className="login-page" style={{ maxWidth: 380, margin: "6em auto", padding: 28, border: "1px solid #eee", borderRadius: 12 }}>
      <h2 style={{ marginBottom: 24 }}>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input type="text" name="username" autoFocus value={form.username} autoComplete="username"
            onChange={onInputChange} required style={{ width: "100%", marginBottom: 16 }} />
        </label>
        <label>
          Password
          <input type="password" name="password" value={form.password} autoComplete="current-password"
            onChange={onInputChange} required style={{ width: "100%", marginBottom: 16 }} />
        </label>
        <button type="submit" className="btn" style={{ width: "100%" }}>
          Sign In
        </button>
        {error && <p style={{ color: "red", marginTop: 12 }}>{error}</p>}
      </form>
      <p style={{ marginTop: 18 }}>New here? <Link to="/register">Sign up</Link></p>
    </div>
  );
}
