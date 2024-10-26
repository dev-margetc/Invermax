//Rutas para acceder a las consultas
const express = require('express');
const router = express.Router();
const upload = require('../../../middleware/uploadConfig');

const ciudadController = require("../controllers/CiudadController");
const inmuebleController = require("../controllers/InmuebleController");
const detalleInmuebleController = require("../controllers/DetalleController");


// Definir una ruta para obtener todos los departamentos con sus ciudades
router.get('/departamentos-ciudades', ciudadController.getDepartamentosConCiudades);

// ruta para insertar un inmueble
router.post('/insertar-inmueble', inmuebleController.insertInmueble);

// ruta para insertar una foto para un detalle inmueble
router.post('/subir-foto-detalle', upload.single('archivo'),detalleInmuebleController.insertFoto); //No enviar el archivo de primero

// ruta para insertar un video para un detalle inmueble
router.post('/subir-video', inmuebleController.insertInmueble);

module.exports = router;