const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'AM_Multi'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

// Ruta de login
app.post('/login', (req, res) => {
  const { usuario, contrasena } = req.body;

  const query = 'SELECT * FROM usuarios WHERE nombre = ? AND contrasena = ?';
  connection.query(query, [usuario, contrasena], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    if (results.length > 0) {
      res.json({ accesoPermitido: true });
    } else {
      res.status(401).json({ accesoPermitido: false });
    }
  });
});

const clientesRoutes = require('./clientes.routes');
app.use('/clientes', clientesRoutes);

const proveedoresRoutes = require('./proveedores.routes');
app.use('/proveedores', proveedoresRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
