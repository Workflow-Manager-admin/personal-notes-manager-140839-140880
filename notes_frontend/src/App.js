import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import { AuthProvider } from './auth/AuthProvider';
import { PrivateRoute } from './auth/PrivateRoute';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NoteEditorPage from './pages/NoteEditorPage';
import NoteListPage from './pages/NoteListPage';

function App() {
  const [theme, setTheme] = useState('light');
  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App" style={{ display: "flex", minHeight: "100vh" }}>
          <Sidebar onThemeToggle={toggleTheme} currentTheme={theme} />
          <main className="main-content" style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/notes/:id"
                element={
                  <PrivateRoute>
                    <NoteEditorPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <NoteListPage />
                  </PrivateRoute>
                }
              />
              {/* Fallback: redirect unknown routes to root */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
