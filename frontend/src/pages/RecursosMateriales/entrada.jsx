import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const ORDEN = {
  folio: "OC-2026-001",
  proveedor: "HP-Health Inc",
  fecha: "22 Oct 2026",
};

const ITEMS_INICIALES = [
  { 
    id: "INV-0923", 
    descripcion: "Guantes de nitrilo azules", 
    unidad: "PZAS", 
    cantEsperada: 200, 
    cantRecibida: 0,
    categoria: "Insumos",
    caducidad: ""
  },
  { 
    id: "MSZ-932H", 
    descripcion: "Mascarillas azules", 
    unidad: "PZAS", 
    cantEsperada: 150, 
    cantRecibida: 0,
    categoria: "Insumos",
    caducidad: ""
  },
];

export default function EntradaAlmacen() {
  const [numeroFactura, setNumeroFactura] = useState("");
  const [nombreChofer, setNombreChofer] = useState("");
  const [evidencia, setEvidencia] = useState(null);
  const [items, setItems] = useState(ITEMS_INICIALES);
  
  const CATEGORIAS = [
  "Medicamentos",
  "Controlados",
  "Insumos",
  "Limpieza",
  "Oficina"
];

  const location = useLocation();

  const actualizarCantidad = (id, valor) => {
  setItems(items.map((i) => {
    if (i.id === id) {
      return {
        ...i,
        cantRecibida: valor === "" ? "" : Number(valor)
      };
    }
    return i;
  }));
};

  const actualizarCampo = (id, campo, valor) => {
  setItems(items.map(i => 
    i.id === id ? { ...i, [campo]: valor } : i
  ));
};

  const pendientes = items.filter((i) => i.cantRecibida < i.cantEsperada).length;
  const completo = pendientes === 0;
  const status = completo ? "Completo" : "Incompleto";

  const handleEvidencia = (e) => {
    const file = e.target.files[0];
    if (file) setEvidencia(file.name);
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
          <h2 style={styles.pageTitle}>Entrada de almacen</h2>

          {/* Top row: Información + Orden asociada */}
          <div style={styles.topRow}>
            {/* Información de Recepción */}
            <div style={styles.infoCard}>
              <div style={styles.cardHeader}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4a5568" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <span style={styles.cardTitle}>Informacion de Recepcion</span>
              </div>

              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>NUMERO DE FACTURA / REMISION</label>
                  <input
                    style={styles.input}
                    placeholder="Ej. FAC-09023"
                    value={numeroFactura}
                    onChange={(e) => setNumeroFactura(e.target.value)}
                  />
                </div>

                <label style={styles.uploadBox}>
                  <input type="file" accept=".jpg,.jpeg,.png,.pdf" style={{ display: "none" }} onChange={handleEvidencia} />
                  <div style={styles.uploadLabel}>EVIDENCIA DOCUMENTAL</div>
                  {evidencia ? (
                    <div style={styles.uploadedName}>{evidencia}</div>
                  ) : (
                    <>
                      <div style={styles.uploadIcon}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="1.5">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                          <circle cx="12" cy="13" r="4"/>
                        </svg>
                        <div style={styles.uploadPlus}>+</div>
                      </div>
                      <div style={styles.uploadCta}>Subir foto de la factura</div>
                      <div style={styles.uploadHint}>JPG, PNG o PDF</div>
                    </>
                  )}
                </label>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>NOMBRE DEL CHOFER / MENSAJERO</label>
                <input
                  style={styles.input}
                  placeholder="Nombre completo"
                  value={nombreChofer}
                  onChange={(e) => setNombreChofer(e.target.value)}
                />
              </div>
            </div>

            {/* Orden de compra asociada */}
            <div style={styles.ordenCard}>
              <div style={styles.ordenLabel}>ORDEN DE COMPRA ASOCIADA</div>
              <div style={styles.ordenFolio}>{ORDEN.folio}</div>
              <div style={styles.ordenProveedor}>Proveedor: {ORDEN.proveedor}</div>
              <div style={styles.ordenFechaLabel}>Fecha</div>
              <div style={styles.ordenFecha}>{ORDEN.fecha}</div>
            </div>
          </div>

          {/* Tabla de materiales */}
          <div style={styles.tablaCard}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {[
  "ID",
  "DESCRIPCION DEL MATERIAL",
  "UNIDAD",
  "CATEGORIA",
  "F. CADUCIDAD",
  "CANT. ESPERADA",
  "CANT. RECIBIDA"
].map((col) => (
  <th key={col} style={styles.th}>{col}</th>
))}
                </tr>
              </thead>
              <tbody>
                {items.map((row) => {
                  const diff = row.cantRecibida < row.cantEsperada;
                  return (
                    <tr key={row.id} style={styles.tr}>
  <td style={styles.td}>{row.id}</td>

  <td style={styles.td}>{row.descripcion}</td>

  <td style={styles.td}>{row.unidad}</td>

  {/* CATEGORIA */}
  <td style={styles.td}>
    <select
      value={row.categoria}
      onChange={(e) => actualizarCampo(row.id, "categoria", e.target.value)}
      style={styles.input}
    >
      {CATEGORIAS.map(cat => (
        <option key={cat}>{cat}</option>
      ))}
    </select>
  </td>

  
  {/* FECHA CADUCIDAD */}
<td style={styles.td}>
  <input
    type="date"
    value={row.caducidad}
    onChange={(e) => actualizarCampo(row.id, "caducidad", e.target.value)}
    disabled={row.categoria !== "Medicamentos"}
    style={{
      ...styles.input,
      ...(row.categoria !== "Medicamentos" ? {
        backgroundColor: '#edf2f7',
        color: '#a0aec0',
        cursor: 'not-allowed',
        opacity: 0.7
      } : {})
    }}
  />
</td>

  <td style={styles.td}>{row.cantEsperada}</td>

  <td style={styles.td}>
    <input
      type="number"
      min={0}
      max={row.cantEsperada}
      value={row.cantRecibida}
      onChange={(e) => actualizarCantidad(row.id, e.target.value)}
      style={{
        ...styles.cantInput,
        borderColor: row.cantRecibida < row.cantEsperada ? "#feb2b2" : "#9ae6b4",
        background: row.cantRecibida < row.cantEsperada ? "#fff5f5" : "#f0fff4",
        color: row.cantRecibida < row.cantEsperada ? "#c53030" : "#276749",
      }}
    />
  </td>
</tr>
                  );
                })}
              </tbody>
            </table>

            {/* Footer de tabla */}
            <div style={styles.tablaFooter}>
              <div style={styles.footerLeft} />
              <div style={styles.footerRight}>
                <div style={styles.footerStat}>
                  <div style={styles.footerStatNum}>{pendientes}</div>
                  <div style={styles.footerStatLabel}>Pendientes</div>
                </div>
                <div style={styles.footerDivider} />
                <div style={styles.footerStat}>
                  <div style={styles.footerStatLabel}>Status actual</div>
                  <div style={{
                    ...styles.statusText,
                    color: completo ? "#276749" : "#c53030",
                  }}>
                    {status}
                  </div>
                </div>
                <button style={styles.finalizarBtn}>Finalizar registro</button>
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
    display: "flex", alignItems: "center", padding: "0 24px", height: 48, gap: 4, flexShrink: 0,
  },
  tab: { background: "none", border: "none", padding: "14px 18px", cursor: "pointer", fontSize: 13, color: "#718096", borderBottom: "2px solid transparent", whiteSpace: "nowrap", fontWeight: 500 },
  tabActive: { color: "#3182ce", borderBottom: "2px solid #3182ce", fontWeight: 700 },
  content: { padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column", gap: 16 },
  pageTitle: { fontSize: 20, fontWeight: 800, margin: "0 0 4px", color: "#1a202c" },

  topRow: { display: "grid", gridTemplateColumns: "1fr 200px", gap: 14, alignItems: "start" },

  // Info card
  infoCard: {
    background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "16px 20px",
    display: "flex", flexDirection: "column", gap: 14,
  },
  cardHeader: { display: "flex", alignItems: "center", gap: 8 },
  cardTitle: { fontWeight: 700, fontSize: 13, color: "#2d3748" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, alignItems: "start" },
  formGroup: { display: "flex", flexDirection: "column", gap: 5 },
  label: { fontSize: 10, fontWeight: 700, color: "#a0aec0", textTransform: "uppercase", letterSpacing: 0.4 },
  input: {
    border: "1px solid #e2e8f0", borderRadius: 6, padding: "8px 11px",
    fontSize: 12, color: "#4a5568", background: "#f7fafc", outline: "none",
    fontFamily: "inherit",
  },

  // Upload box
  uploadBox: {
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    border: "1.5px dashed #cbd5e0", borderRadius: 8, padding: "14px 12px",
    cursor: "pointer", background: "#f7fafc", gap: 4, position: "relative",
  },
  uploadLabel: { fontSize: 10, fontWeight: 700, color: "#a0aec0", textTransform: "uppercase", letterSpacing: 0.4, alignSelf: "flex-start", marginBottom: 4 },
  uploadIcon: { position: "relative", display: "inline-flex" },
  uploadPlus: {
    position: "absolute", bottom: -2, right: -4,
    background: "#3182ce", color: "#fff", borderRadius: "50%",
    width: 14, height: 14, display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: 11, fontWeight: 700, lineHeight: 1,
  },
  uploadCta: { fontSize: 11, fontWeight: 600, color: "#4a5568", textAlign: "center" },
  uploadHint: { fontSize: 9, color: "#a0aec0" },
  uploadedName: { fontSize: 11, fontWeight: 600, color: "#3182ce", textAlign: "center", wordBreak: "break-all" },

  // Orden card
  ordenCard: {
    background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "16px 18px",
    display: "flex", flexDirection: "column", gap: 4,
  },
  ordenLabel: { fontSize: 10, fontWeight: 700, color: "#a0aec0", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 },
  ordenFolio: { fontSize: 18, fontWeight: 800, color: "#2b6cb0" },
  ordenProveedor: { fontSize: 11, color: "#718096", marginBottom: 8 },
  ordenFechaLabel: { fontSize: 10, fontWeight: 700, color: "#a0aec0", textTransform: "uppercase", letterSpacing: 0.4 },
  ordenFecha: { fontSize: 14, fontWeight: 700, color: "#3182ce" },

  // Tabla
  tablaCard: {
    background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    padding: "11px 18px", textAlign: "left", fontSize: 10, fontWeight: 700,
    color: "#a0aec0", textTransform: "uppercase", letterSpacing: 0.5,
    background: "#f7fafc", borderBottom: "1px solid #e2e8f0",
  },
  tr: { borderBottom: "1px solid #f7fafc" },
  td: { padding: "14px 18px", fontSize: 13, color: "#4a5568", verticalAlign: "middle" },
  cantInput: {
    width: 72, border: "1.5px solid", borderRadius: 6,
    padding: "6px 10px", fontSize: 13, fontWeight: 700,
    textAlign: "center", outline: "none", fontFamily: "inherit",
  },

  // Footer
  tablaFooter: {
    display: "flex", alignItems: "center", justifyContent: "flex-end",
    padding: "14px 18px", borderTop: "1px solid #f0f4f8", gap: 16,
  },
  footerLeft: { flex: 1 },
  footerRight: { display: "flex", alignItems: "center", gap: 16 },
  footerStat: { display: "flex", flexDirection: "column", alignItems: "center", gap: 1 },
  footerStatNum: { fontSize: 20, fontWeight: 800, color: "#e53e3e", lineHeight: 1 },
  footerStatLabel: { fontSize: 10, color: "#a0aec0", fontWeight: 600, textTransform: "uppercase" },
  footerDivider: { width: 1, height: 32, background: "#e2e8f0" },
  statusText: { fontSize: 13, fontWeight: 800 },
  finalizarBtn: {
    background: "#3182ce", border: "none", borderRadius: 8,
    padding: "10px 22px", color: "#fff", fontWeight: 700,
    fontSize: 13, cursor: "pointer",
  },
};