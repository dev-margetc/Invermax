//Rutas para acceder a las consultas
const express = require('express');
const router = express.Router();
const {upload} = require('../../../middleware/uploadConfig');

const globalErrorHandler = require("../../../middleware/globalErrorHandler");

const userController = require("../controllers/UsuariosController");
const customerController = require("../controllers/CustomerController");

/* Rutas Get */

//Traer todos los usuarios junto con sus customer. 

router.get('/', userController.getAllUsuarios);

/*  Traer todos los customers   
    -En los parametros puede incluirse el tipo especifico, si está vacio los traerá todos
    - Esta ruta trae toda la información de customers, debería estar protegida
*/
router.get('/customers', customerController.getAllCustomers);

/*  Traer todos los nombres de customers   
    -En los parametros puede incluirse :
      -el tipo especifico, el id de usuario o el id de customer
    si está vacio los traerá todos
*/
router.get('/customers/basic', customerController.getAllCustomersBasic);

// Traer información de un customer dado el id de un usuario Ruta para que se use como parametro el id del usuario
router.get('/:idUsuario/customer', customerController.getCustomerByID);
// Traer información de un customer dado su ID. Ruta para que se use como parametro el id
router.get('/customers/:idCustomer', customerController.getCustomerByID);

/* Rutas Post */

// Registrar un customer junto con su usuario
router.post('/customers', userController.crearCustomerUsuarios);

// ruta para insertar una foto para el logo
router.post('/customers/:idCustomer/logo', upload.single('archivo'),customerController.actualizarLogo); //No enviar el archivo de primero

/* Rutas Put */

// Actualizar un customer
router.put('/customer/:idCustomer', customerController.actualizarCustomer);
/* Rutas delete*/

// Borrar un usuario y customer dado el ID del usuario y del customer
router.delete('/:idUsuario/customer/:idCustomer', userController.borrarUsuarioCustomer)

// Manejador de errores global
router.use(globalErrorHandler);

module.exports = router;