import express from "express";
import { crearRequisicion } from "../controllers/requisicionesController.js";

const router = express.Router();

router.post("/", crearRequisicion);

export default router;