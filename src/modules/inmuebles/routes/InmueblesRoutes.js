//Rutas para acceder a las consultas
const express = require('express');
const router = express.Router();
const getController = require("../controllers/GetController");

// Definir una ruta para obtener todos los departamentos con sus ciudades
router.get('/departamentos-ciudades', getController.getDepartamentosConCiudades);

module.exports = router;