// proveedores.routes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'AM_Multi'
});

connection.connect(err => {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL desde rutas de proveedores');
});

// Obtener todos los proveedores
router.get('/', (req, res) => {
  connection.query('SELECT * FROM Proveedores', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Agregar un nuevo proveedor
router.post('/', (req, res) => {
  const { Proveedor, Correo, Telefono, Direccion, FechaIngreso } = req.body;

  const sql = 'INSERT INTO Proveedores (Proveedor, Correo, Telefono, Direccion, FechaIngreso) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [Proveedor, Correo, Telefono, Direccion, FechaIngreso], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ insertado: true, id: result.insertId });
  });
});

// Eliminar proveedor por ID
router.delete('/:id', (req, res) => {
  const proveedorId = req.params.id;
  const sql = 'DELETE FROM Proveedores WHERE id = ?';
  connection.query(sql, [proveedorId], (err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }
    res.json({ mensaje: 'Proveedor eliminado', id: proveedorId });
  });
});

module.exports = router;
