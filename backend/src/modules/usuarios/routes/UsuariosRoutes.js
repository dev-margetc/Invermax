//Rutas para acceder a las consultas
const express = require('express');
const router = express.Router();
const upload = require('../../../middleware/uploadConfig');

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
    -En los parametros puede incluirse el tipo especifico, si está vacio los traerá todos
*/
router.get('/customers/basic', customerController.getAllCustomersBasic);

// Traer información de un customer dado el id de un usuario

// Traer información de un customer dado su ID

/* Rutas Post */

// Registrar un customer junto con su usuario


// Registrar un usuario unicamente (para tipo admin o user)


/* Rutas Put */

// Actualizar un customer


/* Rutas delete*/

// Borrar un customer y usuario dado el ID del usuario 


// Manejador de errores global
router.use(globalErrorHandler);

module.exports = router;