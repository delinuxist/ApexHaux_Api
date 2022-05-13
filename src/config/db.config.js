const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  user: process.env.USERDB,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Database connected 🚀 ");
});

module.exports = connection;
