import React from 'react'; 
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; 
import './index.css'; 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* Kūrimo metu papildomi patikrinimai */}
    <BrowserRouter> {/* Įtraukiamas maršrutizavimo kontekstas */}
      <App /> {/* Renderinamas aplikacijos medžio šaknis */}
    </BrowserRouter>
  </React.StrictMode>
);