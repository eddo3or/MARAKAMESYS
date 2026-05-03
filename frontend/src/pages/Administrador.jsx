
import { useState } from "react";
import { Link } from "react-router-dom";

const PRIORIDADES = ["Normal", "Urgente", "Crítico"];
const DEPARTAMENTOS = ["Clínico", "Administrativo", "Clinica", "Medica", "Admisiones"];
const UNIDADES = ["Piez", "Caja", "Litro", "Kg", "Metro"];

const FLUJO_APROBACION = [
  { id: 1, label: "Solicitud generada", done: true },
  { id: 2, label: "Comparativo en proceso", active: true },
  { id: 3, label: "Autorización gerencial", done: false },
  { id: 4, label: "Orden de compra", done: false },
];

const initialArticulos = [
  { id: 1, descripcion: "Artículo clínico #1", cantidad: 2, unidad: "Piez" },
  { id: 2, descripcion: "Artículo clínico #2", cantidad: 3, unidad: "Piez" },
];

export default function Requisiciones() {
  const [nuevoArticulo, setNuevoArticulo] = useState("");

  const [fecha, setFecha] = useState("10/07/2026");
  const [departamento, setDepartamento] = useState("Clínico");
  const [prioridad, setPrioridad] = useState("Crítico");
  const [articulos, setArticulos] = useState(initialArticulos);
  const [justificacion, setJustificacion] = useState("");
  const [firmado, setFirmado] = useState(false);

  const agregarArticulo = () => {
  if (!nuevoArticulo.trim()) return;

  setArticulos([
    ...articulos,
    { id: Date.now(), descripcion: nuevoArticulo, cantidad: 1, unidad: "Piez" },
  ]);

  setNuevoArticulo(""); // limpiar input
};
function Administrador() {
  return (
    <div>
      <h1>Panel Administrador</h1>

      <Link to="/Cotizaciones">
        Ir a cotizaciones
      </Link>

    </div>
  );
}

  const actualizarArticulo = (id, campo, valor) => {
    setArticulos(articulos.map((a) => (a.id === id ? { ...a, [campo]: valor } : a)));
  };

  const eliminarArticulo = (id) => {
    setArticulos(articulos.filter((a) => a.id !== id));
  };

  const cambiarCantidad = (id, delta) => {
    setArticulos(
      articulos.map((a) =>
        a.id === id ? { ...a, cantidad: Math.max(1, a.cantidad + delta) } : a
      )
    );
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
          {[
            { label: "Administrativo", icon: "🏢", children: ["Finanzas", "Recursos Humanos", "Compras", "Recursos Materiales"] },
          ].map((section) => (
            <div key={section.label}>
              <div style={styles.navSection}>{section.icon} {section.label}</div>
              {section.children.map((child) => (
                <div
                  key={child}
                  style={{
                    ...styles.navItem,
                    ...(child === "Compras" ? styles.navItemActive : {}),
                  }}
                >
                  {child}
                </div>
              ))}
            </div>
          ))}
        </nav>
        <div style={styles.sidebarUser}>
          <div style={styles.avatar}>Dr. A</div>
          <div>
            <div style={styles.userName}>Dr. Artemio</div>
            <div style={styles.userRole}>Director médico</div>
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
          ...(tab === "Requisiciones" ? styles.tabActive : {}),
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
          <h2 style={styles.pageTitle}>1. Requisición de Bienes o Servicios</h2>

          <div style={styles.grid}>
            {/* LEFT COLUMN */}
            <div style={styles.leftCol}>
              {/* Datos de solicitud */}
              <section style={styles.card}>
                <div style={styles.cardHeader}>
                  <span style={styles.cardIcon}>📋</span>
                  <span style={styles.cardTitle}>Datos de solicitud</span>
                </div>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Fecha de solicitud</label>
                    <div style={styles.inputWithIcon}>
                      <input
                        style={styles.input}
                        type="text"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                      />
                      <span style={styles.inputIcon}>📅</span>
                    </div>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Departamento solicitante</label>
                    <select
                      style={styles.select}
                      value={departamento}
                      onChange={(e) => setDepartamento(e.target.value)}
                    >
                      {DEPARTAMENTOS.map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>PRIORIDAD</label>
                  <div style={styles.radioGroup}>
                    {PRIORIDADES.map((p) => (
                      <label key={p} style={styles.radioLabel}>
                        <input
                          type="radio"
                          name="prioridad"
                          value={p}
                          checked={prioridad === p}
                          onChange={() => setPrioridad(p)}
                          style={{ marginRight: 4 }}
                        />
                        <span
                          style={{
                            color:
                              p === "Crítico"
                                ? "#0e0e0e"
                                : p === "Urgente"
                                ? "#000000"
                                : "#2d3748",
                            fontWeight: prioridad === p ? 700 : 400,
                          }}
                        >
                          {p}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              {/* Tabla de artículos */}
              <section style={styles.card}>
                <div style={styles.cardHeader}>
                  <span style={styles.cardIcon}>🛒</span>
                  <span style={styles.cardTitle}>Datos de solicitud</span>
                  <div style={{ display: "flex", gap: 8 }}>
  <input
    style={{ ...styles.input, width: 180 }}
    value={nuevoArticulo}
    onChange={(e) => setNuevoArticulo(e.target.value)}
    placeholder="Nuevo artículo"
  />

  <button style={styles.addBtn} onClick={agregarArticulo}>
    ＋ Agregar
  </button>
</div>
                </div>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Descripción del artículo/Servicio</th>
                      <th style={{ ...styles.th, width: 100 }}>CANT.</th>
                      <th style={{ ...styles.th, width: 110 }}>U.MEDIA</th>
                      <th style={{ ...styles.th, width: 40 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {articulos.map((art) => (
                      <tr key={art.id}>
                        <td style={styles.td}>
                          <input
                            style={styles.tableInput}
                            value={art.descripcion}
                            onChange={(e) =>
                              actualizarArticulo(art.id, "descripcion", e.target.value)
                            }
                            placeholder="Descripción del artículo/servicio"
                          />
                        </td>
                        <td style={styles.td}>
                          <div style={styles.cantControl}>
                            <button
                              style={styles.cantBtn}
                              onClick={() => cambiarCantidad(art.id, -1)}
                            >
                              −
                            </button>
                            <span style={styles.cantNum}>{art.cantidad}</span>
                            <button
                              style={styles.cantBtn}
                              onClick={() => cambiarCantidad(art.id, 1)}
                            >
                              ＋
                            </button>
                          </div>
                        </td>
                        <td style={styles.td}>
                          <select
                            style={styles.tableSelect}
                            value={art.unidad}
                            onChange={(e) =>
                              actualizarArticulo(art.id, "unidad", e.target.value)
                            }
                          >
                            {UNIDADES.map((u) => (
                              <option key={u}>{u}</option>
                            ))}
                          </select>
                        </td>
                        <td style={styles.td}>
                          <button
                            style={styles.deleteBtn}
                            onClick={() => eliminarArticulo(art.id)}
                          >
                            🗑
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              {/* Justificación */}
              <section style={styles.card}>
                <div style={styles.cardHeader}>
                  <span style={styles.cardIcon}>📄</span>
                  <span style={styles.cardTitle}>Justificación de la compra</span>
                </div>
                <label style={{ ...styles.label, marginBottom: 6 }}>
                  EXPLICACIÓN DETALLADA DE LA COMPRA
                </label>
                <textarea
                  style={styles.textarea}
                  placeholder="Describe por qué se necesita esta adquisición y el impacto en las operaciones..."
                  value={justificacion}
                  onChange={(e) => setJustificacion(e.target.value)}
                  rows={4}
                />
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <div style={styles.rightCol}>
              {/* Datos de solicitud (firma) */}
              <section style={styles.card}>
                <div style={styles.cardHeader}>
                  <span style={styles.cardIcon}>✍️</span>
                  <span style={styles.cardTitle}>Datos de solicitud</span>
                </div>
                <button
                  style={{
                    ...styles.firmaBtn,
                    ...(firmado ? styles.firmaBtnDone : {}),
                  }}
                  onClick={() => setFirmado(!firmado)}
                >
                  {firmado ? "✅ Firmado" : "⬆ Subir firma"}
                </button>
                <div style={styles.solicitanteBox}>
                  <div style={styles.solicitanteLabel}>
                    Solicitante autorizado
                    <span style={styles.verificadoBadge}>✔ Verificado</span>
                  </div>
                  <div style={styles.solicitanteNombre}>Dr. Arámbulo Pascual Pérez</div>
                  <div style={styles.solicitanteCargo}>Director médico</div>
                </div>
              </section>

              {/* Flujo de aprobación */}
              <section style={styles.card}>
                <div style={styles.cardHeader}>
                  <span style={styles.cardIcon}>🔄</span>
                  <span style={styles.cardTitle}>Flujo de aprobación</span>
                </div>
                <div style={styles.flujo}>
                  {FLUJO_APROBACION.map((step, i) => (
                    <div key={step.id} style={styles.flujoStep}>
                      <div
                        style={{
                          ...styles.flujoCircle,
                          ...(step.done
                            ? styles.flujoCircleDone
                            : step.active
                            ? styles.flujoCircleActive
                            : {}),
                        }}
                      >
                        {step.done ? "✓" : i + 1}
                      </div>
                      <span
                        style={{
                          ...styles.flujoLabel,
                          color: step.active ? "#3182ce" : step.done ? "#38a169" : "#718096",
                          fontWeight: step.active ? 600 : 400,
                        }}
                      >
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Botones de acción */}
              <div style={styles.actions}>
                <button style={styles.btnSecondary}>Cancelar</button>
                <button style={styles.btnPrimary}>Enviar requisición</button>
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
    fontSize: 11,
    color: "#fff",
    flexShrink: 0,
  },
  userName: { fontWeight: 600, fontSize: 12 },
  userRole: { fontSize: 10, color: "#a0aec0" },
  main: { flex: 1, display: "flex", flexDirection: "column", overflow: "auto" },
  topBar: {
    background: "#fff",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    height: 48,
    gap: 16,
    flexShrink: 0,
  },
  breadcrumb: { fontSize: 12, color: "#718096", marginRight: 8, whiteSpace: "nowrap" },
  topTabs: { display: "flex", gap: 0, flex: 1 },
  tab: {
    background: "none",
    border: "none",
    padding: "14px 14px",
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
  topIcons: { display: "flex", gap: 8, fontSize: 16 },
  iconBtn: { cursor: "pointer", opacity: 0.6 },
  content: { padding: "20px 24px", flex: 1 },
  pageTitle: { fontSize: 15, fontWeight: 700, marginBottom: 16, color: "#2d3748" },
  grid: { display: "grid", gridTemplateColumns: "1fr 240px", gap: 16, alignItems: "start" },
  leftCol: { display: "flex", flexDirection: "column", gap: 14 },
  rightCol: { display: "flex", flexDirection: "column", gap: 14 },
  card: {
    background: "#fff",
    borderRadius: 8,
    padding: "14px 16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
    border: "1px solid #e2e8f0",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
    paddingBottom: 10,
    borderBottom: "1px solid #f0f4f8",
  },
  cardIcon: { fontSize: 15 },
  cardTitle: { fontWeight: 700, fontSize: 13, flex: 1, color: "#2d3748" },
  formRow: { display: "flex", gap: 14, marginBottom: 12 },
  formGroup: { display: "flex", flexDirection: "column", flex: 1, gap: 4 },
  label: { fontSize: 11, fontWeight: 600, color: "#718096", textTransform: "uppercase", letterSpacing: 0.3 },
  inputWithIcon: { position: "relative" },
  input: {
    width: "100%",
    padding: "7px 28px 7px 9px",
    border: "1px solid #e2e8f0",
    borderRadius: 5,
    fontSize: 12,
    outline: "none",
    background: "#f7fafc",
    boxSizing: "border-box",
  },
  inputIcon: { position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", fontSize: 13, pointerEvents: "none" },
  select: {
    padding: "7px 9px",
    border: "1px solid #e2e8f0",
    borderRadius: 5,
    fontSize: 12,
    background: "#f7fafc",
    outline: "none",
    width: "100%",
  },
  radioGroup: { display: "flex", gap: 20, marginTop: 4 },
  radioLabel: { display: "flex", alignItems: "center", gap: 4, fontSize: 12, cursor: "pointer" },
  addBtn: {
    background: "#ebf8ff",
    color: "#3182ce",
    border: "1px solid #bee3f8",
    borderRadius: 5,
    padding: "5px 12px",
    fontSize: 11,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left",
    padding: "7px 8px",
    fontSize: 10,
    fontWeight: 700,
    color: "#a0aec0",
    textTransform: "uppercase",
    borderBottom: "1px solid #e2e8f0",
    letterSpacing: 0.3,
  },
  td: { padding: "6px 8px", borderBottom: "1px solid #f0f4f8", verticalAlign: "middle" },
  tableInput: {
    width: "100%",
    border: "1px solid #e2e8f0",
    borderRadius: 4,
    padding: "5px 7px",
    fontSize: 12,
    background: "#f7fafc",
    outline: "none",
    boxSizing: "border-box",
  },
  cantControl: { display: "flex", alignItems: "center", gap: 4 },
  cantBtn: {
    width: 22,
    height: 22,
    border: "1px solid #e2e8f0",
    borderRadius: 3,
    background: "#f7fafc",
    cursor: "pointer",
    fontSize: 13,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  cantNum: { minWidth: 24, textAlign: "center", fontWeight: 600, fontSize: 12 },
  tableSelect: {
    border: "1px solid #e2e8f0",
    borderRadius: 4,
    padding: "5px 4px",
    fontSize: 12,
    background: "#f7fafc",
    outline: "none",
    width: "100%",
  },
  deleteBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    color: "#fc8181",
    padding: 0,
  },
  textarea: {
    width: "100%",
    border: "1px solid #e2e8f0",
    borderRadius: 5,
    padding: "8px 10px",
    fontSize: 12,
    background: "#f7fafc",
    outline: "none",
    resize: "vertical",
    boxSizing: "border-box",
    color: "#4a5568",
    fontFamily: "inherit",
  },
  firmaBtn: {
    width: "100%",
    padding: "9px",
    background: "#ebf8ff",
    border: "2px dashed #bee3f8",
    borderRadius: 6,
    color: "#3182ce",
    fontWeight: 600,
    fontSize: 12,
    cursor: "pointer",
    marginBottom: 12,
    transition: "all 0.2s",
  },
  firmaBtnDone: {
    background: "#f0fff4",
    border: "2px solid #9ae6b4",
    color: "#38a169",
  },
  solicitanteBox: {
    background: "#f7fafc",
    borderRadius: 6,
    padding: "10px 12px",
    border: "1px solid #e2e8f0",
  },
  solicitanteLabel: {
    fontSize: 10,
    color: "#718096",
    fontWeight: 600,
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  verificadoBadge: {
    background: "#c6f6d5",
    color: "#276749",
    borderRadius: 10,
    padding: "1px 7px",
    fontSize: 9,
    fontWeight: 700,
  },
  solicitanteNombre: { fontWeight: 700, fontSize: 12, color: "#2d3748" },
  solicitanteCargo: { fontSize: 10, color: "#a0aec0", marginTop: 1 },
  flujo: { display: "flex", flexDirection: "column", gap: 10 },
  flujoStep: { display: "flex", alignItems: "center", gap: 10 },
  flujoCircle: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    border: "2px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 10,
    fontWeight: 700,
    color: "#a0aec0",
    flexShrink: 0,
  },
  flujoCircleDone: { background: "#c6f6d5", border: "2px solid #68d391", color: "#276749" },
  flujoCircleActive: { background: "#ebf8ff", border: "2px solid #63b3ed", color: "#3182ce" },
  flujoLabel: { fontSize: 12 },
  actions: { display: "flex", gap: 8, justifyContent: "flex-end" },
  btnSecondary: {
    padding: "8px 16px",
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    color: "#718096",
  },
  btnPrimary: {
    padding: "8px 16px",
    background: "#3182ce",
    border: "none",
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    color: "#fff",
  },
};