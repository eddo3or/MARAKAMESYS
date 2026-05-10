import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";

const AREAS = ["Administración", "Clínico", "Admisiones", "Finanzas", "Enfermería", "Farmacia", "Recursos Humanos", "Recursos Materiales"];
const PUESTOS = ["Director General", "Coordinador", "Médico", "Enfermera", "Oficina", "Auxiliar", "Recepcionista"];

const PERSONAL_INICIAL = [
  { id: 1, nombre: "Dr. Juan Perez", departamento: "Administración", puesto: "Director general", usuario: "juan", rfc: "PEJJ800101AB1", curp: "PEJJ800101HDFRZN01", facultadAuth: true },
  { id: 2, nombre: "Angélica Ramírez", departamento: "Clínico", puesto: "Oficina", usuario: "angelica", rfc: "RAAN900215CD2", curp: "RAAN900215MDFMZN02", facultadAuth: false },
  { id: 3, nombre: "Pablo Bueno", departamento: "Admisiones", puesto: "Oficina", usuario: "pablo", rfc: "BUPB850630EF3", curp: "BUPB850630HDFZN003", facultadAuth: false },
];

const AVATAR_COLORS = ["#4299e1", "#48bb78", "#ed8936", "#9f7aea", "#f56565", "#38b2ac"];

const initials = (nombre) =>
  nombre.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("");

const avatarColor = (id) => AVATAR_COLORS[(id - 1) % AVATAR_COLORS.length];

const EMPTY_FORM = {
  nombre: "", departamento: "", puesto: "", usuario: "",
  rfc: "", curp: "", facultadAuth: false, telefono: "",
};

