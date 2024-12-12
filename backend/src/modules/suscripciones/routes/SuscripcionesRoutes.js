//Rutas para acceder a las consultas
const express = require('express');
const router = express.Router();
const { protegerRuta } = require('../../../middleware/authMiddleware'); // middleware autenticacion

const PlanController = require('../controllers/PlanController');
const SuscripcionController = require('../controllers/SuscripcionController');
const DestacadosController = require('../controllers/DestacadosController');
const AscensoController = require('../controllers/AscensoController');

/* Rutas Get */

//Traer todos los planes junto con sus detalles

router.get('/planes/', PlanController.getAllPlanes);

//Traer todos los planes activos junto con sus detalles

router.get('/planes/activo', PlanController.getPlanesActivos);

//Traer todos los planes activos dado un tipo de customer junto con sus detalles

router.get('/planes/tipoCustomer/:idPerfil/activo', PlanController.getPlanesActivosTipoCustomer);

// Verificar validez de plan y precioPago
router.get('/planes/:idPlan/precio/:idPrecioPlan/validar', PlanController.validarPrecioPago);

// Traer todas las suscripciones de un customer junto con su plan
router.get('/customer/:idCustomer',protegerRuta(['admin','customer']), SuscripcionController.getSuscripcionesCustomer)


// Traer todos los inmuebles destacados 
router.get('/destacados/', DestacadosController.getDestacados)

// Traer todos los inmuebles destacados activos
router.get('/destacados/activos', DestacadosController.getDestacadosActivos)

// Traer todos los inmueebles destacados de un customer
router.get('/destacados/customer/:idCustomer', DestacadosController.getDestacadosCustomer)



// Traer todos los inmuebles en ascenso
router.get('/ascenso/', AscensoController.getInmueblesAscenso)

// Traer todos los inmuebles en ascenso activos
router.get('/ascenso/activos', AscensoController.getAscendidosActivos)

// Traer todos los inmueebles en ascenso de un customer
router.get('/ascenso/customer/:idCustomer', AscensoController.getAscensoCustomer)



/* Rutas POST */

// Recibir un pago
router.post('/suscripcion/pago', SuscripcionController.handlePago)

// Generar una suscripcion para un plan gratuito
router.post('/suscripcion/gratuita', SuscripcionController.generarSuscripcionGratuita)


//Insertar un inmueble en destacados (o actualizarlo si ya existe)
router.post('/destacados/:idInmueble', protegerRuta(['admin', 'customer']), DestacadosController.insertarDestacado)


//Insertar un inmueble en ascenso (o actualizarlo si ya existe)
router.post('/ascenso/:idInmueble', protegerRuta(['admin', 'customer']), AscensoController.insertarInmuebleAscenso)


module.exports = router;