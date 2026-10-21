/**
 * Servidor Principal Express con Middleware express-rate-limit (ESM)
 * ------------------------------------------------------------------
 * Aplicación educativa de Campuslands que protege una API REST de Videojuegos
 * almacenados en un arreglo en memoria utilizando express-rate-limit como middleware.
 */
 
import express from "express";
import { logger } from "./middlewares/logger.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import videojuegosRouter from "./routes/videojuegos.routes.js";
 

const app = express();
const PORT = process.env.PORT || 3000;
 

app.use(express.json());
app.use(logger);
 

app.get("/", (req, res) => {
  res.status(200).json({
    mensaje: "🎮 Bienvenido a la API de Videojuegos protegida con express-rate-limit (Campuslands)",
    seguridad: "Middleware express-rate-limit activo en /api/ (Máx. 5 peticiones por minuto por IP)",
    almacenamiento: "Arreglo de videojuegos en memoria RAM (sin base de datos externa)",
    endpoints: {
      listar_juegos: "GET /api/videojuegos",
      buscar_por_id: "GET /api/videojuegos/:id",
      crear_juego: "POST /api/videojuegos",
      actualizar_juego: "PUT /api/videojuegos/:id",
      eliminar_juego: "DELETE /api/videojuegos/:id"
    }
  });
});
 

app.use("/api/", apiLimiter);
 

app.use("/api/videojuegos", videojuegosRouter);
 

app.use((req, res) => {
  res.status(404).json({
    exito: false,
    error: `La ruta '${req.method} ${req.originalUrl}' no existe en el servidor de videojuegos.`
  });
});
 

app.use(errorHandler);
 
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`\n=============================================================`);
    console.log(` Servidor de Videojuegos iniciado en http://localhost:${PORT}`);
    console.log(`Rate Limit activo en /api/videojuegos (Máx: 5 req / min)`);
    console.log(`=============================================================\n`);
  });
}
 
export default app;