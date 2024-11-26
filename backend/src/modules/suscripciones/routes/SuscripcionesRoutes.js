//Rutas para acceder a las consultas
const express = require('express');
const router = express.Router();
const { protegerRuta } = require('../../../middleware/authMiddleware'); // middleware autenticacion

const PlanController = require('../controllers/PlanController');
const SuscripcionController = require('../controllers/SuscripcionController');

/* Rutas Get */

//Traer todos los planes junto con sus detalles

router.get('/planes/', PlanController.getAllPlanes);

// Traer todas las suscripciones de un customer junto con su plan
router.get('/customer/:idCustomer', SuscripcionController.getSuscripcionesCustomer)

/* Rutas POST */

// Recibir un pago
router.post('/suscripcion/pago', SuscripcionController.handlePago)


//Insertar un inmueble en destacados (o actualizarlo si ya existe)
//router.post('/destacados')


module.exports = router;