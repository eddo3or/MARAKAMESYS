import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const DEPARTAMENTOS = ["Clínico", "Administrativo", "Finanzas", "Recursos Humanos", "Farmacia"];

const MOTIVOS = [
  {
    id: "uso_diario",
    label: "Uso Diario",
    sub: "Suministros regulares",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    id: "reposicion",
    label: "Reposicion",
    sub: "Intercambio por daño",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="1 4 1 10 7 10" /><polyline points="23 20 23 14 17 14" />
        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
      </svg>
    ),
  },
  {
    id: "urgencia",
    label: "Urgencia",
    sub: "Salida no programada",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
];

const CATALOGO = [
  { id: "INV-0923", articulo: "Guantes de nitrilo azules", codigo: "INV-0923", stock: 192 },
  { id: "MSZ-932", articulo: "Mascarillas azules", codigo: "MSZ-932", stock: 98 },
  { id: "ALC-001", articulo: "Alcohol 70%", codigo: "ALC-001", stock: 80 },
  { id: "GAS-012", articulo: "Gasas estériles", codigo: "GAS-012", stock: 200 },
];

export default function SalidaAlmacen() {
  const [departamento, setDepartamento] = useState("Clínico");
  const [nombreRecibe, setNombreRecibe] = useState("");
  const [motivo, setMotivo] = useState("uso_diario");
  const [busqueda, setBusqueda] = useState("");
  const [firma, setFirma] = useState(null);
  const [carrito, setCarrito] = useState([
    { ...CATALOGO[0], cantidad: 2 },
    { ...CATALOGO[1], cantidad: 1 },
  ]);

  const location = useLocation();

  const resultados = busqueda.length > 0
    ? CATALOGO.filter(
        (c) =>
          c.articulo.toLowerCase().includes(busqueda.toLowerCase()) ||
          c.codigo.toLowerCase().includes(busqueda.toLowerCase())
      )
    : [];

  const agregarItem = (item) => {
    const existe = carrito.find((c) => c.id === item.id);
    if (existe) return;
    setCarrito([...carrito, { ...item, cantidad: 1 }]);
    setBusqueda("");
  };

  const cambiarCantidad = (id, delta) => {
    setCarrito(
      carrito.map((c) =>
        c.id === id
          ? { ...c, cantidad: Math.max(1, Math.min(c.stock, c.cantidad + delta)) }
          : c
      )
    );
  };

  const totalUnidades = carrito.reduce((s, c) => s + c.cantidad, 0);

  const handleFirma = (e) => {
    const file = e.target.files[0];
    if (file) setFirma(file.name);
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
            { name: "Inventario", path: "/inventario" },
            { name: "Entrada", path: "/entrada" },
            { name: "Salida", path: "/salida" },
          ].map((tab) => (
            <Link key={tab.name} to={tab.path} style={{ textDecoration: "none" }}>
              <div
                style={{
                  ...styles.tab,
                  ...(location.pathname === tab.path ? styles.tabActive : {}),
                }}
              >
                {tab.name}
              </div>
            </Link>
          ))}
        </header>

        {/* Content */}
        <div style={styles.content}>
          <h2 style={styles.pageTitle}>Salida de almacen</h2>

          <div style={styles.mainGrid}>
            {/* LEFT */}
            <div style={styles.leftCol}>
              {/* Información general */}
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <div style={styles.cardHeaderIcon}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3182ce" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                  </div>
                  <span style={styles.cardTitle}>Informacion general</span>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>DEPARTAMENTO SOLICITANTE</label>
                  <div style={styles.selectWrapper}>
                    <select
                      style={styles.select}
                      value={departamento}
                      onChange={(e) => setDepartamento(e.target.value)}
                    >
                      {DEPARTAMENTOS.map((d) => <option key={d}>{d}</option>)}
                    </select>
                    <svg style={styles.selectArrow} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>NOMBRE DE QUIEN RECIBE</label>
                  <input
                    style={styles.input}
                    placeholder="Ej. Juan Perez..."
                    value={nombreRecibe}
                    onChange={(e) => setNombreRecibe(e.target.value)}
                  />
                </div>
              </div>

              {/* Motivo de salida */}
              <div style={styles.card}>
                <div style={styles.motivoTitle}>Motivo de salida</div>
                <div style={styles.motivoList}>
                  {MOTIVOS.map((m) => (
                    <button
                      key={m.id}
                      style={{
                        ...styles.motivoBtn,
                        ...(motivo === m.id ? styles.motivoBtnActive : {}),
                      }}
                      onClick={() => setMotivo(m.id)}
                    >
                      <span style={{
                        ...styles.motivoBtnIcon,
                        color: motivo === m.id ? "#3182ce" : "#718096",
                      }}>
                        {m.icon}
                      </span>
                      <div style={styles.motivoBtnText}>
                        <span style={{
                          ...styles.motivoBtnLabel,
                          color: motivo === m.id ? "#2b6cb0" : "#2d3748",
                        }}>
                          {m.label}
                        </span>
                        <span style={styles.motivoBtnSub}>{m.sub}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div style={styles.rightCol}>
              {/* Buscador */}
              <div style={styles.searchWrapper}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  style={styles.searchInput}
                  placeholder="Escriba código o nombre para buscar..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                {busqueda && (
                  <button style={styles.clearBtn} onClick={() => setBusqueda("")}>×</button>
                )}
              </div>

              {/* Dropdown de búsqueda */}
              {resultados.length > 0 && (
                <div style={styles.searchDropdown}>
                  {resultados.map((r) => (
                    <div key={r.id} style={styles.searchResult} onClick={() => agregarItem(r)}>
                      <span style={styles.searchResultNombre}>{r.articulo}</span>
                      <span style={styles.searchResultCodigo}>{r.codigo}</span>
                      <span style={styles.searchResultStock}>Stock: {r.stock}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tabla de artículos seleccionados */}
              <div style={styles.tablaCard}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      {["ARTÍCULO", "CÓDIGO", "STOCK ACT.", "CANTIDAD"].map((col) => (
                        <th key={col} style={styles.th}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map((row) => (
                      <tr key={row.id} style={styles.tr}>
                        <td style={styles.td}>{row.articulo}</td>
                        <td style={styles.td}>{row.codigo}</td>
                        <td style={styles.td}>{row.stock}</td>
                        <td style={styles.td}>
                          <div style={styles.cantControl}>
                            <button style={styles.cantBtn} onClick={() => cambiarCantidad(row.id, -1)}>−</button>
                            <span style={styles.cantNum}>{row.cantidad}</span>
                            <button style={styles.cantBtn} onClick={() => cambiarCantidad(row.id, 1)}>+</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Total */}
                <div style={styles.totalRow}>
                  <div style={styles.totalLabel}>TOTAL UNIDADES</div>
                  <div style={styles.totalVal}>{totalUnidades} Pzas</div>
                </div>
              </div>

              {/* Footer: comprobante + registrar */}
              <div style={styles.footerRow}>
                <label style={styles.firmaBtn}>
                  <input type="file" accept=".jpg,.png,.pdf" style={{ display: "none" }} onChange={handleFirma} />
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3182ce" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <div>
                    <div style={styles.firmaBtnLabel}>Subir comprobante</div>
                    {firma && <div style={styles.firmaBtnFile}>{firma}</div>}
                    {!firma && <div style={styles.firmaBtnSub}>Subir firma</div>}
                  </div>
                </label>

                <button style={styles.registrarBtn}>Registrar retiro</button>
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
  logoSub: { display: "block", fontSize: 7.5, letterSpacing: 0.8, color: "#718096", marginTop: 2, textTransform: "uppercase" },
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
    display: "flex", alignItems: "center", padding: "0 24px", height: 48, gap: 4, flexShrink: 0,
  },
  tab: { background: "none", border: "none", padding: "14px 18px", cursor: "pointer", fontSize: 13, color: "#718096", borderBottom: "2px solid transparent", whiteSpace: "nowrap", fontWeight: 500 },
  tabActive: { color: "#3182ce", borderBottom: "2px solid #3182ce", fontWeight: 700 },

  content: { padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column", gap: 16 },
  pageTitle: { fontSize: 20, fontWeight: 800, margin: "0 0 2px", color: "#1a202c" },

  mainGrid: { display: "grid", gridTemplateColumns: "280px 1fr", gap: 16, alignItems: "start" },

  leftCol: { display: "flex", flexDirection: "column", gap: 14 },
  rightCol: { display: "flex", flexDirection: "column", gap: 12, position: "relative" },

  // Cards
  card: {
    background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "16px 18px",
    display: "flex", flexDirection: "column", gap: 14,
  },
  cardHeader: { display: "flex", alignItems: "center", gap: 8 },
  cardHeaderIcon: {
    width: 24, height: 24, borderRadius: 6, background: "#ebf8ff",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  cardTitle: { fontWeight: 700, fontSize: 13, color: "#2d3748" },

  formGroup: { display: "flex", flexDirection: "column", gap: 5 },
  label: { fontSize: 10, fontWeight: 700, color: "#a0aec0", textTransform: "uppercase", letterSpacing: 0.4 },
  selectWrapper: { position: "relative" },
  select: {
    width: "100%", appearance: "none", border: "1px solid #e2e8f0", borderRadius: 6,
    padding: "8px 32px 8px 11px", fontSize: 12, color: "#2d3748",
    background: "#f7fafc", outline: "none", cursor: "pointer", fontFamily: "inherit",
  },
  selectArrow: { position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" },
  input: {
    border: "1px solid #e2e8f0", borderRadius: 6, padding: "8px 11px",
    fontSize: 12, color: "#4a5568", background: "#f7fafc", outline: "none", fontFamily: "inherit",
  },

  // Motivo
  motivoTitle: { fontWeight: 700, fontSize: 13, color: "#2d3748", marginBottom: 4 },
  motivoList: { display: "flex", flexDirection: "column", gap: 8 },
  motivoBtn: {
    display: "flex", alignItems: "center", gap: 12,
    background: "#f7fafc", border: "1.5px solid #e2e8f0", borderRadius: 8,
    padding: "10px 14px", cursor: "pointer", textAlign: "left", transition: "all 0.15s",
  },
  motivoBtnActive: { background: "#ebf8ff", border: "1.5px solid #bee3f8" },
  motivoBtnIcon: { flexShrink: 0 },
  motivoBtnText: { display: "flex", flexDirection: "column", gap: 1 },
  motivoBtnLabel: { fontWeight: 700, fontSize: 12 },
  motivoBtnSub: { fontSize: 10, color: "#a0aec0" },

  // Search
  searchWrapper: {
    display: "flex", alignItems: "center", gap: 8,
    background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8,
    padding: "9px 14px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  searchInput: { flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 13, color: "#4a5568", fontFamily: "inherit" },
  clearBtn: { background: "none", border: "none", cursor: "pointer", color: "#a0aec0", fontSize: 16, lineHeight: 1, padding: 0 },

  searchDropdown: {
    background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden",
    position: "absolute", top: 52, left: 0, right: 0, zIndex: 20,
  },
  searchResult: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 14px", cursor: "pointer", borderBottom: "1px solid #f7fafc",
    transition: "background 0.1s",
  },
  searchResultNombre: { flex: 1, fontSize: 12, fontWeight: 600, color: "#2d3748" },
  searchResultCodigo: { fontSize: 11, color: "#718096" },
  searchResultStock: { fontSize: 11, color: "#38a169", fontWeight: 600 },

  // Tabla
  tablaCard: {
    background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    padding: "11px 16px", textAlign: "left", fontSize: 10, fontWeight: 700,
    color: "#a0aec0", textTransform: "uppercase", letterSpacing: 0.5,
    background: "#f7fafc", borderBottom: "1px solid #e2e8f0",
  },
  tr: { borderBottom: "1px solid #f7fafc" },
  td: { padding: "13px 16px", fontSize: 13, color: "#4a5568", verticalAlign: "middle" },
  cantControl: { display: "flex", alignItems: "center", gap: 6 },
  cantBtn: {
    width: 24, height: 24, border: "1px solid #e2e8f0", borderRadius: 4,
    background: "#f7fafc", cursor: "pointer", fontSize: 14, fontWeight: 700,
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#4a5568", lineHeight: 1, padding: 0,
  },
  cantNum: { minWidth: 20, textAlign: "center", fontWeight: 700, fontSize: 13 },

  totalRow: {
    display: "flex", justifyContent: "flex-end", alignItems: "baseline",
    gap: 8, padding: "10px 16px", borderTop: "1px solid #f0f4f8",
  },
  totalLabel: { fontSize: 10, fontWeight: 700, color: "#a0aec0", textTransform: "uppercase", letterSpacing: 0.4 },
  totalVal: { fontSize: 16, fontWeight: 800, color: "#2b6cb0" },

  // Footer
  footerRow: { display: "flex", alignItems: "center", gap: 12 },
  firmaBtn: {
    flex: 1, display: "flex", alignItems: "center", gap: 10,
    background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8,
    padding: "12px 16px", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  firmaBtnLabel: { fontWeight: 700, fontSize: 12, color: "#3182ce" },
  firmaBtnSub: { fontSize: 10, color: "#a0aec0" },
  firmaBtnFile: { fontSize: 10, color: "#3182ce", wordBreak: "break-all" },
  registrarBtn: {
    background: "#3182ce", border: "none", borderRadius: 8,
    padding: "12px 24px", color: "#fff", fontWeight: 700,
    fontSize: 13, cursor: "pointer", whiteSpace: "nowrap",
  },
};