const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

// Configuración de Multer para la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads")); // Directorio donde se guardan los archivos subidos
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Nombre original del archivo subido
  },
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
      cb(null, true)
  }
  else{
    req.fileValidationError = "Forbidden extension";
    return cb(null, false, req.fileValidationError);
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Ruta para mostrar el formulario de carga de archivos
router.get("/", (req, res) => {
  res.render("upload-form-autos", {
    layout: "layouts/main",
    title: "Carga de archivos",
    message: "Formulario de carga de archivos.",
  });
});

// Ruta para manejar la carga de archivos (POST)
router.post("/uploaded", upload.single("file"), (req, res) => {

  if (req.fileValidationError) {

    res.render("upload-success", {
      layout: "layouts/main",
      title: "Carga no lograda",
      noerror:false,
      message: "no es imagen",
    });
    
  }else{
   
    res.render("upload-success", {
      layout: "layouts/main",
      title: "Carga Exitosa",
      noerror:true,
      message: "Imagen de auto cargado exitosamente",
      filename: req.file.filename,
    });

  }


});

module.exports = router;