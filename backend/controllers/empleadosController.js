import * as empleadoModel from "../models/empleadosModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = "secreto_super_seguro";

export const loginEmpleado = async (req, res) => {
  const { nombre_usuario, password } = req.body;

  try {
    const empleado = await empleadoModel.findByUser(nombre_usuario);

    if (!empleado) {
      return res.status(401).json({ error: "Usuario no existe" });
    }

    const match = await bcrypt.compare(password, empleado.password_hash);

    if (!match) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      {
        id: empleado.id_empleado,
        nombre: empleado.nombre_completo,
      },
      SECRET,
      { expiresIn: "8h" }
    );

    res.json({
  message: "Login exitoso",
  user: {
    id: empleado.id_empleado,
    nombre: empleado.nombre_completo,
    puesto: empleado.puesto,
    autorizador: empleado.es_autorizador
  }
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en login" });
  }
};
export const createEmpleado = async (req, res) => {
  const { nombre_completo, nombre_usuario, password, id_departamento } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    await empleadoModel.create({
      nombre_completo,
      nombre_usuario,
      password_hash: hash,
      id_departamento
    });

    res.json({ message: "Empleado creado" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear empleado" });
  }
};



// 🔹 Obtener empleados
export const getEmpleados = async (req, res) => {
  try {
    const empleados = await empleadoModel.getAll();
    res.json(empleados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener empleados" });
  }
};