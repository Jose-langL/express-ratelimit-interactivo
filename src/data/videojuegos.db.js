export let videojuegos = [
  {
    id: 1,
    titulo: "The Legend of Zelda: Tears of the Kingdom",
    genero: "Aventura / RPG",
    plataforma: "Nintendo Switch",
    precio: 69.99
  },
  {
    id: 2,
    titulo: "Elden Ring: Shadow of the Erdtree",
    genero: "Action RPG",
    plataforma: "Multiplataforma",
    precio: 59.99
  },
  {
    id: 3,
    titulo: "Hollow Knight: Silksong",
    genero: "Metroidvania",
    plataforma: "PC / Consolas",
    precio: 29.99
  },
  {
    id: 4,
    titulo: "Cyberpunk 2077: Phantom Liberty",
    genero: "RPG / Ciencia Ficción",
    plataforma: "PC / PS5 / Xbox Series X",
    precio: 49.99
  }
];
 
export function reiniciarVideojuegos() {
  videojuegos.length = 0;
  videojuegos.push(
    {
      id: 1,
      titulo: "The Legend of Zelda: Tears of the Kingdom",
      genero: "Aventura / RPG",
      plataforma: "Nintendo Switch",
      precio: 69.99
    },
    {
      id: 2,
      titulo: "Elden Ring: Shadow of the Erdtree",
      genero: "Action RPG",
      plataforma: "Multiplataforma",
      precio: 59.99
    },
    {
      id: 3,
      titulo: "Hollow Knight: Silksong",
      genero: "Metroidvania",
      plataforma: "PC / Consolas",
      precio: 29.99
    },
    {
      id: 4,
      titulo: "Cyberpunk 2077: Phantom Liberty",
      genero: "RPG / Ciencia Ficción",
      plataforma: "PC / PS5 / Xbox Series X",
      precio: 49.99
    }
  );
  return videojuegos;
}