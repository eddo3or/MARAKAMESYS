import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Sidebar({ styles }) {
  const { usuario } = useAuth();
  const location = useLocation();

  const menu = [
    {
      label: "Administrativo",
      icon: "🏢",
      children: [
        { name: "Finanzas", path: "/finanzas" },
        { name: "Recursos Humanos", path: "/rh" },
        { name: "Compras", path: "/requisiciones" },
        { name: "Recursos Materiales", path: "/inventario" },
      ],
    },
  ];

  return (
    <aside style={styles.sidebar}>
       {/* LOGO */}
      <div style={styles.logo}>
        <span style={styles.logoText}>MARAKAME</span>
        <span style={styles.logoSub}>CLÍNICA DE DESINTOXICACIÓN</span>
      </div>

      {/* NAV */}
      <nav style={styles.nav}>
        {menu.map((section) => (
          <div key={section.label}>
            <div style={styles.navSection}>
              {section.icon} {section.label}
            </div>

            {section.children.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    ...styles.navItem,
                    ...(location.pathname === item.path
                      ? styles.navItemActive
                      : {}),
                  }}
                >
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        ))}
      </nav>
      {/* USER */}
      <div style={styles.sidebarUser}>
        <div style={styles.avatar}>
          {usuario?.nombre?.charAt(0) || "U"}
        </div>
        <div>
          <div style={styles.userName}>
            {usuario?.nombre || "Usuario"}
          </div>
          <div style={styles.userRole}>
            {usuario?.puesto || "Sistema"}
          </div>
        </div>
      </div>

    </aside>
  );
}