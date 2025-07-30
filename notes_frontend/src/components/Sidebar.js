import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaStickyNote, FaSignOutAlt, FaPlusCircle, FaUser, FaSun, FaMoon } from "react-icons/fa";
import { useAuth } from "../auth/AuthProvider";

/**
 * PUBLIC_INTERFACE
 * Sidebar is the main navigation, profile area and theme toggle.
 */
export default function Sidebar({ onThemeToggle, currentTheme }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <aside
      className="sidebar"
      style={{
        width: 240,
        background: "var(--bg-secondary, #f8f9fa)",
        borderRight: "1px solid var(--border-color, #e9ecef)",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        minHeight: "100vh",
        padding: "24px 0",
        boxSizing: "border-box",
      }}
    >
      <div style={{ flex: 1 }}>
        <nav>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 32px",
                  fontWeight: 600,
                  fontSize: 18,
                  color: "var(--text-primary, #333)",
                  textDecoration: "none"
                }}
              >
                <FaStickyNote style={{ marginRight: 14 }} /> Notes
              </Link>
            </li>
            <li>
              <Link
                to="/notes/new"
                className={location.pathname === "/notes/new" ? "active" : ""}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 32px",
                  fontWeight: 600,
                  fontSize: 18,
                  color: "var(--text-primary, #333)",
                  textDecoration: "none"
                }}
              >
                <FaPlusCircle style={{ marginRight: 14 }} /> New Note
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div style={{ padding: "0 32px 16px 32px" }}>
        <button
          className="theme-toggle"
          aria-label="Toggle light/dark theme"
          onClick={onThemeToggle}
          style={{ width: "100%", marginBottom: 16 }}
        >
          {currentTheme === "light" ? <FaMoon style={{ marginRight: 6 }} /> : <FaSun style={{ marginRight: 6 }} />}
          {currentTheme === "light" ? "Dark" : "Light"}
        </button>
        {user && (
          <div style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 0",
            borderTop: "1px solid var(--border-color, #e9ecef)",
          }}>
            <FaUser style={{ marginRight: 8 }} />
            <div style={{ flex: 1, fontSize: 15 }}>
              {user.username || user.email}
            </div>
            <button
              onClick={logout}
              style={{
                background: "none",
                border: "none",
                color: "var(--button-bg, #1976D2)",
                cursor: "pointer",
                marginLeft: 12,
              }}
              aria-label="Logout"
              title="Logout"
            >
              <FaSignOutAlt />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
