// clientes.routes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'AM_Multi'
});

connection.connect(err => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conectado a MySQL desde rutas de clientes');
});

// Ruta para obtener clientes
router.get('/', (req, res) => {
  connection.query('SELECT * FROM Clientes', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Ruta para agregar cliente
router.post('/', (req, res) => {
  const { Nombres, Correo, telefono, Direccion, FechaIngreso } = req.body;
  const sql = 'INSERT INTO Clientes (Nombres, Correo, telefono, Direccion, FechaIngreso) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [Nombres, Correo, telefono, Direccion, FechaIngreso], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ insertado: true, id: result.insertId });
  });
});

// clientes.routes.js (o como se llame tu archivo de rutas)

router.delete('/:id', (req, res) => {
  const clienteId = req.params.id;
  const sql = 'DELETE FROM Clientes WHERE ID = ?';
  connection.query(sql, [clienteId], (err, result) => {
    if (err) {
      console.error('Error en DELETE:', err);
      return res.status(500).send({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json({ mensaje: 'Cliente eliminado', id: clienteId });
  });
});

module.exports = router;
