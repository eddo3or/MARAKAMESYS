import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Administrador from "./pages/Administrador.jsx";
import Cotizaciones from "./pages/cotizaciones.jsx";
import Ordendecompra from "./pages/ordendecompra.jsx";
import Reporte from "./pages/reporte.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Administrador />} />
        <Route path="/cotizaciones" element={<Cotizaciones />} />
        <Route path="/orden" element={<Ordendecompra />} />
        <Route path="/reporte" element={<Reporte />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);