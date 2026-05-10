import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";

const PROVEEDORES_INICIAL = [
  { id: 1, rfc: "ABC12345678", razonSocial: "HP Health inc", giro: "Médico", telefono: "311-256-9922", direccion: "Av. Cultura 23 Tepnay" },
  { id: 2, rfc: "ACC12345678", razonSocial: "Robert Service", giro: "Oficina", telefono: "311-256-9922", direccion: "Independecia 232 Michoacan" },
  { id: 3, rfc: "ABB12345678", razonSocial: "ABD One Piece", giro: "Oficina", telefono: "311-256-9922", direccion: "Av. Pajaros 15 CDMX" },
  { id: 4, rfc: "XYZ98765432", razonSocial: "MedSupply SA", giro: "Médico", telefono: "312-100-4455", direccion: "Blvd. Salud 10 Guadalajara" },
  { id: 5, rfc: "LMN11223344", razonSocial: "OficMax Norte", giro: "Oficina", telefono: "318-777-3210", direccion: "Calle Norte 88 Monterrey" },
];

const REQUISICIONES = [
  { id: "OC-2026-001", tipo: "EXTRAORDINARIA", nombre: "Medicamentos para dolor", departamento: "Médico", total: 3, seleccionados: 1 },
  { id: "OC-2026-001", tipo: "ORDINARIA", nombre: "Material de curacion", departamento: "Médico", total: 3, seleccionados: 1 },
];

const GIROS = ["Todos", "Médico", "Oficina", "Farmacia", "Limpieza"];

const EMPTY = { rfc: "", razonSocial: "", giro: "", telefono: "", direccion: "" };

