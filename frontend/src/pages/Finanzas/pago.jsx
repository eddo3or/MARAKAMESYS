import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";

export default function RegistroPago() {
  const [fecha, setFecha] = useState("");
  const [claveRastreo, setClaveRastreo] = useState("");
  const [bancoDestino, setBancoDestino] = useState("");
  const [comprobante, setComprobante] = useState(null);

  const pago = {
    proveedor: "HP Health Inc S.A.",
    id: "ID: HPHI-0213",
    montoTotal: "$376,420.00 MXN",
    iva: "Incluye IVA 16%",
    folioOrden: "OC-2026-001",
    emitido: "22 Oct 2026",
  };

  const handleComprobante = (e) => {
    const file = e.target.files[0];
    if (file) setComprobante(file.name);
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
                                    ...(tab.name === "Registro Pago" ? styles.tabActive : {}),
                                    textDecoration: "none"
                                  }}
                                >
                                  {tab.name}
                                </Link>
                              ))}
        </header>

        {/* Content */}
        <div style={styles.content}>
          <h2 style={styles.pageTitle}>1. Finalizacion de pago</h2>

          {/* Info cards */}
          <div style={styles.infoCards}>
            <div style={styles.infoCard}>
              <div style={styles.infoLabel}>PROVEEDOR</div>
              <div style={styles.infoVal}>{pago.proveedor}</div>
              <div style={styles.infoSub}>{pago.id}</div>
            </div>
            <div style={styles.infoCard}>
              <div style={styles.infoLabel}>MONTO TOTAL</div>
              <div style={styles.infoVal}>{pago.montoTotal}</div>
              <div style={styles.infoSub}>{pago.iva}</div>
            </div>
            <div style={styles.infoCard}>
              <div style={styles.infoLabel}>FOLIO ORDEN DE COMPRA</div>
              <div style={{ ...styles.infoVal, color: "#2b6cb0" }}>{pago.folioOrden}</div>
              <div style={styles.infoSub}>Emitido: {pago.emitido}</div>
            </div>
          </div>

          {/* Registro bancario */}
          <div style={styles.bancoCard}>
            <div style={styles.bancoTitle}>Registro de Operacion Bancaria</div>
            <div style={styles.bancoGrid}>
              {/* Fecha */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Fecha de operacion</label>
                <div style={styles.inputIcon}>
                  <input
                    type="date"
                    style={styles.input}
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    placeholder="mm/dd/yyyy"
                  />
                  <svg style={styles.iconRight} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                  </svg>
                </div>
              </div>

              {/* Clave rastreo */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Clave de Rastreo/Referencia</label>
                <input
                  style={styles.input}
                  placeholder="ej. 123445678"
                  value={claveRastreo}
                  onChange={(e) => setClaveRastreo(e.target.value)}
                />
              </div>

              {/* Banco destino */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Banco Destino</label>
                <input
                  style={styles.input}
                  placeholder="Banco"
                  value={bancoDestino}
                  onChange={(e) => setBancoDestino(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Comprobante + Finalizar */}
          <div style={styles.bottomRow}>
            <div style={styles.comprobanteSection}>
              <div style={styles.comprobanteLabel}>Comprobante de Transferencia</div>
              <label style={styles.uploadBox}>
                <input type="file" accept=".jpg,.png,.pdf" style={{ display: "none" }} onChange={handleComprobante} />
                {comprobante ? (
                  <div style={styles.uploadedContent}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3182ce" strokeWidth="1.5">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    <span style={styles.uploadedName}>{comprobante}</span>
                  </div>
                ) : (
                  <div style={styles.uploadContent}>
                    <div style={styles.uploadIconWrap}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                      <div style={styles.uploadPlus}>+</div>
                    </div>
                    <div style={styles.uploadCta}>Subir evidencia de la factura</div>
                    <div style={styles.uploadHint}>JPG, PNG o PDF</div>
                  </div>
                )}
              </label>
            </div>

            <button style={styles.finalizarBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
              </svg>
              Finalizar registro
            </button>
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

  content: { padding: "24px 28px", flex: 1, display: "flex", flexDirection: "column", gap: 20 },
  pageTitle: { fontSize: 20, fontWeight: 800, margin: 0, color: "#1a202c" },

  // Info cards
  infoCards: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 },
  infoCard: {
    background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "16px 18px",
    display: "flex", flexDirection: "column", gap: 4,
  },
  infoLabel: { fontSize: 10, fontWeight: 700, color: "#a0aec0", textTransform: "uppercase", letterSpacing: 0.5 },
  infoVal: { fontSize: 16, fontWeight: 800, color: "#1a202c", marginTop: 2 },
  infoSub: { fontSize: 11, color: "#a0aec0", marginTop: 1 },

  // Banco card
  bancoCard: {
    background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "20px 22px",
  },
  bancoTitle: { fontWeight: 700, fontSize: 14, color: "#2d3748", marginBottom: 18 },
  bancoGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 },

  formGroup: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 11, fontWeight: 600, color: "#4a5568" },
  inputIcon: { position: "relative" },
  input: {
    width: "100%", border: "none", borderBottom: "1.5px solid #e2e8f0",
    padding: "8px 2px", fontSize: 13, color: "#2d3748",
    background: "transparent", outline: "none", fontFamily: "inherit",
    boxSizing: "border-box",
  },
  iconRight: { position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" },

  // Bottom row
  bottomRow: { display: "flex", alignItems: "flex-end", gap: 20 },

  comprobanteSection: { display: "flex", flexDirection: "column", gap: 10 },
  comprobanteLabel: { fontWeight: 600, fontSize: 13, color: "#2d3748" },
  uploadBox: {
    display: "inline-flex", cursor: "pointer",
    border: "1.5px dashed #cbd5e0", borderRadius: 10,
    background: "#f7fafc", padding: "18px 24px",
    minWidth: 180, minHeight: 100,
    alignItems: "center", justifyContent: "center",
  },
  uploadContent: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 },
  uploadIconWrap: { position: "relative", display: "inline-flex" },
  uploadPlus: {
    position: "absolute", bottom: -3, right: -6,
    background: "#3182ce", color: "#fff", borderRadius: "50%",
    width: 16, height: 16, display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: 12, fontWeight: 700, lineHeight: 1,
  },
  uploadCta: { fontSize: 11, fontWeight: 600, color: "#4a5568", textAlign: "center" },
  uploadHint: { fontSize: 9, color: "#a0aec0" },
  uploadedContent: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 },
  uploadedName: { fontSize: 11, fontWeight: 600, color: "#3182ce", textAlign: "center", wordBreak: "break-all", maxWidth: 160 },

  finalizarBtn: {
    display: "flex", alignItems: "center", gap: 10,
    background: "#3182ce", border: "none", borderRadius: 10,
    padding: "14px 28px", color: "#fff", fontWeight: 700,
    fontSize: 14, cursor: "pointer", alignSelf: "flex-end",
    boxShadow: "0 2px 8px rgba(49,130,206,0.3)",
  },
};