//Rutas para acceder a las consultas
const express = require('express');
const router = express.Router();
const ciudadController = require("../controllers/CiudadController");
const inmuebleController = require("../controllers/InmuebleController")

// Definir una ruta para obtener todos los departamentos con sus ciudades
router.get('/departamentos-ciudades', ciudadController.getDepartamentosConCiudades);

// ruta para insertar un inmueble
router.post('/insertar-inmueble', inmuebleController.insertInmueble);

module.exports = router;