import { useState } from "react";
import { Link } from "react-router-dom";

const COTIZACIONES = [
  {
    id: 1,
    proveedor: "HP health inc",
    precioUnitario: 32450.0,
    subtotal: 324500.0,
    tiempoEntrega: "5-7 Días",
    vigencia: "30 Sept",
  },
  {
    id: 2,
    proveedor: "Robert service",
    precioUnitario: 34100.0,
    subtotal: 341000.0,
    tiempoEntrega: "10-12 Días",
    vigencia: "15 Oct",
  },
  {
    id: 3,
    proveedor: "ABD One Piece",
    precioUnitario: 31900.0,
    subtotal: 319000.0,
    tiempoEntrega: "20+ Días",
    vigencia: "22 Sept",
  },
];

const IVA_RATE = 0.16;

const fmt = (n) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });

export default function Cotizaciones() {
  const [seleccionado, setSeleccionado] = useState(1);
  const [justificacion, setJustificacion] = useState("");

  const cotSeleccionada = COTIZACIONES.find((c) => c.id === seleccionado);
  const iva = cotSeleccionada ? cotSeleccionada.subtotal * IVA_RATE : 0;
  const total = cotSeleccionada ? cotSeleccionada.subtotal + iva : 0;

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>
          <span style={styles.logoText}>MARAKAME</span>
          <span style={styles.logoSub}>CLÍNICA DE DESINTOXICACIÓN</span>
        </div>
        <nav style={styles.nav}>
          <div style={styles.navSection}>🏢 Administrativo</div>
          {["Finanzas", "Recursos Humanos", "Compras", "Recursos Materiales"].map((item) => (
            <div
              key={item}
              style={{
                ...styles.navItem,
                ...(item === "Compras" ? styles.navItemActive : {}),
              }}
            >
              {item === "Finanzas" && <span style={styles.navIcon}></span>}
              {item === "Recursos Humanos" && <span style={styles.navIcon}></span>}
              {item === "Compras" && <span style={styles.navIcon}></span>}
              {item === "Recursos Materiales" && <span style={styles.navIcon}></span>}
              {item}
            </div>
          ))}
        </nav>
        <div style={styles.sidebarUser}>
          <div style={styles.avatar}>Dr. A</div>
          <div>
            <div style={styles.userName}>Dr. Arreola</div>
            <div style={styles.userRole}>Director Médico</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={styles.main}>
        {/* Top Bar */}
        <header style={styles.topBar}>
          
          <div style={styles.topTabs}>
            {["Requisiciones", "Cotizaciones", "Orden de compra", "Reporte de compra"].map((tab) => {
  let ruta = "#";

  if (tab === "Requisiciones") ruta = "/";
  if (tab === "Cotizaciones") ruta = "/cotizaciones";
  if (tab === "Orden de compra") ruta = "/orden";
  if (tab === "Reporte de compra") ruta = "/reporte";

  return (
    <Link key={tab} to={ruta} style={{ textDecoration: "none" }}>
      <button
        style={{
          ...styles.tab,
          ...(tab === "Cotizaciones" ? styles.tabActive : {}),
        }}
      >
        {tab}
      </button>
    </Link>
  );
})}
          </div>
        </header>

        {/* Content */}
        <div style={styles.content}>
          {/* Page header */}
          <div style={styles.pageHeader}>
            <div>
              <h2 style={styles.pageTitle}>2. Comparación de Cotizaciones</h2>
              <div style={styles.reqId}>Requisición: REQ-2026-260517</div>
            </div>
            <button style={styles.aprobarBtn}>
              <span style={styles.aprobarIcon}>✔</span>
              Aprobar selección
            </button>
          </div>

          {/* Tabla de cotizaciones */}
          <div style={styles.card}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {["PROVEEDOR", "PRECIO UNITARIO", "SUBTOTAL", "TIEMPO ENTREGA", "VIGENCIA", "OPCIÓN"].map(
                    (col) => (
                      <th key={col} style={styles.th}>
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {COTIZACIONES.map((cot) => {
                  const isSelected = seleccionado === cot.id;
                  return (
                    <tr
                      key={cot.id}
                      style={{
                        ...styles.tr,
                        ...(isSelected ? styles.trSelected : {}),
                      }}
                      onClick={() => setSeleccionado(cot.id)}
                    >
                      <td style={styles.tdProveedor}>
                        {isSelected && <span style={styles.selectedBar} />}
                        <span style={{ fontWeight: isSelected ? 700 : 400 }}>
                          {cot.proveedor}
                        </span>
                      </td>
                      <td style={styles.td}>{fmt(cot.precioUnitario)}</td>
                      <td style={styles.td}>{fmt(cot.subtotal)}</td>
                      <td style={styles.td}>{cot.tiempoEntrega}</td>
                      <td style={styles.td}>{cot.vigencia}</td>
                      <td style={styles.td}>
                        <div
                          style={{
                            ...styles.radio,
                            ...(isSelected ? styles.radioSelected : {}),
                          }}
                        >
                          {isSelected && <div style={styles.radioDot} />}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Resumen + Justificación */}
          <div style={styles.bottomGrid}>
            {/* Resumen */}
            <div style={styles.resumenCard}>
              <div style={styles.resumenTitle}>Resumen de selección</div>
              <div style={styles.resumenRows}>
                <div style={styles.resumenRow}>
                  <span style={styles.resumenLabel}>Subtotal</span>
                  <span style={styles.resumenValue}>
                    {cotSeleccionada ? fmt(cotSeleccionada.subtotal) : "-"}
                  </span>
                </div>
                <div style={styles.resumenRow}>
                  <span style={styles.resumenLabel}>IVA (16%)</span>
                  <span style={styles.resumenValue}>{fmt(iva)}</span>
                </div>
              </div>
              <div style={styles.totalBox}>
                <div style={styles.totalLabel}>Total estimado</div>
                <div style={styles.totalAmount}>{fmt(total)}</div>
                <div style={styles.totalProveedor}>
                  <span style={styles.totalProveedorLabel}>Proveedor</span>
                  <span style={styles.totalProveedorNombre}>
                    {cotSeleccionada?.proveedor}
                  </span>
                </div>
              </div>
            </div>

            {/* Justificación */}
            <div style={styles.justCard}>
              <div style={styles.resumenTitle}>Justificación de compra</div>
              <textarea
                style={styles.textarea}
                placeholder="Escribe los motivos de la selección..."
                value={justificacion}
                onChange={(e) => setJustificacion(e.target.value)}
                rows={5}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "#f0f4f8",
    fontSize: 13,
    color: "#2d3748",
  },
  sidebar: {
    width: 200,
    background: "#1a202c",
    color: "#e2e8f0",
    display: "flex",
    flexDirection: "column",
    padding: "0 0 16px 0",
    flexShrink: 0,
  },
  logo: {
    padding: "20px 16px 14px",
    borderBottom: "1px solid #2d3748",
    marginBottom: 8,
  },
  logoText: {
    display: "block",
    fontWeight: 800,
    fontSize: 16,
    letterSpacing: 2,
    color: "#63b3ed",
  },
  logoSub: {
    display: "block",
    fontSize: 8,
    letterSpacing: 0.8,
    color: "#718096",
    marginTop: 2,
    textTransform: "uppercase",
  },
  nav: { flex: 1 },
  navSection: {
    padding: "10px 16px 4px",
    fontSize: 11,
    fontWeight: 700,
    color: "#a0aec0",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  navItem: {
    padding: "7px 16px 7px 28px",
    cursor: "pointer",
    fontSize: 12,
    color: "#cbd5e0",
    borderRadius: 0,
    transition: "background 0.15s",
  },
  navItemActive: {
    background: "#2b6cb0",
    color: "#fff",
    fontWeight: 600,
    borderLeft: "3px solid #63b3ed",
  },
  sidebarUser: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 16px",
    borderTop: "1px solid #2d3748",
    marginTop: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "#4299e1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 10,
    color: "#fff",
    flexShrink: 0,
  },
  userName: { fontWeight: 600, fontSize: 12 },
  userRole: { fontSize: 10, color: "#a0aec0" },
  main: { flex: 1, display: "flex", flexDirection: "column" },
  topBar: {
    background: "#fff",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    height: 48,
    gap: 8,
    flexShrink: 0,
  },
  breadcrumb: { fontSize: 11, color: "#718096", whiteSpace: "nowrap", marginRight: 8 },
  topTabs: { display: "flex" },
  tab: {
    background: "none",
    border: "none",
    padding: "14px 16px",
    cursor: "pointer",
    fontSize: 12,
    color: "#718096",
    borderBottom: "2px solid transparent",
    whiteSpace: "nowrap",
  },
  tabActive: {
    color: "#3182ce",
    borderBottom: "2px solid #3182ce",
    fontWeight: 600,
  },
  content: { padding: "20px 24px", flex: 1 },
  pageHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  pageTitle: { fontSize: 18, fontWeight: 800, margin: 0, color: "#1a202c" },
  reqId: { fontSize: 12, color: "#8d99a8", marginTop: 3 ,fontWeight: "bold"},
  aprobarBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#ebf8ff",
    border: "1.5px solid #bee3f8",
    borderRadius: 8,
    padding: "9px 18px",
    color: "#2b6cb0",
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
    transition: "all 0.15s",
  },
  aprobarIcon: {
    background: "#3182ce",
    color: "#fff",
    borderRadius: "50%",
    width: 20,
    height: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 11,
    fontWeight: 700,
    flexShrink: 0,
  },
  card: {
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    marginBottom: 16,
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    padding: "12px 16px",
    textAlign: "left",
    fontSize: 10,
    fontWeight: 700,
    color: "#a0aec0",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    background: "#f7fafc",
    borderBottom: "1px solid #e2e8f0",
  },
  tr: {
    cursor: "pointer",
    transition: "background 0.12s",
    borderBottom: "1px solid #f0f4f8",
  },
  trSelected: { background: "#f0f7ff" },
  tdProveedor: {
    padding: "14px 16px",
    fontWeight: 500,
    position: "relative",
    paddingLeft: 20,
    display: "flex",
    alignItems: "center",
    gap: 8,
    minHeight: 48,
  },
  selectedBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    background: "#3182ce",
    borderRadius: "0 2px 2px 0",
  },
  td: {
    padding: "14px 16px",
    fontSize: 13,
    color: "#4a5568",
    verticalAlign: "middle",
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    border: "2px solid #cbd5e0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "border-color 0.15s",
  },
  radioSelected: { border: "2px solid #3182ce" },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#3182ce",
  },
  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  },
  resumenCard: {
    background: "#fff",
    borderRadius: 10,
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    padding: "16px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  resumenTitle: {
    fontWeight: 700,
    fontSize: 13,
    color: "#2d3748",
    marginBottom: 2,
  },
  resumenRows: { display: "flex", flexDirection: "column", gap: 6 },
  resumenRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  resumenLabel: { fontSize: 12, color: "#718096" },
  resumenValue: { fontWeight: 600, fontSize: 13, color: "#2d3748" },
  totalBox: {
    background: "#ebf8ff",
    borderRadius: 8,
    padding: "12px 16px",
    border: "1px solid #bee3f8",
    marginTop: 4,
  },
  totalLabel: { fontSize: 10, color: "#4299e1", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 },
  totalAmount: { fontSize: 22, fontWeight: 800, color: "#2b6cb0", marginBottom: 8 },
  totalProveedor: { display: "flex", flexDirection: "column", gap: 1 },
  totalProveedorLabel: { fontSize: 10, color: "#a0aec0", textTransform: "uppercase" },
  totalProveedorNombre: { fontSize: 13, fontWeight: 700, color: "#2d3748" },
  justCard: {
    background: "#fff",
    borderRadius: 10,
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    padding: "16px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  textarea: {
    flex: 1,
    border: "1px solid #e2e8f0",
    borderRadius: 6,
    padding: "10px 12px",
    fontSize: 12,
    color: "#4a5568",
    background: "#f7fafc",
    outline: "none",
    resize: "none",
    fontFamily: "inherit",
    lineHeight: 1.6,
  },
};