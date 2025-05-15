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
router.get('/totalVentas', (req, res) => {
  connection.query('SELECT SUM(*) FROM venta', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});


router.get('/totalCompras', (req, res) => {
  connection.query('SELECT SUM(*) FROM compra', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});


router.get('/totalCliente', (req, res) => {
  connection.query('SELECT COUNT(*) FROM cliente', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});


module.exports = router;
