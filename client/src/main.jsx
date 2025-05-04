import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/Auth.jsx'
// main.jsx or index.js
import '@fortawesome/fontawesome-free/css/all.min.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
  </StrictMode>
  </BrowserRouter>
)
