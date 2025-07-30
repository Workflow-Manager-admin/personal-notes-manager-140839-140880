import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

/**
 * Holds authentication state and functions for login/logout/register.
 */
const AuthContext = createContext();

/**
 * PUBLIC_INTERFACE
 * useAuth hook to access the auth context.
 */
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * PUBLIC_INTERFACE
 * Provides authentication functionality and stores token in localStorage.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setUser({ ...decoded, token });
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [token]);

  // PUBLIC_INTERFACE
  async function login(username, password) {
    const res = await axios.post("/api/auth/login", { username, password });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
  }

  // PUBLIC_INTERFACE
  async function register(username, password) {
    await axios.post("/api/auth/register", { username, password });
  }

  // PUBLIC_INTERFACE
  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  }

  // Adds token to Axios for authenticated calls:
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