export default function AdminPersonal() {
  const [personal, setPersonal] = useState(PERSONAL_INICIAL);
  const [busqueda, setBusqueda] = useState("");
  const [seleccionado, setSeleccionado] = useState(null);
  const [modo, setModo] = useState("ver"); // "ver" | "editar" | "nuevo"
  const [form, setForm] = useState(EMPTY_FORM);
  const [showResetPass, setShowResetPass] = useState(false);

  const filtrados = personal.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.departamento.toLowerCase().includes(busqueda.toLowerCase())
  );

  const seleccionar = (emp) => {
    setSeleccionado(emp);
    setForm({ ...emp });
    setModo("editar");
    setShowResetPass(false);
  };

  const iniciarNuevo = () => {
    setSeleccionado(null);
    setForm(EMPTY_FORM);
    setModo("nuevo");
  };

  const cancelar = () => {
    setSeleccionado(null);
    setForm(EMPTY_FORM);
    setModo("ver");
  };

  const actualizarCampo = (campo, valor) => setForm((f) => ({ ...f, [campo]: valor }));

  const guardarNuevo = () => {
    if (!form.nombre.trim()) return;
    const nuevo = { ...form, id: Date.now() };
    setPersonal([...personal, nuevo]);
    setSeleccionado(nuevo);
    setModo("editar");
  };

  const actualizarExpediente = () => {
    setPersonal(personal.map((p) => (p.id === seleccionado.id ? { ...form, id: p.id } : p)));
    setSeleccionado({ ...form, id: seleccionado.id });
  };

  const suspenderUsuario = () => {
    if (window.confirm(`¿Suspender a ${seleccionado.nombre}?`)) {
      setPersonal(personal.filter((p) => p.id !== seleccionado.id));
      cancelar();
    }
  };

  const panelVacio = modo === "ver";

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <Sidebar styles={styles} />

      {/* Main */}
      <main style={styles.main}>
        {/* Top Bar */}
        <header style={styles.topBar}>
         
            {[
                                                      { name: "Registro de incidencia", path: "/rh" },
                                                      { name: "Personal", path: "/personal" },
                                                    ].map((tab) => (
                                                      <Link
                                                        key={tab.name}
                                                        to={tab.path}
                                                        style={{
                                                          ...styles.tab,
                                                          ...(tab.name === "Personal" ? styles.tabActive : {}),
                                                          textDecoration: "none"
                                                        }}
                                                      >
                                                        {tab.name}
                                                      </Link>
                                                    ))}
        </header>

        {/* Content */}
        <div style={styles.content}>
          <div style={styles.mainGrid}>

            {/* LEFT — Lista */}
            <div style={styles.leftCol}>
              <div style={styles.leftHeader}>
                <div>
                  <h2 style={styles.pageTitle}>Administración de personal</h2>
                  <p style={styles.pageSubtitle}>Directorio del personal de instituto marakame</p>
                </div>
                <button style={styles.registrarBtn} onClick={iniciarNuevo}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Registrar personal
                </button>
              </div>

              {/* Buscador */}
              <div style={styles.searchBox}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  style={styles.searchInput}
                  placeholder="Buscar personal"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>

              {/* Tabla */}
              <div style={styles.tablaCard}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      {["PERSONAL", "DEPARTAMENTO", "PUESTO"].map((col) => (
                        <th key={col} style={styles.th}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtrados.map((emp) => (
                      <tr
                        key={emp.id}
                        style={{ ...styles.tr, ...(seleccionado?.id === emp.id ? styles.trActive : {}) }}
                        onClick={() => seleccionar(emp)}
                      >
                        <td style={styles.td}>
                          <div style={styles.personalCell}>
                            <div style={{ ...styles.miniAvatar, background: avatarColor(emp.id) }}>
                              {initials(emp.nombre)}
                            </div>
                            <span style={styles.personalNombre}>{emp.nombre}</span>
                          </div>
                        </td>
                        <td style={styles.td}>{emp.departamento}</td>
                        <td style={styles.td}>{emp.puesto}</td>
                      </tr>
                    ))}
                    {filtrados.length === 0 && (
                      <tr>
                        <td colSpan={3} style={{ ...styles.td, textAlign: "center", color: "#a0aec0", padding: 32 }}>
                          No se encontró personal
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RIGHT — Panel */}
            <div style={styles.rightCol}>
              {/* ESTADO VACÍO */}
              {panelVacio && (
                <div style={styles.emptyPanel}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#cbd5e0" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <p style={styles.emptyText}>Selecciona un empleado para ver su expediente</p>
                </div>
              )}

              {/* MODO VER / EDITAR */}
              {modo === "editar" && (
                <div style={styles.expedientePanel}>
                  <div style={styles.panelHeader}>EXPEDIENTE DE PERSONAL</div>

                  <div style={styles.seccion}>
                    <div style={styles.seccionBar}>SECCIÓN DE IDENTIDAD</div>

                    <Field label="NOMBRE COMPLETO">
                      <input style={styles.fieldInput} value={form.nombre} onChange={(e) => actualizarCampo("nombre", e.target.value)} />
                    </Field>

                    <Field label="TELÉFONO">
                      <input style={styles.fieldInput} placeholder="Inserte número telefónico..." value={form.telefono || ""} onChange={(e) => actualizarCampo("telefono", e.target.value)} />
                    </Field>

                    <Field label="Información de usuario">
                      <div style={styles.usuarioRow}>
                        <div style={styles.usuarioBadge}>@ {form.usuario}</div>
                        <button style={styles.resetPassBtn} onClick={() => setShowResetPass(!showResetPass)}>
                          RESETEAR CONTRASEÑA
                        </button>
                      </div>
                      {showResetPass && (
                        <input style={{ ...styles.fieldInput, marginTop: 6 }} type="password" placeholder="Nueva contraseña..." />
                      )}
                    </Field>

                    <Field label="RFC">
                      <input style={styles.fieldInput} placeholder="Inserte un RFC..." value={form.rfc} onChange={(e) => actualizarCampo("rfc", e.target.value)} />
                    </Field>

                    <Field label="CURP">
                      <input style={styles.fieldInput} placeholder="Ingresar CURP..." value={form.curp} onChange={(e) => actualizarCampo("curp", e.target.value)} />
                    </Field>

                    <Field label="PUESTO">
                      <input style={styles.fieldInput} placeholder="Insertar un puesto..." value={form.puesto} onChange={(e) => actualizarCampo("puesto", e.target.value)} />
                    </Field>

                    <Field label="DEPARTAMENTO">
                      <select style={styles.fieldSelect} value={form.departamento} onChange={(e) => actualizarCampo("departamento", e.target.value)}>
                        <option value="">Seleccionar área...</option>
                        {AREAS.map((a) => <option key={a}>{a}</option>)}
                      </select>
                    </Field>

                    {/* Facultad de autorización */}
                    <div style={styles.facultadBox}>
                      <div style={styles.facultadInfo}>
                        <div style={styles.facultadTitle}>Facultad de autorización</div>
                        <div style={styles.facultadSub}>Permite al usuario firmar y aprobar órdenes de compra</div>
                      </div>
                      <button
                        style={{ ...styles.toggle, ...(form.facultadAuth ? styles.toggleOn : styles.toggleOff) }}
                        onClick={() => actualizarCampo("facultadAuth", !form.facultadAuth)}
                      >
                        <div style={{ ...styles.toggleThumb, ...(form.facultadAuth ? styles.toggleThumbOn : {}) }} />
                      </button>
                    </div>
                  </div>

                  <button style={styles.actualizarBtn} onClick={actualizarExpediente}>
                    ACTUALIZAR EXPEDIENTE
                  </button>
                  <button style={styles.suspenderBtn} onClick={suspenderUsuario}>
                    SUSPENDER USUARIO
                  </button>
                </div>
              )}

              {/* MODO NUEVO */}
              {modo === "nuevo" && (
                <div style={styles.expedientePanel}>
                  <div style={styles.panelHeader}>REGISTRAR NUEVO PERSONAL</div>

                  <div style={styles.seccion}>
                    <div style={styles.seccionBar}>DATOS GENERALES</div>

                    <Field label="NOMBRE COMPLETO *">
                      <input style={styles.fieldInput} placeholder="Nombre completo..." value={form.nombre} onChange={(e) => actualizarCampo("nombre", e.target.value)} />
                    </Field>

                    <Field label="TELÉFONO">
                      <input style={styles.fieldInput} placeholder="Número telefónico..." value={form.telefono} onChange={(e) => actualizarCampo("telefono", e.target.value)} />
                    </Field>

                    <Field label="NOMBRE DE USUARIO *">
                      <input style={styles.fieldInput} placeholder="ej. juan.perez" value={form.usuario} onChange={(e) => actualizarCampo("usuario", e.target.value)} />
                    </Field>

                    <Field label="CONTRASEÑA TEMPORAL *">
                      <input style={styles.fieldInput} type="password" placeholder="Contraseña inicial..." />
                    </Field>

                    <Field label="RFC">
                      <input style={styles.fieldInput} placeholder="Inserte un RFC..." value={form.rfc} onChange={(e) => actualizarCampo("rfc", e.target.value)} />
                    </Field>

                    <Field label="CURP">
                      <input style={styles.fieldInput} placeholder="Ingresar CURP..." value={form.curp} onChange={(e) => actualizarCampo("curp", e.target.value)} />
                    </Field>

                    <Field label="ÁREA / DEPARTAMENTO *">
                      <select style={styles.fieldSelect} value={form.departamento} onChange={(e) => actualizarCampo("departamento", e.target.value)}>
                        <option value="">Seleccionar área...</option>
                        {AREAS.map((a) => <option key={a}>{a}</option>)}
                      </select>
                    </Field>

                    <Field label="PUESTO *">
                      <select style={styles.fieldSelect} value={form.puesto} onChange={(e) => actualizarCampo("puesto", e.target.value)}>
                        <option value="">Seleccionar puesto...</option>
                        {PUESTOS.map((p) => <option key={p}>{p}</option>)}
                      </select>
                    </Field>

                    <div style={styles.facultadBox}>
                      <div style={styles.facultadInfo}>
                        <div style={styles.facultadTitle}>Facultad de autorización</div>
                        <div style={styles.facultadSub}>Permite firmar y aprobar órdenes de compra</div>
                      </div>
                      <button
                        style={{ ...styles.toggle, ...(form.facultadAuth ? styles.toggleOn : styles.toggleOff) }}
                        onClick={() => actualizarCampo("facultadAuth", !form.facultadAuth)}
                      >
                        <div style={{ ...styles.toggleThumb, ...(form.facultadAuth ? styles.toggleThumbOn : {}) }} />
                      </button>
                    </div>
                  </div>

                  <div style={styles.nuevoAcciones}>
                    <button style={styles.cancelarBtn} onClick={cancelar}>Cancelar</button>
                    <button style={styles.actualizarBtn} onClick={guardarNuevo}>GUARDAR PERSONAL</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper component
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 9, fontWeight: 700, color: "#a0aec0", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 5 }}>
        {label}
      </div>
      {children}
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
  breadcrumb: { fontSize: 11, color: "#718096", padding: "8px 24px 0" },
  topTabs: { display: "flex", padding: "0 24px" },
  tab: {
  background: "none",
  border: "none",
  padding: "14px 18px",
  cursor: "pointer",
  fontSize: 13,
  color: "#718096",
  borderBottom: "2px solid transparent",
  whiteSpace: "nowrap",
  fontWeight: 500
},

tabActive: {
  color: "#3182ce",
  borderBottom: "2px solid #3182ce",
  fontWeight: 700
},
  content: { padding: "20px 24px", flex: 1 },
  mainGrid: { display: "grid", gridTemplateColumns: "1fr 280px", gap: 20, alignItems: "start" },

  // Left
  leftCol: { display: "flex", flexDirection: "column", gap: 14 },
  leftHeader: { display: "flex", alignItems: "flex-start", justifyContent: "space-between" },
  pageTitle: { fontSize: 18, fontWeight: 800, margin: "0 0 2px", color: "#1a202c" },
  pageSubtitle: { fontSize: 11, color: "#a0aec0", margin: 0 },
  registrarBtn: {
    display: "flex", alignItems: "center", gap: 6,
    background: "#3182ce", border: "none", borderRadius: 8,
    padding: "9px 16px", color: "#fff", fontWeight: 700,
    fontSize: 12, cursor: "pointer", whiteSpace: "nowrap",
    boxShadow: "0 2px 6px rgba(49,130,206,0.3)",
  },

  searchBox: {
    display: "flex", alignItems: "center", gap: 8,
    background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8,
    padding: "9px 14px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  searchInput: { border: "none", background: "transparent", outline: "none", fontSize: 13, color: "#4a5568", width: "100%", fontFamily: "inherit" },

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
  tr: { borderBottom: "1px solid #f7fafc", cursor: "pointer", transition: "background 0.1s" },
  trActive: { background: "#ebf8ff" },
  td: { padding: "13px 18px", fontSize: 13, color: "#4a5568", verticalAlign: "middle" },
  personalCell: { display: "flex", alignItems: "center", gap: 10 },
  miniAvatar: {
    width: 30, height: 30, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 700, fontSize: 11, color: "#fff", flexShrink: 0,
  },
  personalNombre: { fontWeight: 600, color: "#2d3748" },

  // Right panel
  rightCol: { position: "sticky", top: 20 },
  emptyPanel: {
    background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "40px 20px",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center",
  },
  emptyText: { fontSize: 12, color: "#a0aec0", margin: 0 },

  expedientePanel: {
    background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden",
    display: "flex", flexDirection: "column",
  },
  panelHeader: {
    background: "#1a202c", color: "#e2e8f0",
    padding: "12px 18px", fontSize: 11, fontWeight: 700,
    letterSpacing: 0.5, textTransform: "uppercase",
  },
  seccion: { padding: "16px 18px", flex: 1 },
  seccionBar: {
    background: "#ebf8ff", color: "#2b6cb0",
    padding: "6px 12px", borderRadius: 6,
    fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
    marginBottom: 14, borderLeft: "3px solid #3182ce",
  },

  fieldInput: {
    width: "100%", border: "none", borderBottom: "1.5px solid #e2e8f0",
    padding: "6px 2px", fontSize: 12, color: "#2d3748",
    background: "transparent", outline: "none", fontFamily: "inherit",
    boxSizing: "border-box",
  },
  fieldSelect: {
    width: "100%", border: "none", borderBottom: "1.5px solid #e2e8f0",
    padding: "6px 2px", fontSize: 12, color: "#2d3748",
    background: "transparent", outline: "none", fontFamily: "inherit",
    cursor: "pointer",
  },

  usuarioRow: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
  usuarioBadge: {
    background: "#f7fafc", border: "1px solid #e2e8f0",
    borderRadius: 6, padding: "4px 10px", fontSize: 12,
    fontWeight: 600, color: "#4a5568",
  },
  resetPassBtn: {
    background: "#edf2f7", border: "1px solid #e2e8f0",
    borderRadius: 5, padding: "4px 8px", fontSize: 9,
    fontWeight: 700, color: "#4a5568", cursor: "pointer",
    letterSpacing: 0.3,
  },

  facultadBox: {
    background: "#ebf8ff", borderRadius: 8, padding: "10px 12px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: 10, marginTop: 4,
  },
  facultadInfo: { flex: 1 },
  facultadTitle: { fontWeight: 700, fontSize: 11, color: "#2b6cb0" },
  facultadSub: { fontSize: 9, color: "#4299e1", marginTop: 2, lineHeight: 1.4 },

  toggle: {
    width: 38, height: 22, borderRadius: 11, border: "none",
    cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0, padding: 0,
  },
  toggleOn: { background: "#3182ce" },
  toggleOff: { background: "#cbd5e0" },
  toggleThumb: {
    position: "absolute", top: 3, left: 3,
    width: 16, height: 16, borderRadius: "50%", background: "#fff",
    transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
  },
  toggleThumbOn: { left: 19 },

  actualizarBtn: {
    margin: "0 18px 10px", background: "#3182ce", border: "none",
    borderRadius: 7, padding: "11px", color: "#fff",
    fontWeight: 700, fontSize: 12, cursor: "pointer",
    letterSpacing: 0.3,
  },
  suspenderBtn: {
    margin: "0 18px 18px", background: "#fff", border: "1.5px solid #fc8181",
    borderRadius: 7, padding: "10px", color: "#e53e3e",
    fontWeight: 700, fontSize: 12, cursor: "pointer",
    letterSpacing: 0.3,
  },
  nuevoAcciones: { display: "flex", gap: 8, margin: "0 18px 18px" },
  cancelarBtn: {
    flex: 1, background: "#fff", border: "1px solid #e2e8f0",
    borderRadius: 7, padding: "10px", color: "#718096",
    fontWeight: 600, fontSize: 12, cursor: "pointer",
  },
};