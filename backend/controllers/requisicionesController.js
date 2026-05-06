import db from "../bd/db.js";

// 🔹 Obtener todas
export const getRequisiciones = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT r.*, e.nombre_completo
      FROM requisiciones r
      JOIN empleados e ON r.id_empleado = e.id
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

// 🔹 Crear requisición
export const createRequisicion = async (req, res) => {
  try {
    const { folio, fecha, id_empleado, estado } = req.body;

    await db.query(
      `INSERT INTO requisiciones (folio, fecha, id_empleado, estado)
       VALUES (?, ?, ?, ?)`,
      [folio, fecha, id_empleado, estado]
    );

    res.json({ message: "Requisición creada" });
  } catch (error) {
    res.status(500).json(error);
  }
};