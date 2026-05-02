import { useState } from "react";
import { Link } from "react-router-dom";

const FOLIOS = [
  {
    id: "OC-2026-001",
    proveedor: "HP Health Inc S.A.",
    rfc: "SIN980211-HT2",
    fechaPedido: "22 Oct, 2026",
    articulos: [
      { nombre: "Guantes de nitrilo azules", cantAutorizada: 50, cantEntregada: 50, pactado: 45200.0, cumplimiento: "SI" },
      { nombre: "Mascarillas azules", cantAutorizada: 100, cantEntregada: 100, pactado: 45200.0, cumplimiento: "SI" },
    ],
  },
  {
    id: "OC-2026-002",
    proveedor: "Robert Service",
    rfc: "ROB991102-AA3",
    fechaPedido: "15 Nov, 2026",
    articulos: [
      { nombre: "Jeringas 10ml", cantAutorizada: 200, cantEntregada: 180, pactado: 12000.0, cumplimiento: "NO" },
    ],
  },
];

const fmt = (n) => n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });

export default function ReporteDeCompra() {
  const [folioSeleccionado, setFolioSeleccionado] = useState(FOLIOS[0].id);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [observaciones, setObservaciones] = useState("");
  const [archivo, setArchivo] = useState(null);

  const folio = FOLIOS.find((f) => f.id === folioSeleccionado);

  const handleArchivo = (e) => {
    const file = e.target.files[0];
    if (file) setArchivo(file.name);
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
          <div style={styles.breadcrumb}>Administración / Reporte de compra</div>
          <div style={styles.topTabs}>
            {[
  { name: "Requisiciones", path: "/" },
  { name: "Cotizaciones", path: "/cotizaciones" },
  { name: "Orden de compra", path: "/orden" },
  { name: "Reporte de compra", path: "/reporte" },
].map((tab) => (
  <Link
    key={tab.name}
    to={tab.path}
    style={{
      ...styles.tab,
      ...(tab.name === "Reporte de compra" ? styles.tabActive : {}),
      textDecoration: "none"
    }}
  >
    {tab.name}
  </Link>
))}
          </div>
        </header>

        {/* Content */}
        <div style={styles.content}>
          <h2 style={styles.pageTitle}>4. Reporte de compra</h2>

          {/* Vinculación de folio + info cards */}
          <div style={styles.topSection}>
            {/* Selector de folio */}
            <div style={styles.folioCard}>
              <div style={styles.folioLabel}>VINCULACIÓN DE FOLIO</div>
              <div style={styles.dropdownWrapper}>
                <button
                  style={styles.dropdownBtn}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span style={styles.dropdownValue}>{folioSeleccionado}</span>
                  <span style={{ ...styles.dropdownArrow, transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
                </button>
                {dropdownOpen && (
                  <div style={styles.dropdownMenu}>
                    {FOLIOS.map((f) => (
                      <div
                        key={f.id}
                        style={{
                          ...styles.dropdownOption,
                          ...(f.id === folioSeleccionado ? styles.dropdownOptionActive : {}),
                        }}
                        onClick={() => { setFolioSeleccionado(f.id); setDropdownOpen(false); }}
                      >
                        {f.id}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div style={styles.folioHint}>Seleccione el folio de la orden de compra</div>
            </div>

            {/* Info cards */}
            <div style={styles.infoCard}>
              <div style={styles.infoCardIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4299e1" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
              </div>
              <div style={styles.infoCardMiniLabel}>Proveedor</div>
              <div style={styles.infoCardVal}>{folio.proveedor}</div>
            </div>

            <div style={styles.infoCard}>
              <div style={styles.infoCardIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4299e1" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
              </div>
              <div style={styles.infoCardMiniLabel}>RFC</div>
              <div style={styles.infoCardVal}>{folio.rfc}</div>
            </div>

            <div style={styles.infoCard}>
              <div style={styles.infoCardIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4299e1" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              </div>
              <div style={styles.infoCardMiniLabel}>Fecha de pedido</div>
              <div style={styles.infoCardVal}>{folio.fechaPedido}</div>
            </div>
          </div>

          {/* Tabla de artículos */}
          <div style={styles.tablaCard}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {["ARTÍCULO / SERVICIO", "CANT. AUTORIZADA", "CANT. ENTREGADA", "PACTADO", "CUMPLIMIENTO"].map((col) => (
                    <th key={col} style={styles.th}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {folio.articulos.map((art, i) => (
                  <tr key={i} style={styles.tr}>
                    <td style={styles.td}>{art.nombre}</td>
                    <td style={{ ...styles.td, textAlign: "center" }}>{art.cantAutorizada}</td>
                    <td style={{ ...styles.td, textAlign: "center" }}>{art.cantEntregada}</td>
                    <td style={styles.td}>{fmt(art.pactado)}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.cumplimientoBadge,
                        background: art.cumplimiento === "SI" ? "#f0fff4" : "#fff5f5",
                        color: art.cumplimiento === "SI" ? "#276749" : "#c53030",
                        border: `1px solid ${art.cumplimiento === "SI" ? "#9ae6b4" : "#feb2b2"}`,
                      }}>
                        {art.cumplimiento}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Observaciones + Documentación */}
          <div style={styles.bottomGrid}>
            {/* Observaciones */}
            <div style={styles.obsCard}>
              <div style={styles.obsHeader}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a5568" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                <span style={styles.obsTitle}>OBSERVACIONES DE ENTREGA</span>
              </div>
              <textarea
                style={styles.textarea}
                placeholder="Detalle cualquier discrepancia, estado físico de los productos o indicantes..."
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                rows={4}
              />
            </div>

            {/* Documentación aprobatoria */}
            <div style={styles.docCard}>
              <div style={styles.docTitle}>DOCUMENTACIÓN APROBATORIA</div>
              <label style={styles.uploadArea}>
                <input type="file" accept=".jpg,.jpeg,.png,.pdf" style={{ display: "none" }} onChange={handleArchivo} />
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4299e1" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                {archivo ? (
                  <span style={styles.uploadFileName}>{archivo}</span>
                ) : (
                  <>
                    <span style={styles.uploadCta}>Subir Acta de recepción o dictamen</span>
                    <span style={styles.uploadHint}>JPG, PNG o PDF</span>
                  </>
                )}
              </label>
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
  topBar: { background: "#fff", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", padding: "0 24px", height: 48, gap: 8, flexShrink: 0 },
  breadcrumb: { fontSize: 11, color: "#718096", whiteSpace: "nowrap", marginRight: 8 },
  topTabs: { display: "flex" },
  tab: { background: "none", border: "none", padding: "14px 16px", cursor: "pointer", fontSize: 12, color: "#718096", borderBottom: "2px solid transparent", whiteSpace: "nowrap" },
  tabActive: { color: "#3182ce", borderBottom: "2px solid #3182ce", fontWeight: 600 },
  content: { padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column", gap: 16 },
  pageTitle: { fontSize: 18, fontWeight: 800, margin: "0 0 16px", color: "#1a202c" },

  // Top section
  topSection: { display: "grid", gridTemplateColumns: "220px 1fr 1fr 1fr", gap: 14 },

  folioCard: {
    background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "16px 18px",
    display: "flex", flexDirection: "column", gap: 10,
  },
  folioLabel: { fontSize: 10, fontWeight: 700, color: "#a0aec0", textTransform: "uppercase", letterSpacing: 0.5 },
  dropdownWrapper: { position: "relative" },
  dropdownBtn: {
    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
    background: "#f7fafc", border: "1px solid #e2e8f0", borderRadius: 6,
    padding: "8px 12px", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#2d3748",
  },
  dropdownValue: { fontWeight: 700 },
  dropdownArrow: { fontSize: 14, transition: "transform 0.2s", color: "#a0aec0" },
  dropdownMenu: {
    position: "absolute", top: "110%", left: 0, right: 0,
    background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 10, overflow: "hidden",
  },
  dropdownOption: { padding: "9px 12px", cursor: "pointer", fontSize: 12, color: "#4a5568" },
  dropdownOptionActive: { background: "#ebf8ff", color: "#2b6cb0", fontWeight: 700 },
  folioHint: { fontSize: 10, color: "#a0aec0", lineHeight: 1.4 },

  infoCard: {
    background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "16px 18px",
    display: "flex", flexDirection: "column", gap: 6, justifyContent: "center",
  },
  infoCardIcon: { marginBottom: 2 },
  infoCardMiniLabel: { fontSize: 10, color: "#a0aec0", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.4 },
  infoCardVal: { fontSize: 14, fontWeight: 700, color: "#2d3748" },

  // Tabla
  tablaCard: {
    background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    padding: "12px 18px", textAlign: "left", fontSize: 10,
    fontWeight: 700, color: "#a0aec0", textTransform: "uppercase",
    letterSpacing: 0.5, background: "#f7fafc", borderBottom: "1px solid #e2e8f0",
  },
  tr: { borderBottom: "1px solid #f0f4f8" },
  td: { padding: "15px 18px", fontSize: 13, color: "#4a5568" },
  cumplimientoBadge: { padding: "3px 12px", borderRadius: 20, fontWeight: 700, fontSize: 11 },

  // Bottom
  bottomGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },

  obsCard: {
    background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "16px 18px",
    display: "flex", flexDirection: "column", gap: 10,
  },
  obsHeader: { display: "flex", alignItems: "center", gap: 8 },
  obsTitle: { fontWeight: 700, fontSize: 12, color: "#4a5568", letterSpacing: 0.3 },
  textarea: {
    flex: 1, border: "1px solid #e2e8f0", borderRadius: 6,
    padding: "10px 12px", fontSize: 12, color: "#4a5568",
    background: "#f7fafc", outline: "none", resize: "none",
    fontFamily: "inherit", lineHeight: 1.6,
  },

  docCard: {
    background: "#ebf8ff", borderRadius: 10, border: "1.5px solid #bee3f8",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "16px 18px",
    display: "flex", flexDirection: "column", gap: 10,
  },
  docTitle: { fontWeight: 700, fontSize: 12, color: "#2b6cb0", letterSpacing: 0.3 },
  uploadArea: {
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    gap: 8, border: "2px dashed #90cdf4", borderRadius: 8,
    padding: "24px 16px", cursor: "pointer", background: "#fff",
    transition: "background 0.15s",
  },
  uploadCta: { fontWeight: 600, fontSize: 12, color: "#3182ce", textAlign: "center" },
  uploadHint: { fontSize: 10, color: "#90cdf4" },
  uploadFileName: { fontSize: 12, fontWeight: 600, color: "#2b6cb0", textAlign: "center", wordBreak: "break-all" },
};