//Rutas para acceder a las consultas
const express = require('express');
const router = express.Router();
const { protegerRuta } = require('../../../middleware/authMiddleware'); // middleware autenticacion

const PlanController = require('../controllers/PlanController');
const SuscripcionController = require('../controllers/SuscripcionController');
const DestacadosController = require('../controllers/DestacadosController');

/* Rutas Get */

//Traer todos los planes junto con sus detalles

router.get('/planes/', PlanController.getAllPlanes);

// Traer todas las suscripciones de un customer junto con su plan
router.get('/customer/:idCustomer',protegerRuta(['admin','customer']), SuscripcionController.getSuscripcionesCustomer)


// Traer todos los inmuebles destacados 
router.get('/destacados/', DestacadosController.getDestacados)

// Traer todos los inmuebles destacados activos
router.get('/destacados/activos', DestacadosController.getDestacadosActivos)

// Traer todos los inmueebles destacados de un customer
router.get('/destacados/customer/:idCustomer', DestacadosController.getDestacadosCustomer)



/* Rutas POST */

// Recibir un pago
router.post('/suscripcion/pago', SuscripcionController.handlePago)


//Insertar un inmueble en destacados (o actualizarlo si ya existe)
router.post('/destacados/:idInmueble', protegerRuta(['admin', 'customer']), DestacadosController.insertarDestacado)


module.exports = router;