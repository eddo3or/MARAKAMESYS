import db from "../bd/db.js";

export const getAll = async () => {
  const [rows] = await db.query("SELECT * FROM empleados");
  return rows;
};

export const create = async (empleado) => {
  const { nombre_completo, nombre_usuario, password_hash, id_departamento } = empleado;

  await db.query(
    "INSERT INTO empleados (nombre_completo, nombre_usuario, password_hash, id_depto) VALUES (?, ?, ?, ?)",
    [nombre_completo, nombre_usuario, password_hash, id_departamento]
  );
};

export const findByUser = async (nombre_usuario) => {
  const [rows] = await db.query(
    "SELECT * FROM empleados WHERE nombre_usuario = ?",
    [nombre_usuario]
  );
  return rows[0];
};