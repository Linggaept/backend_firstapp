const fs = require("fs");
const mysql = require("mysql2");
const path = require("path");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: fs.readFileSync(path.resolve(__dirname, "ca.pem")),
    rejectUnauthorized: true,
  },
});

db.connect((err) => {
  if (err) {
    console.error("Connection error:", err);
    return;
  }
  console.log("MySQL Connected (Aiven)");
});

module.exports = db;
