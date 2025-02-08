//Rutas para acceder a las consultas
const express = require('express');
const router = express.Router();
const { upload } = require('../../../middleware/uploadConfig');

const { protegerRuta } = require('../../../middleware/authMiddleware'); // middleware autenticacion

const ConfigController = require("../controllers/ConfiguracionesController");
const AliadoController = require("../controllers/AliadoController");
/* Rutas de consulta*/

// Traer info de invermax
router.get('/infoInvermax', ConfigController.getInfoInvermax);

// Traer los aliados
router.get('/aliados', AliadoController.getAliados);

/* Rutas de actualizacion*/

router.put('/aliados/:idAliado',
    // protegerRuta(['admin']),
    upload.array('logoAliado', 1),
    AliadoController.actualizarAliado);

router.put('/infoInvermax',
    protegerRuta(['admin']),
    ConfigController.updateInfoInvermax);

/* Rutas de eliminación */
router.delete('/aliados/:idAliado',
    protegerRuta(['admin']),
    AliadoController.eliminarAliado);

/* Rutas de creacion */
router.post('/aliados',
    upload.none(),
    protegerRuta(['admin']),
    AliadoController.registrarAliado);

module.exports = router;