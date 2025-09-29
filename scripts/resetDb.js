// scripts/resetDb.js
const fs = require("fs");
const path = require("path");

// ruta al db.json de la raíz del proyecto
const dbPath = path.join(__dirname, "..", "db.json");

const initialDb = {
  products: [
    { id: 1, name: "Producto 1", stock: 20, price: 12 },
    { id: 2, name: "Producto 2", stock: 0, price: 10 },
    { id: 3, name: "Producto 3", stock: 5, price: 10 },
  ],
  cart: [],
};

// forzamos a que los IDs sean numéricos
initialDb.products = initialDb.products.map((p) => ({
  ...p,
  id: Number(p.id),
}));

fs.writeFileSync(dbPath, JSON.stringify(initialDb, null, 2), "utf-8");

console.log("✅ Base de datos reseteada en", dbPath);
