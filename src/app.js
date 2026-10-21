import express from "express";

const app = express();
const PORT = 3000; 

app.get("/", (req, res) => {
    console.log("Bienvendio a la Api de videojuegos protegida con express-rate-limt")
});


app.listen(PORT, () =>{
    console.log(`\n=============================================================`);
    console.log(`Servidor de Videojuegos iniciado en http://localhost:${PORT}`);
    console.log(`Rate Limit activo en /api/videojuegos (Máx: 5 req / min)`);
    console.log(`=============================================================\n`);
});