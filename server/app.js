import createError from "http-errors";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import hbs from "hbs";

// Importando winston para logging
import logger from "./lib/winston.js";

// Importando enrutadores
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import authorRouter from "./routes/author.js";

// Importando helpers/configuración
import { configureHandlebars } from "./lib/handlebars.js";

// Variables para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear app
const app = express();

logger.info("Creando instancia de Express");
logger.info("Iniciando configuración");

// Configuración de Handlebars
configureHandlebars(app);

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Morgan + Winston
app.use(
  morgan("dev", {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

// Configuración producción
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "dist")));

  console.log("Ruta: " + path.join(__dirname, "public"));
}

// Rutas
app.use(["/", "/index"], indexRouter);
app.use("/users", usersRouter);
app.use("/author", authorRouter);

// Error 404
app.use(function (req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

export default app;