export default function AdminProveedores() {
  const [proveedores, setProveedores] = useState(PROVEEDORES_INICIAL);
  const [seleccionados, setSeleccionados] = useState(new Set());
  const [busqueda, setBusqueda] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [formError, setFormError] = useState("");

  // Filtrar por búsqueda (excluyendo los ya seleccionados que van arriba)
  const selArray = proveedores.filter((p) => seleccionados.has(p.id));
  const noSelFiltrados = proveedores
    .filter((p) => !seleccionados.has(p.id))
    .filter((p) => {
      const q = busqueda.toLowerCase();
      return (
        p.rfc.toLowerCase().includes(q) ||
        p.razonSocial.toLowerCase().includes(q) ||
        p.giro.toLowerCase().includes(q)
      );
    });

  const filas = [...selArray, ...noSelFiltrados];

  const toggleSeleccion = (id) => {
    setSeleccionados((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const actualizarForm = (campo, val) => setForm((f) => ({ ...f, [campo]: val }));

  const guardarProveedor = () => {
    if (!form.rfc.trim() || !form.razonSocial.trim()) {
      setFormError("RFC y Razón Social son obligatorios.");
      return;
    }
    setProveedores([...proveedores, { ...form, id: Date.now() }]);
    setForm(EMPTY);
    setFormError("");
    setModalOpen(false);
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
                                    ...(tab.name === "Proveedores" ? styles.tabActive : {}),
                                    textDecoration: "none"
                                  }}
                                >
                                  {tab.name}
                                </Link>
                              ))}
        </header>

        <div style={styles.content}>
          {/* Header */}
          <div style={styles.pageHeader}>
            <h2 style={styles.pageTitle}>Administración de Proveedores</h2>
            <button style={styles.agregarBtn} onClick={() => setModalOpen(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              Agregar Proveedor
            </button>
          </div>

          {/* Buscador */}
          <div style={styles.searchBox}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              style={styles.searchInput}
              placeholder="Buscar por RFC, Razón Social o Giro comercial..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            {busqueda && (
              <button style={styles.clearBtn} onClick={() => setBusqueda("")}>×</button>
            )}
          </div>

          {/* Tabla */}
          <div style={styles.tablaCard}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={{ ...styles.th, width: 36 }}></th>
                  {["RFC", "RAZON SOCIAL", "GIRO COMERCIAL", "TELEFONO", "DIRECCIÓN"].map((col) => (
                    <th key={col} style={styles.th}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filas.length > 0 ? filas.map((prov, idx) => {
                  const isSel = seleccionados.has(prov.id);
                  const isPinned = isSel;
                  const isLastPinned = isPinned && idx === selArray.length - 1 && noSelFiltrados.length > 0;
                  return (
                    <tr
                      key={prov.id}
                      style={{
                        ...styles.tr,
                        ...(isSel ? styles.trSelected : {}),
                        ...(isLastPinned ? styles.trPinnedLast : {}),
                      }}
                    >
                      <td style={{ ...styles.td, textAlign: "center", paddingRight: 0 }}>
                        <input
                          type="checkbox"
                          checked={isSel}
                          onChange={() => toggleSeleccion(prov.id)}
                          style={styles.checkbox}
                        />
                      </td>
                      <td style={styles.td}>{prov.rfc}</td>
                      <td style={{ ...styles.td, fontWeight: 600, color: "#1a202c" }}>{prov.razonSocial}</td>
                      <td style={styles.td}>{prov.giro}</td>
                      <td style={{ ...styles.td, fontWeight: 600 }}>{prov.telefono}</td>
                      <td style={styles.td}>{prov.direccion}</td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan={6} style={{ ...styles.td, textAlign: "center", color: "#a0aec0", padding: 32 }}>
                      No se encontraron proveedores
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Bandeja de requisiciones */}
          <div style={styles.bandejaSection}>
            <div style={styles.bandejaHeader}>
              <span style={styles.bandejaTitle}>Bandeja de requisiciones pendientes</span>
              <span style={styles.pendientesBadge}>{REQUISICIONES.length} Pendientes</span>
            </div>
            <div style={styles.requisicionesGrid}>
              {REQUISICIONES.map((req, i) => (
                <div key={i} style={styles.reqCard}>
                  <div style={styles.reqCardTop}>
                    <span style={styles.reqFolio}>{req.id}</span>
                    <span style={{
                      ...styles.reqTipoBadge,
                      background: req.tipo === "EXTRAORDINARIA" ? "#fff5f5" : "#f7fafc",
                      color: req.tipo === "EXTRAORDINARIA" ? "#c53030" : "#4a5568",
                      border: `1px solid ${req.tipo === "EXTRAORDINARIA" ? "#feb2b2" : "#e2e8f0"}`,
                    }}>
                      {req.tipo}
                    </span>
                  </div>
                  <div style={styles.reqNombre}>{req.nombre}</div>
                  <div style={styles.reqDepto}>Departamento: {req.departamento}</div>
                  <div style={styles.reqProvCount}>
                    Proveedores seleccionados: {req.seleccionados}/{req.total}
                  </div>
                  <div style={styles.reqCardFooter}>
                    <button style={styles.asignarBtn}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                      Asignar Proveedores
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modal nuevo proveedor */}
      {modalOpen && (
        <div style={styles.modalOverlay} onClick={() => setModalOpen(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <span style={styles.modalTitle}>Agregar Proveedor</span>
              <button style={styles.modalClose} onClick={() => setModalOpen(false)}>×</button>
            </div>
            <div style={styles.modalBody}>
              {formError && <div style={styles.formError}>{formError}</div>}

              {[
                { label: "RFC *", campo: "rfc", placeholder: "ABC12345678" },
                { label: "Razón Social *", campo: "razonSocial", placeholder: "Nombre de la empresa" },
                { label: "Teléfono", campo: "telefono", placeholder: "000-000-0000" },
                { label: "Dirección", campo: "direccion", placeholder: "Calle, número, ciudad" },
              ].map(({ label, campo, placeholder }) => (
                <div key={campo} style={styles.modalFormGroup}>
                  <label style={styles.modalLabel}>{label}</label>
                  <input
                    style={styles.modalInput}
                    placeholder={placeholder}
                    value={form[campo]}
                    onChange={(e) => actualizarForm(campo, e.target.value)}
                  />
                </div>
              ))}

              <div style={styles.modalFormGroup}>
                <label style={styles.modalLabel}>Giro Comercial</label>
                <select
                  style={styles.modalSelect}
                  value={form.giro}
                  onChange={(e) => actualizarForm("giro", e.target.value)}
                >
                  <option value="">Seleccionar giro...</option>
                  {GIROS.filter((g) => g !== "Todos").map((g) => <option key={g}>{g}</option>)}
                </select>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.modalCancelBtn} onClick={() => { setModalOpen(false); setFormError(""); }}>Cancelar</button>
              <button style={styles.modalSaveBtn} onClick={guardarProveedor}>Guardar proveedor</button>
            </div>
          </div>
        </div>
      )}
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

  main: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 },
  topBar: { background: "#fff", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", padding: "0 24px", height: 48, flexShrink: 0 },
  tab: { background: "none", border: "none", padding: "14px 16px", cursor: "pointer", fontSize: 12, color: "#718096", borderBottom: "2px solid transparent", whiteSpace: "nowrap", fontWeight: 500 },
  tabActive: { color: "#3182ce", borderBottom: "2px solid #3182ce", fontWeight: 700 },

  content: { padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column", gap: 18 },

  pageHeader: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  pageTitle: { fontSize: 20, fontWeight: 800, margin: 0, color: "#1a202c" },
  agregarBtn: {
    display: "flex", alignItems: "center", gap: 8,
    background: "#3182ce", border: "none", borderRadius: 8,
    padding: "9px 18px", color: "#fff", fontWeight: 700,
    fontSize: 13, cursor: "pointer", boxShadow: "0 2px 6px rgba(49,130,206,0.3)",
  },

  searchBox: {
    display: "flex", alignItems: "center", gap: 8,
    background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8,
    padding: "10px 16px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  searchInput: { border: "none", background: "transparent", outline: "none", fontSize: 13, color: "#4a5568", flex: 1, fontFamily: "inherit" },
  clearBtn: { background: "none", border: "none", cursor: "pointer", color: "#a0aec0", fontSize: 18, lineHeight: 1, padding: 0 },

  tablaCard: { background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "11px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "#a0aec0", textTransform: "uppercase", letterSpacing: 0.5, background: "#f7fafc", borderBottom: "1px solid #e2e8f0" },
  tr: { borderBottom: "1px solid #f7fafc", transition: "background 0.1s" },
  trSelected: { background: "#ebf8ff" },
  trPinnedLast: { borderBottom: "2px solid #bee3f8" },
  td: { padding: "13px 16px", fontSize: 13, color: "#4a5568", verticalAlign: "middle" },
  checkbox: { width: 15, height: 15, cursor: "pointer", accentColor: "#3182ce" },

  // Bandeja
  bandejaSection: { display: "flex", flexDirection: "column", gap: 14 },
  bandejaHeader: { display: "flex", alignItems: "center", gap: 10 },
  bandejaTitle: { fontWeight: 800, fontSize: 15, color: "#1a202c" },
  pendientesBadge: { background: "#ebf8ff", color: "#2b6cb0", border: "1px solid #bee3f8", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 },
  requisicionesGrid: { display: "flex", gap: 14, flexWrap: "wrap" },
  reqCard: {
    background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "14px 16px",
    minWidth: 220, maxWidth: 260, flex: "1 1 220px",
    display: "flex", flexDirection: "column", gap: 6,
  },
  reqCardTop: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 },
  reqFolio: { fontSize: 10, color: "#a0aec0", fontWeight: 600 },
  reqTipoBadge: { borderRadius: 20, padding: "2px 8px", fontSize: 9, fontWeight: 800, letterSpacing: 0.3 },
  reqNombre: { fontWeight: 700, fontSize: 14, color: "#2b6cb0" },
  reqDepto: { fontSize: 11, color: "#718096" },
  reqProvCount: { fontWeight: 700, fontSize: 13, color: "#2b6cb0" },
  reqCardFooter: { marginTop: 4 },
  asignarBtn: {
    display: "flex", alignItems: "center", gap: 6,
    background: "#3182ce", border: "none", borderRadius: 6,
    padding: "7px 14px", color: "#fff", fontWeight: 700,
    fontSize: 11, cursor: "pointer",
  },

  // Modal
  modalOverlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
  },
  modal: {
    background: "#fff", borderRadius: 12, width: 420,
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)", overflow: "hidden",
  },
  modalHeader: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "16px 20px", borderBottom: "1px solid #e2e8f0",
  },
  modalTitle: { fontWeight: 800, fontSize: 15, color: "#1a202c" },
  modalClose: { background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#a0aec0", lineHeight: 1, padding: 0 },
  modalBody: { padding: "18px 20px", display: "flex", flexDirection: "column", gap: 14 },
  formError: { background: "#fff5f5", border: "1px solid #feb2b2", borderRadius: 6, padding: "8px 12px", fontSize: 12, color: "#c53030" },
  modalFormGroup: { display: "flex", flexDirection: "column", gap: 5 },
  modalLabel: { fontSize: 10, fontWeight: 700, color: "#718096", textTransform: "uppercase", letterSpacing: 0.4 },
  modalInput: {
    border: "1px solid #e2e8f0", borderRadius: 7, padding: "9px 12px",
    fontSize: 13, color: "#2d3748", background: "#f7fafc", outline: "none", fontFamily: "inherit",
  },
  modalSelect: {
    border: "1px solid #e2e8f0", borderRadius: 7, padding: "9px 12px",
    fontSize: 13, color: "#2d3748", background: "#f7fafc", outline: "none",
    fontFamily: "inherit", cursor: "pointer",
  },
  modalFooter: {
    display: "flex", gap: 10, padding: "14px 20px",
    borderTop: "1px solid #e2e8f0", justifyContent: "flex-end",
  },
  modalCancelBtn: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 7, padding: "9px 18px", fontSize: 13, fontWeight: 600, color: "#718096", cursor: "pointer" },
  modalSaveBtn: { background: "#3182ce", border: "none", borderRadius: 7, padding: "9px 18px", fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer" },
};