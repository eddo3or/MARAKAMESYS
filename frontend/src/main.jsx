import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Administrador from "./pages/Administrador.jsx";
import Cotizaciones  from "./pages/cotizaciones.jsx";
import Ordendecompra from "./pages/ordendecompra.jsx";
import Reporte       from "./pages/reporte.jsx";

import Inventario from "./pages/RecursosMateriales/inventario.jsx"
import Entrada from "./pages/RecursosMateriales/entrada.jsx"
import Salida from "./pages/RecursosMateriales/salida.jsx"

//import Pago from "./pages/Finanzas/pago.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Administrador />} />
        <Route path="/cotizaciones" element={<Cotizaciones />} />
        <Route path="/orden" element={<Ordendecompra />} />
        <Route path="/reporte" element={<Reporte />} />

        <Route path="/inventario" element={<Inventario />} />
        <Route path="/entrada" element={<Entrada />} />
        <Route path="/salida" element={<Salida />} />

       

      </Routes>
    </BrowserRouter>
  </StrictMode>
);