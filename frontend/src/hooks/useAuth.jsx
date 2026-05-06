import { useState, useEffect } from "react";

export default function useAuth() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user && user !== "undefined") {
      try {
        setUsuario(JSON.parse(user));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  return { usuario };
}