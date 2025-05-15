// categoria.routes.js
const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "AM_Multi",
});

connection.connect((err) => {
  if (err) {
    console.error("Error de conexión a MySQL:", err);
    return;
  }
  console.log("Conectado a MySQL desde rutas de categoría");
});

// Obtener todas las categorías
router.get("/", (req, res) => {
  connection.query("SELECT * FROM Categoria", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Agregar nueva categoría
router.post("/", (req, res) => {
  const { NombreCategoria } = req.body;

  if (!NombreCategoria) {
    return res
      .status(400)
      .json({ error: "El nombre de la categoría es requerido" });
  }

  const sql = "INSERT INTO Categoria (NombreCategoria) VALUES (?)";
  connection.query(sql, [NombreCategoria], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ insertado: true, id: result.insertId });
  });
});

// Eliminar categoría por ID
router.delete("/:id", (req, res) => {
  const categoriaId = req.params.id;
  const sql = "DELETE FROM Categoria WHERE id = ?";
  connection.query(sql, [categoriaId], (err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Categoría no encontrada" });
    }
    res.json({ mensaje: "Categoría eliminada", id: categoriaId });
  });
});

module.exports = router;
