const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Usa una sola conexión compartida
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'AM_Multi'
});

connection.connect(err => {
  if (err) {
    console.error('Error conectando a MySQL desde productos.routes:', err);
    return;
  }
});

// Obtener productos
router.get('/', (req, res) => {
  connection.query('SELECT * FROM Producto', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Agregar nuevo producto
router.post('/', (req, res) => {
  const { Nombre, Presentacion, IDCategoria, ID_Proveedor, Costo } = req.body;

  const sql = `
    INSERT INTO Producto (Nombre, Presentacion, IDCategoría, ID_Proveedor, Costo)
    VALUES (?, ?, ?, ?, ?)`;

  connection.query(sql, [Nombre, Presentacion, IDCategoria, ID_Proveedor, Costo], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, mensaje: 'Producto creado correctamente' });
  });
});

module.exports = router;
