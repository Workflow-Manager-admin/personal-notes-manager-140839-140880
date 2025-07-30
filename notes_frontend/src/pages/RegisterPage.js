import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

/**
 * PUBLIC_INTERFACE
 * Register page: create a new user.
 */
export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      await register(form.username, form.password);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setError("Failed to register. Try another username.");
    }
  }

  function onInputChange(ev) {
    setForm({ ...form, [ev.target.name]: ev.target.value });
  }

  return (
    <div className="register-page" style={{ maxWidth: 380, margin: "6em auto", padding: 28, border: "1px solid #eee", borderRadius: 12 }}>
      <h2 style={{ marginBottom: 24 }}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input type="text" name="username" autoFocus value={form.username} autoComplete="username"
            onChange={onInputChange} required style={{ width: "100%", marginBottom: 16 }} />
        </label>
        <label>
          Password
          <input type="password" name="password" value={form.password} autoComplete="new-password"
            onChange={onInputChange} required style={{ width: "100%", marginBottom: 16 }} />
        </label>
        <button type="submit" className="btn" style={{ width: "100%" }}>
          Create Account
        </button>
        {error && <p style={{ color: "red", marginTop: 12 }}>{error}</p>}
        {success && <p style={{ color: "green", marginTop: 12 }}>Registration successful!</p>}
      </form>
      <p style={{ marginTop: 18 }}>Already have an account? <Link to="/login">Sign in</Link></p>
    </div>
  );
}
