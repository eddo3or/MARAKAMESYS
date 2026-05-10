import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";

const CONCEPTOS = ["Mensualidad", "Consulta", "Medicamento", "Laboratorio", "Hospitalización", "Otro"];
const METODOS = ["Transferencia", "Efectivo", "Tarjeta débito", "Tarjeta crédito"];

const REGISTROS_INICIAL = [
  { id: "MK-1234", paciente: "Jorge Hernandez", monto: 3200, hora: "10:23", metodo: "Efectivo" },
  { id: "MK-1233", paciente: "Pedro Bueno", monto: 3200, hora: "14:21", metodo: "Tarjeta débito" },
];

const fmt = (n) => n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
const folioAleatorio = () => `FOLIO #MK-${Math.floor(2000 + Math.random() * 999)}-${Math.floor(100 + Math.random() * 900)}`;

export default function CobroPacientes() {
  const [registros, setRegistros] = useState(REGISTROS_INICIAL);
  const [folio] = useState(folioAleatorio());
  const [paciente, setPaciente] = useState("");
  const [concepto, setConcepto] = useState("Mensualidad");
  const [metodo, setMetodo] = useState("Transferencia");
  const [monto, setMonto] = useState("");
  const [numTransferencia, setNumTransferencia] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);

  const totalEfectivo = registros.filter((r) => r.metodo === "Efectivo").reduce((s, r) => s + r.monto, 0);
  const totalTarjeta = registros.filter((r) => r.metodo !== "Efectivo" && r.metodo !== "Transferencia").reduce((s, r) => s + r.monto, 0);
  const totalDia = registros.reduce((s, r) => s + r.monto, 0);

  const registrar = () => {
    if (!paciente.trim()) { setError("Ingresa el nombre del paciente."); return; }
    if (!monto || isNaN(Number(monto)) || Number(monto) <= 0) { setError("Ingresa un monto válido."); return; }
    if (metodo === "Transferencia" && !numTransferencia.trim()) { setError("Ingresa el número de transferencia."); return; }
    const nuevo = {
      id: `MK-${1232 + registros.length + 1}`,
      paciente: paciente.trim(),
      monto: Number(monto),
      hora: new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }),
      metodo,
    };
    setRegistros([nuevo, ...registros]);
    setPaciente(""); setMonto(""); setNumTransferencia(""); setError("");
    setExito(true);
    setTimeout(() => setExito(false), 2500);
  };

  return (
    <div style={styles.page}>
      <Sidebar styles={styles} />

      <main style={styles.main}>
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
                                    ...(tab.name === "Cobro" ? styles.tabActive : {}),
                                    textDecoration: "none"
                                  }}
                                >
                                  {tab.name}
                                </Link>
                              ))}
        </header>

        <div style={styles.content}>
          <h2 style={styles.pageTitle}>Cobro de pacientes</h2>

          <div style={styles.mainGrid}>
            {/* Formulario */}
            <div style={styles.formCard}>
              <div style={styles.formHeader}>
                <span style={styles.formHeaderLabel}>Nuevo Registro de Pago</span>
                <div style={styles.folioBadge}>{folio}</div>
              </div>

              {error && <div style={styles.errorBox}>{error}</div>}
              {exito && <div style={styles.exitoBox}>✓ Pago registrado correctamente</div>}

              <div style={styles.formBody}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Paciente</label>
                  <div style={styles.inputWrap}>
                    <input
                      style={styles.input}
                      placeholder="Nombre de paciente"
                      value={paciente}
                      onChange={(e) => { setPaciente(e.target.value); setError(""); }}
                    />
                    <svg style={styles.inputIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </div>
                </div>

                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Concepto de pago</label>
                    <div style={styles.selectWrap}>
                      <select style={styles.select} value={concepto} onChange={(e) => setConcepto(e.target.value)}>
                        {CONCEPTOS.map((c) => <option key={c}>{c}</option>)}
                      </select>
                      <svg style={styles.selArrow} width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Método de pago</label>
                    <div style={styles.selectWrap}>
                      <select style={styles.select} value={metodo} onChange={(e) => setMetodo(e.target.value)}>
                        {METODOS.map((m) => <option key={m}>{m}</option>)}
                      </select>
                      <svg style={styles.selArrow} width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Monto</label>
                  <div style={styles.montoWrap}>
                    <span style={styles.montoPrefix}>$</span>
                    <input
                      style={styles.montoInput}
                      type="number"
                      placeholder="0.00"
                      value={monto}
                      onChange={(e) => { setMonto(e.target.value); setError(""); }}
                      min={0}
                    />
                  </div>
                </div>

                {metodo === "Transferencia" && (
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Numero de transferencia</label>
                    <input
                      style={styles.input}
                      placeholder="Clave / referencia"
                      value={numTransferencia}
                      onChange={(e) => { setNumTransferencia(e.target.value); setError(""); }}
                    />
                  </div>
                )}

                <button style={styles.registrarBtn} onClick={registrar}>
                  Registrar transacción
                </button>
              </div>
            </div>

            {/* Derecha: tabla + totales */}
            <div style={styles.rightCol}>
              <div style={styles.tablaCard}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      {["Folio", "Paciente", "MONTO", "HORA"].map((col) => (
                        <th key={col} style={styles.th}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {registros.length === 0 ? (
                      <tr><td colSpan={4} style={{ ...styles.td, textAlign: "center", color: "#a0aec0", padding: 24 }}>Sin registros hoy</td></tr>
                    ) : registros.map((r) => (
                      <tr key={r.id + r.hora} style={styles.tr}>
                        <td style={{ ...styles.td, fontWeight: 700, color: "#4a5568" }}>{r.id}</td>
                        <td style={styles.td}>{r.paciente}</td>
                        <td style={{ ...styles.td, fontWeight: 700, color: "#1a202c" }}>{fmt(r.monto)}</td>
                        <td style={styles.td}>{r.hora}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={styles.totalesRow}>
                <div style={styles.totalCard}>
                  <div style={styles.totalLabel}>TOTAL EFECTIVO</div>
                  <div style={styles.totalVal}>{fmt(totalEfectivo)}</div>
                </div>
                <div style={styles.totalCard}>
                  <div style={styles.totalLabel}>TOTAL TARJETA</div>
                  <div style={styles.totalVal}>{fmt(totalTarjeta)}</div>
                </div>
                <div style={{ ...styles.totalCard, ...styles.totalCardDia }}>
                  <div style={styles.totalLabelDia}>TOTAL DEL DÍA</div>
                  <div style={styles.totalValDia}>{fmt(totalDia)}</div>
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
  page: { display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", background: "#f0f4f8", fontSize: 13, color: "#2d3748" },
  sidebar: { width: 200, background: "#1a202c", color: "#e2e8f0", display: "flex", flexDirection: "column", padding: "0 0 16px 0", flexShrink: 0 },
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
  topBar: { background: "#fff", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", padding: "0 24px", height: 48, flexShrink: 0 },
  tab: { background: "none", border: "none", padding: "14px 14px", cursor: "pointer", fontSize: 12, color: "#718096", borderBottom: "2px solid transparent", whiteSpace: "nowrap", fontWeight: 500 },
  tabActive: { color: "#3182ce", borderBottom: "2px solid #3182ce", fontWeight: 700 },
  content: { padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column", gap: 18 },
  pageTitle: { fontSize: 20, fontWeight: 800, margin: 0, color: "#1a202c" },
  mainGrid: { display: "grid", gridTemplateColumns: "330px 1fr", gap: 18, alignItems: "start" },
  formCard: { background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden" },
  formHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: "1px solid #f0f4f8", gap: 10, flexWrap: "wrap" },
  formHeaderLabel: { fontWeight: 700, fontSize: 13, color: "#2d3748" },
  folioBadge: { background: "#3182ce", color: "#fff", borderRadius: 7, padding: "6px 14px", fontSize: 11, fontWeight: 700 },
  errorBox: { margin: "10px 18px 0", background: "#fff5f5", border: "1px solid #feb2b2", borderRadius: 6, padding: "8px 12px", fontSize: 12, color: "#c53030" },
  exitoBox: { margin: "10px 18px 0", background: "#f0fff4", border: "1px solid #9ae6b4", borderRadius: 6, padding: "8px 12px", fontSize: 12, color: "#276749", fontWeight: 600 },
  formBody: { padding: "16px 18px", display: "flex", flexDirection: "column", gap: 14 },
  formGroup: { display: "flex", flexDirection: "column", gap: 5, flex: 1 },
  formRow: { display: "flex", gap: 12 },
  label: { fontSize: 11, fontWeight: 600, color: "#4a5568" },
  inputWrap: { position: "relative" },
  input: { width: "100%", border: "1px solid #e2e8f0", borderRadius: 7, padding: "8px 32px 8px 10px", fontSize: 13, color: "#2d3748", background: "#f7fafc", outline: "none", fontFamily: "inherit", boxSizing: "border-box" },
  inputIcon: { position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" },
  selectWrap: { position: "relative" },
  select: { width: "100%", appearance: "none", border: "1px solid #e2e8f0", borderRadius: 7, padding: "8px 28px 8px 10px", fontSize: 13, color: "#2d3748", background: "#f7fafc", outline: "none", cursor: "pointer", fontFamily: "inherit" },
  selArrow: { position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" },
  montoWrap: { display: "flex", alignItems: "center", border: "1px solid #e2e8f0", borderRadius: 7, background: "#f7fafc", overflow: "hidden" },
  montoPrefix: { padding: "8px 10px", fontWeight: 700, color: "#718096", borderRight: "1px solid #e2e8f0", fontSize: 13, background: "#edf2f7" },
  montoInput: { flex: 1, border: "none", background: "transparent", padding: "8px 10px", fontSize: 13, color: "#2d3748", outline: "none", fontFamily: "inherit" },
  registrarBtn: { background: "#3182ce", border: "none", borderRadius: 8, padding: "11px", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", marginTop: 2, boxShadow: "0 2px 6px rgba(49,130,206,0.25)" },
  rightCol: { display: "flex", flexDirection: "column", gap: 14 },
  tablaCard: { background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "11px 18px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "#a0aec0", textTransform: "uppercase", letterSpacing: 0.5, background: "#f7fafc", borderBottom: "1px solid #e2e8f0" },
  tr: { borderBottom: "1px solid #f7fafc" },
  td: { padding: "14px 18px", fontSize: 13, color: "#4a5568", verticalAlign: "middle" },
  totalesRow: { display: "flex", gap: 12 },
  totalCard: { flex: 1, background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "14px 16px" },
  totalCardDia: { background: "#3182ce", border: "none", boxShadow: "0 2px 8px rgba(49,130,206,0.3)" },
  totalLabel: { fontSize: 10, fontWeight: 700, color: "#a0aec0", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 },
  totalVal: { fontSize: 16, fontWeight: 800, color: "#1a202c" },
  totalLabelDia: { fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 },
  totalValDia: { fontSize: 16, fontWeight: 800, color: "#fff" },
};