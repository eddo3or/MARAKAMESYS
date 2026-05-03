import { useState } from "react";
import { Link, useLocation } from "react-router-dom";



const ALERTAS = [
  { id: 1, nombre: "Clonazepam 2mg - Tabletas", stock: 5, minimo: 20, reorden: 50 },
  { id: 2, nombre: "Ibuprofeno 600mg - Tabletas", stock: 12, minimo: 20, reorden: 50 },
  { id: 3, nombre: "Sertralina 50mg - Tabletas", stock: 45, minimo: 20, reorden: 50 },
  { id: 4, nombre: "Metadona 10mg - Tabletas", stock: 8, minimo: 20, reorden: 80 },
];

const INVENTARIO_FULL = [
  { id: "032", item: "Guantes de nitrilo (M)", categoria: "Medico", cantidad: 15, locacion: "Lorem" },
  { id: "031", item: "Mascarilla KN45", categoria: "Medico", cantidad: 16, locacion: "Lorem" },
  { id: "034", item: "Hojas Blancas", categoria: "Oficina", cantidad: 500, locacion: "Lorem" },
  { id: "035", item: "Alcohol 70%", categoria: "Medico", cantidad: 80, locacion: "Almacén A" },
  { id: "036", item: "Gasas estériles", categoria: "Medico", cantidad: 200, locacion: "Almacén A" },
  { id: "037", item: "Plumas BIC", categoria: "Oficina", cantidad: 45, locacion: "Oficina" },
  { id: "038", item: "Clonazepam 2mg", categoria: "Farmacia", cantidad: 5, locacion: "Farmacia" },
  { id: "039", item: "Ibuprofeno 600mg", categoria: "Farmacia", cantidad: 12, locacion: "Farmacia" },
];

const POR_PAGINA = 3;

