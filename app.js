const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const hbs = require("hbs");
const uploadRouter = require("./routes/uploadAutos"); // Importa el router de upload

// Cargar variables de entorno
dotenv.config();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "public")));

// Configuración de Handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views", "partials"));

// Middleware para manejar rutas de carga de archivos
app.use("/upload", uploadRouter);

// Ruta principal
app.get("/", (req, res) => {
  res.render("index", {
    layout: "layouts/main",
    title: "Pagina de imagenes de autos",
    message: "Bienvenidos a nuestra aplicación de carga de fotos de autos",
  });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });