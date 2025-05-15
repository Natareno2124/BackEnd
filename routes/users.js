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

// Ruta para obtener todos los usuarios
router.get('/', (req, res) => {
  connection.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

module.exports = router;
