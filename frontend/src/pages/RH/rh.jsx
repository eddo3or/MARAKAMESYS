import { useState } from "react";
import Sidebar from "../../components/Sidebar";

const EMPLEADOS = [
  { id: 1, nombre: "Dr. Aristeo V.", cargo: "Director Médico", puesto: "DIRECTOR GENERAL", foto: null },
  { id: 2, nombre: "Lic. María Torres", cargo: "Recursos Humanos", puesto: "COORDINADORA RH", foto: null },
  { id: 3, nombre: "Dr. Carlos Ruiz", cargo: "Médico General", puesto: "MÉDICO", foto: null },
  { id: 4, nombre: "Enf. Patricia L.", cargo: "Enfermería", puesto: "ENFERMERA", foto: null },
];

const TIPOS_INCIDENCIA = [
  "Falta injustificada",
  "Retardo",
  "Permiso con goce",
  "Permiso sin goce",
  "Incapacidad médica",
  "Vacaciones",
  "Suspensión",
];

export default function RegistroIncidencia() {
  const [busqueda, setBusqueda] = useState("");
  const [empleadoSel, setEmpleadoSel] = useState(EMPLEADOS[0]);
  const [tipoIncidencia, setTipoIncidencia] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [justificante, setJustificante] = useState(null);

  const filtrados = busqueda
    ? EMPLEADOS.filter((e) => e.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    : EMPLEADOS;

  const calcularDias = () => {
    if (!fechaDesde || !fechaHasta) return 0;
    const d1 = new Date(fechaDesde);
    const d2 = new Date(fechaHasta);
    const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? diff + 1 : 0;
  };

  const handleJustificante = (e) => {
    const file = e.target.files[0];
    if (file) setJustificante(file.name);
  };

  const initials = (nombre) => nombre.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div style={styles.page}>
      {/* Sidebar */}
       <Sidebar styles={styles} />

      {/* Main */}
      <main style={styles.main}>
        {/* Top Bar */}
        <header style={styles.topBar}>
          <span style={styles.topBarTitle}>Registro de incidencia</span>
        </header>

        {/* Content */}
        <div style={styles.content}>
          <div style={styles.mainGrid}>

            {/* LEFT — Selección de empleado */}
            <div style={styles.leftCol}>
              <div style={styles.leftCard}>
                <div style={styles.leftCardTitle}>Selección de Empleado</div>
                <div style={styles.leftCardSub}>BUSCADOR</div>

                {/* Search */}
                <div style={styles.searchBox}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input
                    style={styles.searchInput}
                    placeholder="Nombre completo"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                </div>

                {/* Lista si hay búsqueda */}
                {busqueda && (
                  <div style={styles.searchResults}>
                    {filtrados.map((emp) => (
                      <div
                        key={emp.id}
                        style={{ ...styles.searchResultItem, ...(empleadoSel?.id === emp.id ? styles.searchResultActive : {}) }}
                        onClick={() => { setEmpleadoSel(emp); setBusqueda(""); }}
                      >
                        <div style={styles.resultAvatar}>{initials(emp.nombre)}</div>
                        <div>
                          <div style={styles.resultNombre}>{emp.nombre}</div>
                          <div style={styles.resultCargo}>{emp.cargo}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Card empleado seleccionado */}
                {empleadoSel && (
                  <div style={styles.empleadoCard}>
                    <div style={styles.empleadoAvatarWrap}>
                      <div style={styles.empleadoAvatar}>
                        {initials(empleadoSel.nombre)}
                      </div>
                    </div>
                    <div style={styles.empleadoNombre}>{empleadoSel.nombre}</div>
                    <div style={styles.empleadoCargo}>{empleadoSel.cargo}</div>
                    <div style={styles.puestoBadge}>{empleadoSel.puesto}</div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT — Formulario */}
            <div style={styles.rightCol}>
              <h2 style={styles.pageTitle}>1. Registro de incidencia</h2>

              {/* Tipo de incidencia */}
              <div style={styles.formGroup}>
                <label style={styles.label}>TIPO DE INCIDENCIA</label>
                <div style={styles.dropdownWrapper}>
                  <button
                    style={styles.dropdownBtn}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <span style={{ color: tipoIncidencia ? "#2d3748" : "#a0aec0", fontWeight: tipoIncidencia ? 600 : 400 }}>
                      {tipoIncidencia || "Seleccione una opción"}
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2.5"
                      style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div style={styles.dropdownMenu}>
                      {TIPOS_INCIDENCIA.map((tipo) => (
                        <div
                          key={tipo}
                          style={{ ...styles.dropdownOption, ...(tipoIncidencia === tipo ? styles.dropdownOptionActive : {}) }}
                          onClick={() => { setTipoIncidencia(tipo); setDropdownOpen(false); }}
                        >
                          {tipo}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Periodo */}
              <div style={styles.periodoCard}>
                <div style={styles.periodoTitle}>Periodo de la Incidencia</div>
                <div style={styles.periodoGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>FECHA DESDE</label>
                    <div style={styles.dateInputWrap}>
                      <input
                        type="date"
                        style={styles.dateInput}
                        value={fechaDesde}
                        onChange={(e) => setFechaDesde(e.target.value)}
                      />
                      <svg style={styles.dateIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                      </svg>
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>FECHA HASTA</label>
                    <div style={styles.dateInputWrap}>
                      <input
                        type="date"
                        style={styles.dateInput}
                        value={fechaHasta}
                        onChange={(e) => setFechaHasta(e.target.value)}
                      />
                      <svg style={styles.dateIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                      </svg>
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>TOTAL DE DÍAS/HORAS</label>
                    <input
                      style={styles.diasInput}
                      value={calcularDias()}
                      readOnly
                    />
                  </div>
                </div>

                {/* Observaciones */}
                <div style={{ ...styles.formGroup, marginTop: 16 }}>
                  <label style={styles.label}>OBSERVACIONES ADMINISTRATIVAS</label>
                  <textarea
                    style={styles.textarea}
                    placeholder="Describa porque es necesaria esta adquisición y el impacto en las operaciones..."
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>

              {/* Acciones */}
              <div style={styles.accionesRow}>
                <label style={styles.adjuntarJustBtn}>
                  <input type="file" accept=".jpg,.png,.pdf" style={{ display: "none" }} onChange={handleJustificante} />
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={justificante ? "#3182ce" : "#a0aec0"} strokeWidth="2">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                  </svg>
                  <span style={{ color: justificante ? "#3182ce" : "#a0aec0", fontWeight: justificante ? 600 : 400 }}>
                    {justificante ? justificante : "Adjuntar justificante"}
                  </span>
                </label>

                <button style={styles.adjuntarIncBtn}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
                  </svg>
                  Adjuntar incidencia
                </button>
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
    display: "flex", alignItems: "center", padding: "0 24px", height: 48, flexShrink: 0,
  },
  topBarTitle: { fontSize: 13, fontWeight: 600, color: "#3182ce" },

  content: { padding: "20px 24px", flex: 1 },
  mainGrid: { display: "grid", gridTemplateColumns: "220px 1fr", gap: 20, alignItems: "start" },

  // Left col
  leftCol: {},
  leftCard: {
    background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "16px",
    display: "flex", flexDirection: "column", gap: 10,
  },
  leftCardTitle: { fontWeight: 700, fontSize: 13, color: "#2d3748" },
  leftCardSub: { fontSize: 9, fontWeight: 700, color: "#a0aec0", textTransform: "uppercase", letterSpacing: 0.5 },
  searchBox: {
    display: "flex", alignItems: "center", gap: 8,
    border: "1px solid #e2e8f0", borderRadius: 7,
    padding: "7px 10px", background: "#f7fafc",
  },
  searchInput: { border: "none", background: "transparent", outline: "none", fontSize: 12, color: "#4a5568", width: "100%", fontFamily: "inherit" },

  searchResults: {
    border: "1px solid #e2e8f0", borderRadius: 8,
    background: "#fff", overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  searchResultItem: {
    display: "flex", alignItems: "center", gap: 8,
    padding: "8px 12px", cursor: "pointer", borderBottom: "1px solid #f7fafc",
  },
  searchResultActive: { background: "#ebf8ff" },
  resultAvatar: {
    width: 28, height: 28, borderRadius: "50%", background: "#4299e1",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 700, fontSize: 10, color: "#fff", flexShrink: 0,
  },
  resultNombre: { fontWeight: 600, fontSize: 12, color: "#2d3748" },
  resultCargo: { fontSize: 10, color: "#a0aec0" },

  empleadoCard: {
    background: "linear-gradient(160deg, #434190, #3182ce)",
    borderRadius: 10, padding: "20px 16px",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
    marginTop: 4,
  },
  empleadoAvatarWrap: {
    width: 70, height: 70, borderRadius: "50%",
    border: "3px solid rgba(255,255,255,0.4)",
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(255,255,255,0.15)", marginBottom: 2,
  },
  empleadoAvatar: {
    fontSize: 22, fontWeight: 800, color: "#fff",
  },
  empleadoNombre: { fontWeight: 800, fontSize: 14, color: "#fff", textAlign: "center" },
  empleadoCargo: { fontSize: 11, color: "rgba(255,255,255,0.75)", textAlign: "center" },
  puestoBadge: {
    background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: 20, padding: "4px 14px",
    fontSize: 9, fontWeight: 700, color: "#fff",
    letterSpacing: 0.8, textTransform: "uppercase", marginTop: 4,
  },

  // Right col
  rightCol: { display: "flex", flexDirection: "column", gap: 18 },
  pageTitle: { fontSize: 18, fontWeight: 800, margin: 0, color: "#1a202c" },

  formGroup: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 10, fontWeight: 700, color: "#718096", textTransform: "uppercase", letterSpacing: 0.4 },

  dropdownWrapper: { position: "relative" },
  dropdownBtn: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: 12, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8,
    padding: "10px 14px", cursor: "pointer", fontSize: 13, width: "100%",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)", minWidth: 220,
  },
  dropdownMenu: {
    position: "absolute", top: "110%", left: 0, right: 0,
    background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8,
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)", zIndex: 30, overflow: "hidden",
  },
  dropdownOption: { padding: "9px 14px", cursor: "pointer", fontSize: 13, color: "#4a5568" },
  dropdownOptionActive: { background: "#ebf8ff", color: "#2b6cb0", fontWeight: 700 },

  // Periodo card
  periodoCard: {
    background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "18px 20px",
  },
  periodoTitle: { fontWeight: 700, fontSize: 13, color: "#2d3748", marginBottom: 16 },
  periodoGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 },

  dateInputWrap: { position: "relative" },
  dateInput: {
    width: "100%", border: "none", borderBottom: "1.5px solid #e2e8f0",
    padding: "7px 28px 7px 2px", fontSize: 13, color: "#4a5568",
    background: "transparent", outline: "none", fontFamily: "inherit",
    boxSizing: "border-box",
  },
  dateIcon: { position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" },

  diasInput: {
    border: "none", borderBottom: "1.5px solid #e2e8f0",
    padding: "7px 2px", fontSize: 13, color: "#2d3748",
    background: "transparent", outline: "none", fontFamily: "inherit",
    fontWeight: 600, width: "100%",
  },

  textarea: {
    border: "1px solid #edf2f7", borderRadius: 7,
    padding: "10px 12px", fontSize: 12, color: "#4a5568",
    background: "#f7fafc", outline: "none", resize: "none",
    fontFamily: "inherit", lineHeight: 1.6,
  },

  // Acciones
  accionesRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 },
  adjuntarJustBtn: {
    display: "flex", alignItems: "center", gap: 8,
    background: "#f7fafc", border: "1px solid #e2e8f0", borderRadius: 8,
    padding: "10px 18px", cursor: "pointer", fontSize: 12, fontWeight: 500,
  },
  adjuntarIncBtn: {
    display: "flex", alignItems: "center", gap: 8,
    background: "#3182ce", border: "none", borderRadius: 8,
    padding: "11px 22px", color: "#fff", fontWeight: 700,
    fontSize: 13, cursor: "pointer", boxShadow: "0 2px 8px rgba(49,130,206,0.3)",
  },
};