const express = require("express");
const cors = require("cors");
const rootRoutes = require("./routes");
const logger = require("morgan");
const { handleError } = require("./common/helpers/errorHandler");
const StatusError = require("./common/helpers/statusError");
const path = require("path");
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger");

const app = express();

//swagger init
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//middlewares -- body parser etc
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.static(path.resolve("./public")));

//cross-origin policies
app.use(
  cors({
    origin: [
      "http://192.168.1.142:8253",
      "http://127.0.0.1:5173",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  })
);

//intialize routes
app.use("/api/v1", rootRoutes);

// 404
app.use((req, res, next) => next(StatusError.notFound("Route Not found")));

// Overriding the express response
app.use(handleError);

module.exports = app;
