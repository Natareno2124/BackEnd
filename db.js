const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Infantes2124',
  database: 'AM_Multi'
});

connection.connect(error => {
  if (error) throw error;
  console.log('✅ Conectado a MySQL');
});

module.exports = connection;
