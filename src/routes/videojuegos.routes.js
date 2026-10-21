import { Router } from "express";
import { videojuegos } from "../data/videojuegos.db.js";
import { validarVideojuego } from "../middlewares/validator.js";
import { crearJuegoLimiter } from "../middlewares/rateLimiter.js";
 
const router = Router();
 
// Listar todos los videojuegos del arreglo
router.get("/", (req, res) => {
  res.status(200).json({
    exito: true,
    total: videojuegos.length,
    rateLimitInfo: req.rateLimit
      ? {
          limiteVentana: req.rateLimit.limit,
          usados: req.rateLimit.current,
          tokensRestantes: req.rateLimit.remaining
        }
      : undefined,
    datos: videojuegos
  });
});
 
// Buscar un videojuego por su ID
router.get("/:id", (req, res) => {
  const idBuscado = parseInt(req.params.id, 10);
 
  if (isNaN(idBuscado)) {
    return res.status(400).json({
      exito: false,
      error: "El parámetro ID debe ser un número entero válido."
    });
  }
 
  const juegoEncontrado = videojuegos.find((j) => j.id === idBuscado);
 
  if (!juegoEncontrado) {
    return res.status(404).json({
      exito: false,
      error: `No se encontró ningún videojuego con el ID ${idBuscado}.`
    });
  }
 
  res.status(200).json({
    exito: true,
    mensaje: "Videojuego encontrado exitosamente.",
    videojuego: juegoEncontrado
  });
});
 
// Crear un nuevo videojuego en el arreglo
router.post("/", crearJuegoLimiter, validarVideojuego, (req, res) => {
  const { titulo, genero, plataforma, precio } = req.body;
 
  const nuevoId =
    videojuegos.length > 0
      ? Math.max(...videojuegos.map((j) => j.id)) + 1
      : 1;
 
  const nuevoJuego = {
    id: nuevoId,
    titulo: titulo.trim(),
    genero: genero.trim(),
    plataforma: plataforma.trim(),
    precio: Number(precio)
  };
 
  videojuegos.push(nuevoJuego);
 
  res.status(201).json({
    exito: true,
    mensaje: "Videojuego agregado exitosamente al catálogo en memoria.",
    videojuego: nuevoJuego
  });
});
 
//  Actualizar un videojuego existente
router.put("/:id", validarVideojuego, (req, res) => {
  const idBuscado = parseInt(req.params.id, 10);
 
  if (isNaN(idBuscado)) {
    return res.status(400).json({
      exito: false,
      error: "El parámetro ID debe ser un número entero válido."
    });
  }
 
  const indice = videojuegos.findIndex((j) => j.id === idBuscado);
 
  if (indice === -1) {
    return res.status(404).json({
      exito: false,
      error: `No se puede actualizar: No existe videojuego con ID ${idBuscado}.`
    });
  }
 
  const { titulo, genero, plataforma, precio } = req.body;
 
  videojuegos[indice] = {
    id: idBuscado,
    titulo: titulo.trim(),
    genero: genero.trim(),
    plataforma: plataforma.trim(),
    precio: Number(precio)
  };
 
  res.status(200).json({
    exito: true,
    mensaje: `Videojuego con ID ${idBuscado} actualizado correctamente.`,
    videojuego: videojuegos[indice]
  });
});
 
//  Eliminar un videojuego del arreglo
router.delete("/:id", (req, res) => {
  const idBuscado = parseInt(req.params.id, 10);
 
  if (isNaN(idBuscado)) {
    return res.status(400).json({
      exito: false,
      error: "El parámetro ID debe ser un número entero válido."
    });
  }
 
  const indice = videojuegos.findIndex((j) => j.id === idBuscado);
 
  if (indice === -1) {
    return res.status(404).json({
      exito: false,
      error: `No se puede eliminar: No existe videojuego con ID ${idBuscado}.`
    });
  }
 
  const [juegoEliminado] = videojuegos.splice(indice, 1);
 
  res.status(200).json({
    exito: true,
    mensaje: `Videojuego con ID ${idBuscado} eliminado del catálogo.`,
    videojuego: juegoEliminado
  });
});
 
export default router