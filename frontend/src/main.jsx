import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login/login.jsx";

import Administrador from "./pages/compras/requisiciones.jsx";
import Cotizaciones  from "./pages/compras/cotizaciones.jsx";
import Ordendecompra from "./pages/compras/ordendecompra.jsx";
import Reporte       from "./pages/compras/reporte.jsx";

import Inventario from "./pages/RecursosMateriales/inventario.jsx"
import Entrada from "./pages/RecursosMateriales/entrada.jsx"
import Salida from "./pages/RecursosMateriales/salida.jsx"

import Pago from "./pages/Finanzas/pago.jsx"
import Factura from "./pages/Finanzas/factura.jsx"
import Proveedores from "./pages/Finanzas/proveedores.jsx"
import Cobro from "./pages/Finanzas/cobro.jsx"


import RH from "./pages/RH/rh.jsx"
import Personal from "./pages/RH/personal.jsx"


ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/requisiciones" element={<Administrador />} />
        <Route path="/cotizaciones" element={<Cotizaciones />} />
        <Route path="/orden" element={<Ordendecompra />} />
        <Route path="/reporte" element={<Reporte />} />

        <Route path="/inventario" element={<Inventario />} />
        <Route path="/entrada" element={<Entrada />} />
        <Route path="/salida" element={<Salida />} />

        <Route path="/pago" element={<Pago />} />
        <Route path="/factura" element={<Factura />} />
        <Route path="/proveedores" element={<Proveedores />} />
        <Route path="/cobro" element={<Cobro />} />
        

        <Route path="/rh" element={<RH />} />
        <Route path="/personal" element={<Personal />} />


       

      </Routes>
    </BrowserRouter>
  </StrictMode>
);