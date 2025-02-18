//Rutas para acceder a las consultas
const express = require('express');
const router = express.Router();

const { protegerRuta } = require('../../../middleware/authMiddleware'); // middleware autenticacion

const {upload} = require('../../../middleware/uploadConfig'); // midleware archivos

const ServicioController = require("../controllers/ServicioController");

/* Rutas consulta*/
// Traer todos los servicios
router.get('/', ServicioController.getServicios);

/* Rutas creacion*/

// Ruta para crear un servicio
router.post('/', 
protegerRuta(['admin']),
ServicioController.registrarServicio);

/* Rutas actualizacion*/

// Ruta para actualizar un servicio
router.put('/:idServicio', 
    protegerRuta(['admin']),
    upload.array('fotoServicio',1), ServicioController.actualizarServicio);

/* Rutas borrado*/
// Ruta para actualizar un servicio
router.delete('/:idServicio', 
    protegerRuta(['admin']), 
    ServicioController.eliminarServicio);

module.exports = router;