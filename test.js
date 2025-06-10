const fs = require("fs");
const mysql = require("mysql2");

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  // ssl: {
  //   ca: fs.readFileSync("./ca.pem").toString(),
  // },
};

// Membuat koneksi
const connection = mysql.createConnection(config);

// Koneksi ke database
connection.connect(function (err) {
  if (err) throw err;

  // Jalankan query
  connection.query("SELECT VERSION() AS version", function (err, results) {
    if (err) throw err;

    console.log(results[0]);
    connection.end(function (err) {
      if (err) throw err;
    });
  });
});
