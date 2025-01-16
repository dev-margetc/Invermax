//Rutas para acceder a las consultas
const express = require('express');
const router = express.Router();

const { protegerRuta } = require('../../../middleware/authMiddleware'); // middleware autenticacion

const ConfigController = require("../controllers/ConfiguracionesController");
/* Rutas de consulta*/

router.get('/infoInvermax', ConfigController.getInfoInvermax);
/* Rutas de actualizacion*/


router.put('/infoInvermax',ConfigController.updateInfoInvermax);

module.exports = router;