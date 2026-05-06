import express from "express";
import cors from "cors";


import empleadosRoutes from "./routes/empleadosRoutes.js";
import requisicionesRoutes from "./routes/requisicionesRoutes.js";



const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/empleados", empleadosRoutes);
app.use("/api/requisiciones", requisicionesRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});