import { Router } from "express";
import {
  getRequisiciones,
  createRequisicion
} from "../controllers/requisicionesController.js";

const router = Router();

router.get("/", getRequisiciones);
router.post("/", createRequisicion);

export default router;