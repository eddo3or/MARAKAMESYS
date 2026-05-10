import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";

const MESES = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];

const FACTURAS_DATA = {
  "OCTUBRE-2026": [
    { fecha: "25/Oct/2026", folio: "OC-2026-001", proveedor: "HP Health inc", subtotal: 324500, iva: 51920, total: 376420 },
    { fecha: "25/Oct/2026", folio: "OC-2026-001", proveedor: "HP Health inc", subtotal: 324500, iva: 51920, total: 376420 },
    { fecha: "25/Oct/2026", folio: "OC-2026-001", proveedor: "HP Health inc", subtotal: 324500, iva: 51920, total: 376420 },
  ],
  "NOVIEMBRE-2026": [
    { fecha: "10/Nov/2026", folio: "OC-2026-004", proveedor: "Robert Service", subtotal: 180000, iva: 28800, total: 208800 },
    { fecha: "18/Nov/2026", folio: "OC-2026-005", proveedor: "ABD One Piece", subtotal: 95000, iva: 15200, total: 110200 },
  ],
};

const fmt = (n) => n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });

export default function FacturaMensual() {
  const [mes, setMes] = useState("OCTUBRE");
  const [anio, setAnio] = useState("2026");
  const [mesAplicado, setMesAplicado] = useState("OCTUBRE");
  const [anioAplicado, setAnioAplicado] = useState("2026");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const key = `${mesAplicado}-${anioAplicado}`;
  const facturas = FACTURAS_DATA[key] || [];
  const gastoTotal = facturas.reduce((s, f) => s + f.total, 0);

  const aplicarFiltros = () => {
    setMesAplicado(mes);
    setAnioAplicado(anio);
  };

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <Sidebar styles={styles} />

      {/* Main */}
      <main style={styles.main}>
        {/* Top Bar */}
        <header style={styles.topBar}>
          {[
                      { name: "Registro Pago", path: "/pago" },
                      { name: "Factura Mensual", path: "/factura" },
                      { name: "Proveedores", path: "/proveedores"},
                      { name: "Cobro", path: "/cobro"},
                    ].map((tab) => (
                      <Link
                        key={tab.name}
                        to={tab.path}
                        style={{
                          ...styles.tab,
                          ...(tab.name === "Factura Mensual" ? styles.tabActive : {}),
                          textDecoration: "none"
                        }}
                      >
                        {tab.name}
                      </Link>
                    ))}
        </header>

        {/* Content */}
        <div style={styles.content}>
          <h2 style={styles.pageTitle}>Factura Mensual</h2>

          {/* Filtros */}
          <div style={styles.filtrosRow}>
            {/* Mes dropdown */}
            <div style={styles.filtroGroup}>
              <label style={styles.filtroLabel}>MES DE FACTURACIÓN</label>
              <div style={styles.dropdownWrapper}>
                <button
                  style={styles.dropdownBtn}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span style={styles.dropdownVal}>{mes}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2.5"
                    style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {dropdownOpen && (
                  <div style={styles.dropdownMenu}>
                    {MESES.map((m) => (
                      <div
                        key={m}
                        style={{ ...styles.dropdownOption, ...(m === mes ? styles.dropdownOptionActive : {}) }}
                        onClick={() => { setMes(m); setDropdownOpen(false); }}
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Año */}
            <div style={styles.filtroGroup}>
              <label style={styles.filtroLabel}>AÑO</label>
              <input
                style={styles.anioInput}
                value={anio}
                onChange={(e) => setAnio(e.target.value)}
                maxLength={4}
              />
            </div>

            <button style={styles.aplicarBtn} onClick={aplicarFiltros}>
              Aplicar filtros
            </button>
          </div>

          {/* Tabla */}
          <div style={styles.tablaCard}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {["FECHA REGISTRO", "FOLIO-FACTURA", "PROVEEDOR", "MONTO SUBTOTAL", "IVA", "MONTO TOTAL"].map((col) => (
                    <th key={col} style={styles.th}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {facturas.length > 0 ? (
                  facturas.map((f, i) => (
                    <tr key={i} style={styles.tr}>
                      <td style={styles.td}>{f.fecha}</td>
                      <td style={styles.td}>{f.folio}</td>
                      <td style={styles.td}>{f.proveedor}</td>
                      <td style={styles.td}>{fmt(f.subtotal)}</td>
                      <td style={styles.td}>{fmt(f.iva)}</td>
                      <td style={{ ...styles.td, fontWeight: 700, color: "#1a202c" }}>{fmt(f.total)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{ ...styles.td, textAlign: "center", color: "#a0aec0", padding: "40px" }}>
                      No hay facturas registradas para {mesAplicado} {anioAplicado}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Footer */}
            <div style={styles.tablaFooter}>
              <div style={styles.footerLeft}>
                <div style={styles.facturaCount}>{facturas.length > 0 ? 48 : 0}</div>
                <div style={styles.facturaCountLabel}>FACTURAS REGISTRADAS<br /><span style={styles.docLabel}>Documentos</span></div>
              </div>
              <div style={styles.gastoBox}>
                <div style={styles.gastoLabel}>Gastos del mes</div>
                <div style={styles.gastoMonto}>{fmt(gastoTotal)} <span style={styles.gastoMxn}>MXN</span></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    display: "flex", minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "#f0f4f8", fontSize: 13, color: "#2d3748",
  },
  sidebar: {
    width: 200, background: "#1a202c", color: "#e2e8f0",
    display: "flex", flexDirection: "column", padding: "0 0 16px 0", flexShrink: 0,
  },
  logo: { padding: "20px 16px 14px", borderBottom: "1px solid #2d3748", marginBottom: 8 },
  logoText: { display: "block", fontWeight: 800, fontSize: 16, letterSpacing: 2, color: "#63b3ed" },
  logoSub: { display: "block", fontSize: 8, letterSpacing: 0.8, color: "#718096", marginTop: 2, textTransform: "uppercase" },
  nav: { flex: 1 },
  navSection: { padding: "10px 16px 6px", fontSize: 11, fontWeight: 700, color: "#a0aec0", letterSpacing: 0.5, textTransform: "uppercase" },
  navItem: { padding: "7px 16px 7px 24px", cursor: "pointer", fontSize: 12, color: "#cbd5e0" },
  navItemActive: { background: "#2b6cb0", color: "#fff", fontWeight: 600, borderLeft: "3px solid #63b3ed", paddingLeft: 21 },
  sidebarUser: { display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderTop: "1px solid #2d3748", marginTop: 16 },
  avatar: { width: 32, height: 32, borderRadius: "50%", background: "#4299e1", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 10, color: "#fff", flexShrink: 0 },
  userName: { fontWeight: 600, fontSize: 12 },
  userRole: { fontSize: 10, color: "#a0aec0" },

  main: { flex: 1, display: "flex", flexDirection: "column" },
  topBar: {
    background: "#fff", borderBottom: "1px solid #e2e8f0",
    display: "flex", alignItems: "center", padding: "0 24px", height: 48, flexShrink: 0,
  },
  tab: { background: "none", border: "none", padding: "14px 18px", cursor: "pointer", fontSize: 13, color: "#718096", borderBottom: "2px solid transparent", whiteSpace: "nowrap", fontWeight: 500 },
  tabActive: { color: "#3182ce", borderBottom: "2px solid #3182ce", fontWeight: 700 },

  content: { padding: "24px 28px", flex: 1, display: "flex", flexDirection: "column", gap: 24 },
  pageTitle: { fontSize: 20, fontWeight: 800, margin: 0, color: "#1a202c" },

  // Filtros
  filtrosRow: { display: "flex", alignItems: "flex-end", gap: 16 },
  filtroGroup: { display: "flex", flexDirection: "column", gap: 6 },
  filtroLabel: { fontSize: 10, fontWeight: 700, color: "#718096", textTransform: "uppercase", letterSpacing: 0.5 },

  dropdownWrapper: { position: "relative" },
  dropdownBtn: {
    display: "flex", alignItems: "center", gap: 16,
    background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8,
    padding: "10px 14px", cursor: "pointer", fontSize: 13,
    fontWeight: 700, color: "#2d3748", minWidth: 180,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
  dropdownVal: { flex: 1, textAlign: "left" },
  dropdownMenu: {
    position: "absolute", top: "110%", left: 0, right: 0,
    background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8,
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)", zIndex: 30,
    maxHeight: 220, overflowY: "auto",
  },
  dropdownOption: { padding: "9px 14px", cursor: "pointer", fontSize: 13, color: "#4a5568", transition: "background 0.1s" },
  dropdownOptionActive: { background: "#ebf8ff", color: "#2b6cb0", fontWeight: 700 },

  anioInput: {
    background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8,
    padding: "10px 14px", fontSize: 13, fontWeight: 700, color: "#2d3748",
    outline: "none", width: 80, boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    fontFamily: "inherit",
  },
  aplicarBtn: {
    background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 8,
    padding: "10px 22px", fontSize: 13, fontWeight: 600, color: "#2d3748",
    cursor: "pointer", boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    alignSelf: "flex-end",
  },

  // Tabla
  tablaCard: {
    background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    padding: "13px 20px", textAlign: "left", fontSize: 10, fontWeight: 700,
    color: "#a0aec0", textTransform: "uppercase", letterSpacing: 0.5,
    background: "#f7fafc", borderBottom: "1px solid #edf2f7",
  },
  tr: { borderBottom: "1px solid #f7fafc" },
  td: { padding: "16px 20px", fontSize: 13, color: "#4a5568" },

  // Footer
  tablaFooter: {
    display: "flex", alignItems: "center", gap: 20,
    padding: "16px 20px", borderTop: "1px solid #edf2f7",
  },
  footerLeft: { display: "flex", alignItems: "center", gap: 14 },
  facturaCount: { fontSize: 32, fontWeight: 900, color: "#1a202c", lineHeight: 1 },
  facturaCountLabel: { fontSize: 10, fontWeight: 700, color: "#a0aec0", textTransform: "uppercase", letterSpacing: 0.4, lineHeight: 1.6 },
  docLabel: { fontWeight: 400, textTransform: "none", fontSize: 11, color: "#718096" },

  gastoBox: {
    background: "linear-gradient(135deg, #434190, #553c9a)",
    borderRadius: 10, padding: "12px 22px",
    display: "flex", flexDirection: "column", gap: 2,
  },
  gastoLabel: { fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: 0.4 },
  gastoMonto: { fontSize: 20, fontWeight: 900, color: "#fff", lineHeight: 1.2 },
  gastoMxn: { fontSize: 12, fontWeight: 600, opacity: 0.8 },
};