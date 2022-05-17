const express = require("express");
const cors = require("cors");
require("dotenv").config();
const usersRoutes = require("./src/routes/user.routes");
const propertyRoutes = require("./src/routes/property.routes");
const reportRoutes = require("./src/routes/report.routes.js");
const authRoutes = require("./src/routes/auth.routes.js");

const app = express();

//port
const dev = process.env.port;
const Port = process.env.PORT || dev;

// api version
const v1 = process.env.v1;

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req, res) => {
  res.send("Welcome to ApexHauz Api");
});

app.use(`${v1}/users`, usersRoutes);
app.use(`${v1}/property`, propertyRoutes);
app.use(`${v1}/report`, reportRoutes);

app.use(`${v1}/auth`, authRoutes);

//start server
app.listen(Port, () => {
  console.log(`🚀🚀 Server running on port: ${Port} `);
});
