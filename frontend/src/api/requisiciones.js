const API = "http://localhost:3000/api";

// 🔹 Obtener todas las requisiciones
export const getRequisiciones = async () => {
  try {
    const res = await fetch(`${API}/requisiciones`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error al obtener requisiciones:", error);
    return [];
  }
};

// 🔹 Crear una requisición
export const createRequisicion = async (requisicion) => {
  try {
    const res = await fetch(`${API}/requisiciones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requisicion),
    });

    return await res.json();
  } catch (error) {
    console.error("Error al crear requisición:", error);
  }
};