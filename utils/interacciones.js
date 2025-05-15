// utils/interacciones.js
const fs = require("fs");
const path = require("path");

// Ruta al JSON donde guardamos todo
const DB_PATH = path.join(__dirname, "../interacciones.json");

// Carga el archivo (o empieza uno nuevo si no existe)
function cargarDB() {
  if (!fs.existsSync(DB_PATH)) return {};
  return JSON.parse(fs.readFileSync(DB_PATH));
}

// Guarda el objeto completo
function guardarDB(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

// Registra y devuelve el total actualizado
function registrarInteraccion(tipo, fromId, toId) {
  const db = cargarDB();

  db[tipo] = db[tipo] || {};
  db[tipo][fromId] = db[tipo][fromId] || {};
  db[tipo][fromId][toId] = (db[tipo][fromId][toId] || 0) + 1;

  guardarDB(db);
  return db[tipo][fromId][toId];
}

module.exports = { registrarInteraccion };