import { rateLimit } from "express-rate-limit";

// Restriccion para solicitar la api 
export const apiLimiter = rateLimit({
    windowMs: 60 * 100,
    limit: 5,
    statusCode: 429, 
    standardHeaders: "draft-7",
    legacyHeaders: true,
    message: {
        exito: false,
        status: 429,
        error: "Demasiadas solicitudes desde esta IP, por favor intenta de nuevo en un minuto"
    }
})

// Restriccion para crar un  videojuego
export const crearJuegoLimiter = rateLimit({
    windowMs: 60 * 1000, 
    limit: 3, 
    statusCode: 429,
    standardHeaders: "draft-7",
    legacyHeaders: true,
    message: {
        exito: false,
        status: 429,
        error: "Límite de creación alcanzado: Solo puedes registrar 3 videojuegos por minuto.",
    }
});