export default function Inventario() {
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);
   const location = useLocation();

  const filtrados = INVENTARIO_FULL.filter(
    (i) =>
      i.item.toLowerCase().includes(busqueda.toLowerCase()) ||
      i.categoria.toLowerCase().includes(busqueda.toLowerCase()) ||
      i.id.includes(busqueda)
  );

  const totalPaginas = Math.ceil(filtrados.length / POR_PAGINA);
  const paginados = filtrados.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  const stockNormal = INVENTARIO_FULL.filter((i) => i.cantidad >= 20).length;
  const stockCritico = INVENTARIO_FULL.filter((i) => i.cantidad < 20).length;

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPagina(1);
  };

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>
          <span style={styles.logoText}>MARAKAME</span>
          <span style={styles.logoSub}>CLÍNICA DE DESINTOXICACIÓN</span>
        </div>
        <nav style={styles.nav}>
          <div style={styles.navSection}>Administrativo</div>
          {["Finanzas", "Recursos Humanos", "Compras", "Recursos Materiales"].map((label) => (
            <div
              key={label}
              style={{
                ...styles.navItem,
                ...(label === "Recursos Materiales" ? styles.navItemActive : {}),
              }}
            >
              {label}
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
          <h2 style={styles.pageTitle}>Inventario</h2>

          {/* Top section: Alertas + Stock cards */}
          <div style={styles.topSection}>
            {/* Alertas de stock */}
            <div style={styles.alertasCard}>
              <div style={styles.alertasHeader}>
                <span style={styles.alertaIcon}>🔔</span>
                <span style={styles.alertasTitle}>Alertas de Stock</span>
              </div>
              <div style={styles.alertasList}>
                {ALERTAS.map((alerta) => (
                  <div key={alerta.id} style={styles.alertaRow}>
                    <div style={styles.alertaBar} />
                    <div style={styles.alertaInfo}>
                      <div style={styles.alertaNombre}>{alerta.nombre}</div>
                      <div style={styles.alertaMeta}>
                        Stock: {alerta.stock} | Mínimo: {alerta.minimo} | Reorden: {alerta.reorden}
                      </div>
                    </div>
                    <button style={styles.solicitarBtn}>Solicitar</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Stock cards */}
            <div style={styles.stockCards}>
              <div style={styles.stockCard}>
                <div style={styles.stockCardTop}>
                  <span style={styles.stockCardLabel}>Stock Normal</span>
                  <div style={styles.stockIconGreen}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38a169" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </div>
                <div style={styles.stockNum}>{stockNormal}</div>
                <div style={styles.stockSub}>Stock disponible</div>
              </div>

              <div style={{ ...styles.stockCard, ...styles.stockCardCritico }}>
                <div style={styles.stockCardTop}>
                  <span style={{ ...styles.stockCardLabel, color: "#c53030" }}>STOCK CRÍTICO</span>
                  <div style={styles.stockIconRed}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c53030" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                </div>
                <div style={{ ...styles.stockNum, color: "#c53030" }}>{stockCritico}</div>
                <div style={{ ...styles.stockSub, color: "#fc8181" }}>STOCK BAJO</div>
              </div>
            </div>
          </div>

          {/* Tabla de existencias */}
          <div style={styles.tablaCard}>
            {/* Toolbar */}
            <div style={styles.toolbar}>
              <span style={styles.tablaTitle}>Detalle de existencias</span>
              <div style={styles.toolbarRight}>
                <div style={styles.searchBox}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    style={styles.searchInput}
                    placeholder="Buscar artículo..."
                    value={busqueda}
                    onChange={handleBusqueda}
                  />
                </div>
                <button style={styles.toolBtn}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
                  </svg>
                  Filtros
                </button>
                <button style={styles.toolBtn}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  Ordenar
                </button>
              </div>
            </div>

            <table style={styles.table}>
              <thead>
                <tr>
                  {["ID", "ITEM", "CATEGORÍA", "CANTIDAD", "LOCACIÓN"].map((col) => (
                    <th key={col} style={styles.th}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginados.length > 0 ? (
                  paginados.map((row) => (
                    <tr key={row.id} style={styles.tr}>
                      <td style={styles.td}>{row.id}</td>
                      <td style={styles.td}>{row.item}</td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.categoriaBadge,
                          background: row.categoria === "Medico" ? "#ebf8ff"
                            : row.categoria === "Farmacia" ? "#faf5ff"
                            : "#f0fff4",
                          color: row.categoria === "Medico" ? "#2b6cb0"
                            : row.categoria === "Farmacia" ? "#6b46c1"
                            : "#276749",
                        }}>
                          {row.categoria}
                        </span>
                      </td>
                      <td style={styles.td}>{row.cantidad}</td>
                      <td style={styles.td}>{row.locacion}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ ...styles.td, textAlign: "center", color: "#a0aec0", padding: "32px" }}>
                      No se encontraron artículos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Paginación */}
            <div style={styles.paginacion}>
              <button
                style={{ ...styles.pageBtn, ...(pagina === 1 ? styles.pageBtnDisabled : {}) }}
                onClick={() => setPagina((p) => Math.max(1, p - 1))}
                disabled={pagina === 1}
              >
                ‹
              </button>
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  style={{ ...styles.pageBtn, ...(p === pagina ? styles.pageBtnActive : {}) }}
                  onClick={() => setPagina(p)}
                >
                  {p}
                </button>
              ))}
              <button
                style={{ ...styles.pageBtn, ...(pagina === totalPaginas ? styles.pageBtnDisabled : {}) }}
                onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
                disabled={pagina === totalPaginas}
              >
                ›
              </button>
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
  pageTitle: { fontSize: 20, fontWeight: 800, margin: "0 0 4px", color: "#1a202c" },

  topSection: { display: "grid", gridTemplateColumns: "1fr 180px", gap: 14, alignItems: "start" },

  // Alertas
  alertasCard: {
    background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "14px 18px",
  },
  alertasHeader: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 },
  alertaIcon: { fontSize: 16 },
  alertasTitle: { fontWeight: 700, fontSize: 13, color: "#2d3748" },
  alertasList: { display: "flex", flexDirection: "column", gap: 10 },
  alertaRow: { display: "flex", alignItems: "center", gap: 10 },
  alertaBar: { width: 3, height: 36, background: "#fc8181", borderRadius: 2, flexShrink: 0 },
  alertaInfo: { flex: 1 },
  alertaNombre: { fontWeight: 600, fontSize: 12, color: "#2d3748" },
  alertaMeta: { fontSize: 10, color: "#a0aec0", marginTop: 1 },
  solicitarBtn: {
    background: "#fff5f5", border: "1px solid #feb2b2", borderRadius: 6,
    padding: "5px 12px", color: "#c53030", fontWeight: 700, fontSize: 11, cursor: "pointer",
    whiteSpace: "nowrap", flexShrink: 0,
  },

  // Stock cards
  stockCards: { display: "flex", flexDirection: "column", gap: 12 },
  stockCard: {
    background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "14px 16px",
  },
  stockCardCritico: { border: "1px solid #fed7d7" },
  stockCardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  stockCardLabel: { fontSize: 11, fontWeight: 700, color: "#718096", textTransform: "uppercase", letterSpacing: 0.3 },
  stockIconGreen: {
    width: 26, height: 26, borderRadius: 6, background: "#f0fff4",
    border: "1px solid #9ae6b4", display: "flex", alignItems: "center", justifyContent: "center",
  },
  stockIconRed: {
    width: 26, height: 26, borderRadius: 6, background: "#fff5f5",
    border: "1px solid #feb2b2", display: "flex", alignItems: "center", justifyContent: "center",
  },
  stockNum: { fontSize: 28, fontWeight: 800, color: "#1a202c", lineHeight: 1 },
  stockSub: { fontSize: 10, color: "#a0aec0", marginTop: 3, fontWeight: 600, textTransform: "uppercase" },

  // Tabla
  tablaCard: {
    background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden",
  },
  toolbar: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "12px 18px", borderBottom: "1px solid #f0f4f8",
  },
  tablaTitle: { fontWeight: 700, fontSize: 13, color: "#2d3748" },
  toolbarRight: { display: "flex", alignItems: "center", gap: 8 },
  searchBox: {
    display: "flex", alignItems: "center", gap: 6,
    background: "#f7fafc", border: "1px solid #e2e8f0", borderRadius: 6,
    padding: "6px 10px",
  },
  searchInput: { border: "none", background: "transparent", outline: "none", fontSize: 12, color: "#4a5568", width: 140 },
  toolBtn: {
    display: "flex", alignItems: "center", gap: 5,
    background: "#f7fafc", border: "1px solid #e2e8f0", borderRadius: 6,
    padding: "6px 12px", fontSize: 12, color: "#4a5568", cursor: "pointer", fontWeight: 500,
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    padding: "11px 18px", textAlign: "left", fontSize: 10, fontWeight: 700,
    color: "#a0aec0", textTransform: "uppercase", letterSpacing: 0.5,
    background: "#f7fafc", borderBottom: "1px solid #e2e8f0",
  },
  tr: { borderBottom: "1px solid #f7fafc" },
  td: { padding: "14px 18px", fontSize: 13, color: "#4a5568" },
  categoriaBadge: { padding: "3px 10px", borderRadius: 20, fontWeight: 600, fontSize: 11 },

  // Paginación
  paginacion: {
    display: "flex", justifyContent: "flex-end", alignItems: "center",
    gap: 4, padding: "12px 18px", borderTop: "1px solid #f0f4f8",
  },
  pageBtn: {
    width: 30, height: 30, border: "1px solid #e2e8f0", borderRadius: 6,
    background: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600,
    color: "#4a5568", display: "flex", alignItems: "center", justifyContent: "center",
  },
  pageBtnActive: { background: "#3182ce", color: "#fff", border: "1px solid #3182ce" },
  pageBtnDisabled: { opacity: 0.35, cursor: "not-allowed" },
};