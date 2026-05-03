import { Link } from "react-router-dom";


export default function OrdenDeCompra() {
  const orden = {
    folio: "OC-2026-001",
    estatus: "Validación de factura",
    ultimaActualizacion: "14 Oct 2023, 10:43 AM",
    empresa: {
      nombre: "Corporativo Marakame S.A. de C.V",
      rfc: "CMA980214-MK2",
      regimen: "601 - General de Ley Personas Morales",
      direccion: "Av. del ejemplo 210",
      colonia: "Col. Lomas Bajitas,",
      cp: "CP 63200",
      ciudad: "Tepic, Nayarit",
    },
    proveedor: {
      razonSocial: "HP Health Inc S.A.",
      direccion: "Calle Independencia 302, Villas del parque, CP 63243",
      rfc: "HPH122003-ABV",
      contacto: "Ing. Roberto Martínez",
      condicionesPago: "Crédito 30 Días",
      transferencia: "Transferencia bancaria (SPEI)",
    },
    articulos: [
      {
        codigo: "HP health inc",
        descripcion: "Objeto clínico",
        cantidad: 2,
        precioUnit: 45200.0,
        subtotal: 90400.0,
      },
    ],
  };

  const subtotal = orden.articulos.reduce((s, a) => s + a.subtotal, 0);
  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  const fmt = (n) =>
    n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });

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
          {[
            { label: "Finanzas", icon: "" },
            { label: "Recursos Humanos", icon: "" },
            { label: "Compras", icon: "" },
            { label: "Recursos Materiales", icon: "" },
          ].map(({ label, icon }) => (
            <div
              key={label}
              style={{
                ...styles.navItem,
                ...(label === "Compras" ? styles.navItemActive : {}),
              }}
            >
              <span style={styles.navIcon}>{icon}</span>
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
          ...(tab === "Orden de compra" ? styles.tabActive : {}),
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
              <h2 style={styles.pageTitle}>3. Orden de compra</h2>
              <div style={styles.folio}>Folio: {orden.folio}</div>
            </div>
            <button style={styles.enviarBtn}>
              <span style={styles.enviarIcon}>➤</span>
              Enviar al proveedor
            </button>
          </div>

          {/* Top cards row */}
          <div style={styles.topCards}>
            {/* Estatus */}
            <div style={styles.estatusCard}>
              <div style={styles.cardLabel}>Estatus Actual</div>
              <div style={styles.estatusBadge}>
                <span style={styles.estatusShield}>🛡</span>
                <span style={styles.estatusText}>{orden.estatus}</span>
              </div>
              <div style={styles.actualizacion}>
                Ultima Actualización: {orden.ultimaActualizacion}
              </div>
            </div>

            {/* Datos fiscales */}
            <div style={styles.fiscalCard}>
              <div style={styles.cardLabel}>DATOS FISCALES DE LA EMPRESA</div>
              <div style={styles.fiscalNombre}>{orden.empresa.nombre}</div>
              <div style={styles.fiscalRow}>
                <div>
                  <div style={styles.fiscalMiniLabel}>RFC</div>
                  <div style={styles.fiscalVal}>{orden.empresa.rfc}</div>
                </div>
                <div>
                  <div style={styles.fiscalMiniLabel}>Régimen</div>
                  <div style={styles.fiscalVal}>{orden.empresa.regimen}</div>
                </div>
              </div>
              <div style={styles.fiscalDireccion}>
                <div>{orden.empresa.direccion}</div>
                <div>{orden.empresa.colonia}</div>
                <div>{orden.empresa.cp}</div>
                <div>{orden.empresa.ciudad}</div>
              </div>
            </div>
          </div>

          {/* Información del proveedor */}
          <div style={styles.proveedorCard}>
            <div style={styles.proveedorTitle}>Información del Proveedor</div>
            <div style={styles.proveedorGrid}>
              <div>
                <div style={styles.provMiniLabel}>Razón social</div>
                <div style={styles.provVal}>{orden.proveedor.razonSocial}</div>
                <div style={styles.provDir}>{orden.proveedor.direccion}</div>
              </div>
              <div>
                <div style={styles.provMiniLabel}>RFC &amp; CONTACTO</div>
                <div style={styles.provRfcRow}>
                  <span style={styles.provRfcIcon}>🪪</span>
                  <span style={styles.provVal}>{orden.proveedor.rfc}</span>
                </div>
                <div style={styles.provRfcRow}>
                  <span style={styles.provRfcIcon}>👤</span>
                  <span style={styles.provVal}>{orden.proveedor.contacto}</span>
                </div>
              </div>
              <div>
                <div style={styles.provMiniLabel}>Condiciones de pago</div>
                <div style={styles.condicionesBadge}>
                  {orden.proveedor.condicionesPago}
                </div>
                <div style={styles.transferenciaText}>
                  {orden.proveedor.transferencia}
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de artículos */}
          <div style={styles.tablaCard}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {["CÓDIGO", "DESCRIPCIÓN", "CANT.", "PRECIO UNIT.", "SUBTOTAL"].map(
                    (col) => (
                      <th key={col} style={styles.th}>
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {orden.articulos.map((art, i) => (
                  <tr key={i} style={styles.tr}>
                    <td style={styles.td}>{art.codigo}</td>
                    <td style={styles.td}>{art.descripcion}</td>
                    <td style={{ ...styles.td, textAlign: "center" }}>
                      {String(art.cantidad).padStart(2, "0")}
                    </td>
                    <td style={styles.td}>{fmt(art.precioUnit)}</td>
                    <td style={{ ...styles.td, fontWeight: 700, color: "#2d3748" }}>
                      {fmt(art.subtotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totales */}
            <div style={styles.totalesRow}>
              <div style={styles.totalesBox}>
                <div style={styles.totalLine}>
                  <span style={styles.totalLineLabel}>Subtotal</span>
                  <span style={styles.totalLineVal}>{fmt(subtotal)}</span>
                </div>
                <div style={styles.totalLine}>
                  <span style={styles.totalLineLabel}>IVA (16%)</span>
                  <span style={styles.totalLineVal}>{fmt(iva)}</span>
                </div>
                <div style={styles.totalLineFinal}>
                  <span style={styles.totalFinalLabel}>Total</span>
                  <span style={styles.totalFinalVal}>{fmt(total)}</span>
                </div>
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
  logoText: { display: "block", fontWeight: 800, fontSize: 16, letterSpacing: 2, color: "#63b3ed" },
  logoSub: { display: "block", fontSize: 8, letterSpacing: 0.8, color: "#718096", marginTop: 2, textTransform: "uppercase" },
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
  content: { padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column", gap: 14 },
  pageHeader: { display: "flex", alignItems: "flex-start", justifyContent: "space-between" },
  pageTitle: { fontSize: 18, fontWeight: 800, margin: 0, color: "#1a202c" },
  folio: { fontSize: 12, color: "#8d99a8", marginTop: 3 ,fontWeight: "bold"},
  enviarBtn: {
    display: "flex", alignItems: "center", gap: 8,
    background: "#ebf8ff", border: "1.5px solid #bee3f8",
    borderRadius: 8, padding: "9px 18px",
    color: "#2b6cb0", fontWeight: 700, fontSize: 13, cursor: "pointer",
  },
  enviarIcon: { fontSize: 14 },

  topCards: { display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 14 },

  // Estatus card
  estatusCard: {
    background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "16px 20px",
    display: "flex", flexDirection: "column", gap: 10,
  },
  cardLabel: { fontSize: 10, fontWeight: 700, color: "#a0aec0", textTransform: "uppercase", letterSpacing: 0.5 },
  estatusBadge: {
    display: "flex", alignItems: "center", gap: 8,
    background: "#f7fafc", border: "1px solid #e2e8f0",
    borderRadius: 8, padding: "10px 14px", width: "fit-content",
  },
  estatusShield: { fontSize: 18 },
  estatusText: { fontWeight: 600, fontSize: 13, color: "#2d3748" },
  actualizacion: { fontSize: 10, color: "#a0aec0", marginTop: 2 },

  // Fiscal card
  fiscalCard: {
    background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "16px 20px",
    display: "flex", flexDirection: "column", gap: 8, position: "relative",
  },
  fiscalNombre: { fontWeight: 700, fontSize: 13, color: "#1a202c" },
  fiscalRow: { display: "flex", gap: 32, marginTop: 2 },
  fiscalMiniLabel: { fontSize: 9, fontWeight: 700, color: "#a0aec0", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 2 },
  fiscalVal: { fontSize: 12, color: "#4a5568", fontWeight: 500 },
  fiscalDireccion: {
    position: "absolute", right: 20, top: 16,
    fontSize: 11, color: "#718096", textAlign: "right", lineHeight: 1.6,
  },

  // Proveedor card
  proveedorCard: {
    background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "16px 20px",
  },
  proveedorTitle: { fontWeight: 700, fontSize: 13, color: "#2d3748", marginBottom: 14 },
  proveedorGrid: { display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 24 },
  provMiniLabel: { fontSize: 9, fontWeight: 700, color: "#a0aec0", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 },
  provVal: { fontSize: 12, fontWeight: 600, color: "#2d3748" },
  provDir: { fontSize: 11, color: "#718096", marginTop: 4, lineHeight: 1.5 },
  provRfcRow: { display: "flex", alignItems: "center", gap: 6, marginBottom: 5 },
  provRfcIcon: { fontSize: 13 },
  condicionesBadge: {
    background: "#ebf8ff", border: "1px solid #bee3f8",
    borderRadius: 6, padding: "6px 12px",
    color: "#2b6cb0", fontWeight: 700, fontSize: 12,
    display: "inline-block", marginBottom: 6,
  },
  transferenciaText: { fontSize: 10, color: "#a0aec0" },

  // Tabla
  tablaCard: {
    background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    padding: "12px 18px", textAlign: "left",
    fontSize: 10, fontWeight: 700, color: "#a0aec0",
    textTransform: "uppercase", letterSpacing: 0.5,
    background: "#f7fafc", borderBottom: "1px solid #e2e8f0",
  },
  tr: { borderBottom: "1px solid #f0f4f8" },
  td: { padding: "16px 18px", fontSize: 13, color: "#4a5568", verticalAlign: "middle" },
  totalesRow: { display: "flex", justifyContent: "flex-end", padding: "12px 18px", borderTop: "1px solid #f0f4f8" },
  totalesBox: { display: "flex", flexDirection: "column", gap: 5, minWidth: 220 },
  totalLine: { display: "flex", justifyContent: "space-between", fontSize: 12, color: "#718096" },
  totalLineLabel: {},
  totalLineVal: { fontWeight: 600, color: "#4a5568" },
  totalLineFinal: {
    display: "flex", justifyContent: "space-between",
    borderTop: "2px solid #e2e8f0", paddingTop: 8, marginTop: 4,
  },
  totalFinalLabel: { fontWeight: 700, fontSize: 14, color: "#2d3748" },
  totalFinalVal: { fontWeight: 800, fontSize: 16, color: "#2b6cb0" },
};