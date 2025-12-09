import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/* Wrap the entire app with the Router */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
);
