//Rutas para acceder a las consultas
const express = require('express');
const router = express.Router();
const { upload } = require('../../../middleware/uploadConfig');

const { protegerRuta } = require('../../../middleware/authMiddleware'); // middleware autenticacion

const ciudadController = require("../controllers/CiudadController");
const inmuebleController = require("../controllers/InmuebleController");
const detalleInmuebleController = require("../controllers/DetalleController");
const interesadoController = require("../controllers/InteresadoController");
const zonasController = require("../controllers/ZonasController");


// Definir una ruta para obtener todos las ciudades dado el ID
router.get('/ciudades/id/:idCiudad', ciudadController.getCiudadByID);

// Definir una ruta para obtener todos las ciudades dado el nombre
router.get('/ciudades/:nombreCiudad', ciudadController.getCiudadesNombre);

// Definir una ruta para obtener todos los departamentos con sus ciudades dado el nombre
router.get('/departamentos/ciudades/:nombreCiudad', ciudadController.getDepartamentosCiudadNombre);

// Definir una ruta para obtener todos los departamentos con sus ciudades
router.get('/departamentos/ciudades', ciudadController.getDepartamentosConCiudades);

// Definir una ruta para obtener todos los departamentos con sus ciudades dado el id del departamento
router.get('/departamentos/:idDepartamento/ciudades', ciudadController.getCiudadesIDDepartamento);

/* Ruta para traer inmuebles publicados con el filtro avanzado, incluye: 
    categoria, modalidad, ciudad, monto maximo, habitaciones, baños, parqueadero, amoblado y zonas
*/
router.get('/publicados', inmuebleController.getInmueblesPublicados);

// Ruta para traer inmuebles de un customer
router.get('/customer/:idCustomer', protegerRuta(['admin', 'customer']), inmuebleController.getInmueblesUsuario);

// Ruta para traer todos los interesados de un inmueble
router.get('/:idInmueble/interesados', protegerRuta(['admin', 'customer']), inmuebleController.getInteresadosInmueble);

// Ruta para traer todas las zonas
router.get('/zonas', zonasController.getAllZonas);

// Ruta para traer todas las zonas de interés
router.get('/zonas/comunes', zonasController.getAllZonasComunes);

// Ruta para traer todas las zonas
router.get('/zonas/interes', zonasController.getAllZonasInteres);

// Ruta para traer todos los tipos de inmueble
router.get('/tipos', inmuebleController.getAllTipos);

// Ruta para traer inmuebles dependiendo de un codigo
router.get('/codigo/:codigo', inmuebleController.getInmueblesCodigo);

// Ruta para traer inmuebles dependiendo de su ID en la BD
router.get('/:idInmueble', inmuebleController.getInmuebleByID);

// ruta para insertar un inmueble (ruta tipo post)
router.post('/', protegerRuta(['admin', 'customer']), inmuebleController.insertInmueble);

// ruta para insertar una foto/video para un detalle inmueble
router.post('/detalles/:idDetalle/multimedia',

    upload.array('multimedia', 10), detalleInmuebleController.insertMultimedia); //No enviar el archivo de primero

// Ruta para asociar una zona a un inmueble
router.post('/:idInmueble/zonas', protegerRuta(['admin', 'customer']), inmuebleController.agregarZona);

// Ruta para insertar un interesado
router.post('/interesados', interesadoController.registrarInteresado);



// Ruta para actualizar un inmueble y detalles (incluye proyectos -- )
router.put('/:idInmueble', protegerRuta(['admin', 'customer']), inmuebleController.actualizarInmuebleDetalles);

// Ruta para eliminar un inmueble del todo
router.delete('/:idInmueble', protegerRuta(['admin', 'customer']), inmuebleController.eliminarInmueble);


// Ruta para eliminar un detalle solamente (aplica solo para proyectos)
router.delete('/detalles/:idDetalle', protegerRuta(['admin', 'customer']), detalleInmuebleController.eliminarDetalle); //No enviar el archivo de primero


// Ruta para eliminar una foto de un detalle. Apunta a la misma ruta de eliminar el video, cambia el tipo
router.delete('/detalles/:idDetalle/multimedia/fotos/:idFoto', protegerRuta(['admin', 'customer']), detalleInmuebleController.eliminarMultimediaDetalle);

// Ruta para eliminar un video
router.delete('/detalles/:idDetalle/multimedia/videos/:idVideo', protegerRuta(['admin', 'customer']), detalleInmuebleController.eliminarMultimediaDetalle);



module.exports = router;