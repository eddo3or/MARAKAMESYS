import db from "../bd/db.js";

export const crearRequisicion = async (req, res) => {
  try {
    const {
      folio,
      id_solicitante,
      fecha_emision,
      tipo_compra,
      justificacion,
      estatus,
      articulos
    } = req.body;

    // 1. Insertar requisición
    const [result] = await db.query(
      `INSERT INTO requisiciones 
      (folio, id_solicitante, fecha_emision, tipo_compra, justificacion, estatus) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [folio, id_solicitante, fecha_emision, tipo_compra, justificacion, estatus]
    );

    const id_requisicion = result.insertId;

    // 2. Insertar artículos
    for (const art of articulos) {
      await db.query(
        `INSERT INTO requisicion_detalle 
        (id_requisicion, descripcion, cantidad, unidad) 
        VALUES (?, ?, ?, ?)`,
        [id_requisicion, art.descripcion, art.cantidad, art.unidad]
      );
    }

    res.json({ message: "Requisición creada correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en servidor" });
  }
};