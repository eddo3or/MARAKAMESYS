import { Router } from "express";
import {
  getEmpleados,
  createEmpleado,
  loginEmpleado
} from "../controllers/empleadosController.js";

const router = Router();

router.get("/", getEmpleados);
router.post("/", createEmpleado);
router.post("/login", loginEmpleado);

export default router;