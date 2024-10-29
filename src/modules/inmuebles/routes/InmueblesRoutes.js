//Rutas para acceder a las consultas
const express = require('express');
const router = express.Router();
const upload = require('../../../middleware/uploadConfig');

const ciudadController = require("../controllers/CiudadController");
const inmuebleController = require("../controllers/InmuebleController");
const detalleInmuebleController = require("../controllers/DetalleController");
const interesadoController = require("../controllers/InteresadoController");



// ruta para insertar un inmueble (ruta )
router.post('/', inmuebleController.insertInmueble);

// Definir una ruta para obtener todos los departamentos con sus ciudades
router.get('/departamentos/ciudades', ciudadController.getDepartamentosConCiudades);

// ruta para insertar una foto/video para un detalle inmueble
router.post('/detalles/:idDetalle/multimedia', upload.single('archivo'),detalleInmuebleController.insertMultimedia); //No enviar el archivo de primero

// Ruta para asociar una zona a un inmueble
router.post('/:idInmueble/zonas', inmuebleController.agregarZona);

// Ruta para insertar un interesado
router.post('/interesados', interesadoController.registrarInteresado);

/* Ruta para traer inmuebles publicados con el filtro avanzado, incluye: 
    categoria, modalidad, ciudad, monto maximo, habitaciones, baños, parqueadero, amoblado y zonas
*/
router.get('/publicados', inmuebleController.getInmueblesPublicados);

// Ruta para traer inmuebles de un usuario
router.get('/usuario/:idUsuario', inmuebleController.getInmueblesUsuario);

// Ruta para traer inmuebles dependiendo de un codigo
router.get('/codigo/:codigo', inmuebleController.getInmueblesCodigo);

// Ruta para actualizar un inmueble y detalles (incluye proyectos -- )
router.put('/:idInmueble', inmuebleController.actualizarInmuebleDetalles);


module.exports = router;