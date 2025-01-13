//Rutas para acceder a las consultas
const express = require('express');
const router = express.Router();

const { protegerRuta } = require('../../../middleware/authMiddleware'); // middleware autenticacion

const {upload} = require('../../../middleware/uploadConfig'); // midleware archivos

const BlogController = require("../controllers/BlogController");

/* Rutas consulta*/
// Traer todos los blogs
router.get('/', BlogController.getBlogs);

// Traer todos las categorias de blogs
router.get('/categorias', BlogController.getCategorias);
/* Rutas creacion*/

// Ruta para crear un blog
router.post('/', protegerRuta(['admin']), BlogController.registrarBlog);

// Ruta para subir una o mas multimedia a un blog
router.post('/:idBlog/multimedia', protegerRuta(['admin']), upload.array('multimedia',10), BlogController.subirMultimediaBlog);


/* Rutas actualizacion*/

// Ruta para actualizar un blog
router.put('/:idBlog', protegerRuta(['admin']), upload.array('multimedia',1), BlogController.actualizarBlog);

/* Rutas borrado*/
// Ruta para actualizar un blog
router.delete('/:idBlog', protegerRuta(['admin']), BlogController.eliminarBlog);


// Ruta para eliminar una foto de un blog. Apunta a la misma ruta de eliminar el video, cambia el tipo
router.delete('/:idBlog/multimedia/fotos/:idFoto', protegerRuta(['admin']), BlogController.eliminarMultimediaBlog);

// Ruta para eliminar un video
router.delete('/:idBlog/multimedia/videos/:idVideo', protegerRuta(['admin']), BlogController.eliminarMultimediaBlog);


module.exports = router;