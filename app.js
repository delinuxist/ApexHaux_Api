const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const usersRoutes = require("./src/routes/user.routes");
const propertyRoutes = require("./src/routes/property.routes");
const reportRoutes = requires("./src/routes/report.routes.js");

const app = express();

//port
const Port = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req, res) => {
  res.send("Welcome to ApexHauz Api");
});

app.use(`${process.env.v1}/users`, usersRoutes);
app.use(`${process.env.v1}/property`, propertyRoutes);
app.use(`${process.env.v1}/report`, reportRoutes);

//start server
app.listen(Port, () => {
  console.log(`🚀🚀 Server running on port: ${Port} `);
});
