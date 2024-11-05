//Rutas para acceder a las consultas
const express = require('express');
const router = express.Router();
const upload = require('../../../middleware/uploadConfig');

const ciudadController = require("../controllers/CiudadController");
const inmuebleController = require("../controllers/InmuebleController");
const detalleInmuebleController = require("../controllers/DetalleController");
const interesadoController = require("../controllers/InteresadoController");
const zonasController = require("../controllers/ZonasController");
const globalErrorHandler = require("../../../middleware/globalErrorHandler");




// Definir una ruta para obtener todos los departamentos con sus ciudades
router.get('/departamentos/ciudades', ciudadController.getDepartamentosConCiudades);

/* Ruta para traer inmuebles publicados con el filtro avanzado, incluye: 
    categoria, modalidad, ciudad, monto maximo, habitaciones, baños, parqueadero, amoblado y zonas
*/
router.get('/publicados', inmuebleController.getInmueblesPublicados);

// Ruta para traer inmuebles de un usuario
router.get('/usuario/:idUsuario', inmuebleController.getInmueblesUsuario);

// Ruta para traer todos los interesados de un inmueble
router.get('/:idInmueble/interesados', inmuebleController.getInteresadosInmueble);

// Ruta para traer todas las zonas
router.get('/zonas', zonasController.getAllZonas);


// Ruta para traer todos los tipos de inmueble
router.get('/tipos', inmuebleController.getAllTipos);

// Ruta para traer inmuebles dependiendo de un codigo
router.get('/codigo/:codigo', inmuebleController.getInmueblesCodigo);

// Ruta para traer inmuebles dependiendo de su ID en la BD
router.get('/:idInmueble', inmuebleController.getInmuebleByID);

// ruta para insertar un inmueble (ruta tipo post)
router.post('/', inmuebleController.insertInmueble);

// ruta para insertar una foto/video para un detalle inmueble
router.post('/detalles/:idDetalle/multimedia', upload.single('archivo'),detalleInmuebleController.insertMultimedia); //No enviar el archivo de primero

// Ruta para asociar una zona a un inmueble
router.post('/:idInmueble/zonas', inmuebleController.agregarZona);

// Ruta para insertar un interesado
router.post('/interesados', interesadoController.registrarInteresado);



// Ruta para actualizar un inmueble y detalles (incluye proyectos -- )
router.put('/:idInmueble', inmuebleController.actualizarInmuebleDetalles);

// Ruta para eliminar un inmueble del todo
router.delete('/:idInmueble', inmuebleController.eliminarInmueble);


// Ruta para eliminar un detalle solamente (aplica solo para proyectos)
router.delete('/detalles/:idDetalle',detalleInmuebleController.eliminarDetalle); //No enviar el archivo de primero


// Ruta para eliminar una foto de un detalle. Apunta a la misma ruta de eliminar el video, cambia el tipo
router.delete('/detalles/:idDetalle/multimedia/fotos/:idFoto',detalleInmuebleController.eliminarMultimediaDetalle); 

// Ruta para eliminar un video
router.delete('/detalles/:idDetalle/multimedia/videos/:idVideo',detalleInmuebleController.eliminarMultimediaDetalle); 


// Manejador de errores global
router.use(globalErrorHandler);

module.exports = router;