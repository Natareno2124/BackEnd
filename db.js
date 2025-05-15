const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Conexión a MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "AM_Multi",
});

connection.connect((err) => {
  if (err) {
    console.error("Error de conexión:", err);
    return;
  }
  console.log("Conectado a MySQL");
});

// ✅ Ruta de prueba de usuarios
app.get("/usuarios", (req, res) => {
  connection.query("SELECT * FROM usuarios", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// ✅ Ruta de login
app.post("/login", (req, res) => {
  console.log("Datos recibidos:", req.body);
  const { nombre, contrasena } = req.body;

  const query = "SELECT * FROM usuarios WHERE nombre = ? AND contrasena = ?";
  connection.query(query, [nombre, contrasena], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error en el servidor" });
    }

    if (results.length > 0) {
      res.json({ accesoPermitido: true });
    } else {
      res.status(401).json({ accesoPermitido: false });
    }
  });
});

// ✅ Rutas de entidades
const clientesRoutes = require("./clientes.routes");
app.use("/clientes", clientesRoutes);

const proveedoresRoutes = require("./proveedores.routes");
app.use("/proveedores", proveedoresRoutes);

const categoriasRoutes = require("./categoria.routes");
app.use("/categorias", categoriasRoutes);

// ✅ Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor backend en puerto 3000");
});
