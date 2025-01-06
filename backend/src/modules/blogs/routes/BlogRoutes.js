//Rutas para acceder a las consultas
const express = require('express');
const router = express.Router();

const { protegerRuta } = require('../../../middleware/authMiddleware'); // middleware autenticacion

const BlogController = require("../controllers/BlogController");

/* Rutas consulta*/
// Traer todos los blogs
router.get('/', BlogController.getBlogs);

/* Rutas creacion*/

// Ruta para crear un blog
router.post('/', protegerRuta(['admin']), BlogController.registrarBlog);

/* Rutas actualizacion*/

// Ruta para actualizar un blog
router.put('/:idBlog', protegerRuta(['admin']), BlogController.actualizarBlog);

/* Rutas borrado*/
// Ruta para actualizar un blog
router.delete('/:idBlog', protegerRuta(['admin']), BlogController.eliminarBlog);

module.exports = router;