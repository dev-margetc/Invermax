//Rutas para acceder a las consultas
const express = require('express');
const router = express.Router();
const upload = require('../../../middleware/uploadConfig');

const ciudadController = require("../controllers/CiudadController");
const inmuebleController = require("../controllers/InmuebleController");
const detalleInmuebleController = require("../controllers/DetalleController");
const interesadoController = require("../controllers/InteresadoController");


// Definir una ruta para obtener todos los departamentos con sus ciudades
router.get('/departamentos-ciudades', ciudadController.getDepartamentosConCiudades);

// ruta para insertar un inmueble
router.post('/insertar-inmueble', inmuebleController.insertInmueble);

// ruta para insertar una foto/video para un detalle inmueble
router.post('/subir-multimedia-detalle', upload.single('archivo'),detalleInmuebleController.insertMultimedia); //No enviar el archivo de primero

// Ruta para asociar una zona a un inmueble
router.post('/agregar-zona', inmuebleController.agregarZona);

// Ruta para insertar un interesado
router.post('/registrar-interesado', interesadoController.registrarInteresado);

module.exports = router;