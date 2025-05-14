const express = require('express');
const router = express.Router();
const db = require('../db');

// GET: listar usuarios
router.get('/', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST: crear usuario
router.post('/', (req, res) => {
  const { nombre, contrasena } = req.body;
  db.query('INSERT INTO usuarios (nombre, correo) VALUES (?, ?)', [nombre, contrasena], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, nombre, contrasena });
  });
});

module.exports = router;
