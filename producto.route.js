// producto.routes.js
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
  console.log("Conectado a MySQL desde rutas de producto");
});

// Obtener todos los productos
router.get("/", (req, res) => {
  connection.query("SELECT * FROM Producto", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Agregar un nuevo producto
router.post("/", (req, res) => {
  const { Nombre, Presentacion, IDCategoría, ID_Proveedor, Costo } = req.body;

  if (
    !Nombre ||
    !Presentacion ||
    !IDCategoría ||
    !ID_Proveedor ||
    Costo === undefined
  ) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  const sql = `INSERT INTO Producto (Nombre, Presentacion, IDCategoría, ID_Proveedor, Costo)
               VALUES (?, ?, ?, ?, ?)`;
  connection.query(
    sql,
    [Nombre, Presentacion, IDCategoría, ID_Proveedor, Costo],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ insertado: true, id: result.insertId });
    }
  );
});

// Eliminar un producto por ID
router.delete("/:id", (req, res) => {
  const productoId = req.params.id;
  const sql = "DELETE FROM Producto WHERE id = ?";
  connection.query(sql, [productoId], (err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.json({ mensaje: "Producto eliminado", id: productoId });
  });
});

module.exports = router;
