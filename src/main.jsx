import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import logo1 from '../src/assets/logo.png';

const link = document.querySelector("link[rel~='icon']");
if (link) {
  link.href = logo1;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
