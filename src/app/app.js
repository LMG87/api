const express = require("express");
const morgan = require("morgan");
const config = require("../config");
const cors = require("cors");
const path = require("path");

const roles = require("../routes/role.routes");
const users = require("../routes/user.routes");
const auth = require("../routes/auth.routes");
const error = require("../red/error");

const app = express();

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuracion
app.set("port", config.app.port);

//rutas
app.use("/api/v1/roles", roles);
app.use("/api/v1/users", users);
app.use("/api/v1/auth", auth);
app.use(error);

// public static files
app.use(express.static(path.join(__dirname, "../../uploads")));

//endpoint not found
app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

module.exports = app;
