import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Only BrowserRouter in App.js, so no changes needed here.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
