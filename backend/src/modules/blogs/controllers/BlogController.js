//Manejar las solicitudes HTTP. Llama al servicio correspondiente. Este maneja las solicitudes GET
const errorHandler = require('../../../utils/ErrorHandler');
const BlogService = require('../services/BlogService'); //Importar el servicio  

const { traerToken } = require('../../../conf/firebaseAuth');

/* Metodos de lectura*/


// Trae todos los blogs dada una o mas id de categoria, si está vacio trae todos
const getBlogs = async (req, res) => {
    try {
        const results = await BlogService.getBlogs(req.query);
        res.status(200).json(results); //Se retornan los departamentos
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "blogs");
    }
}

/* Metodos de creacion*/
const registrarBlog = async (req, res) => {
    try {
        const token = await traerToken(req);
        const datos = {};
        datos.idUsuario = token.idUsuario;

        msg = await BlogService.registrarBlog(token.idUsuario, req.body);
        res.status(201).json(msg); //Se retorna un mensaje
    } catch (error) {
        console.log(error);
        errorHandler.handleControllerError(res, error, "blogs");
    }
}



/* Metodos de actualizacion*/
const actualizarBlog = async (req, res) => {
    try {
        const {idBlog} = req.params;
        req.body.idBlog = idBlog;
        msg = await BlogService.actualizarBlog(req.body);
        res.status(201).json(msg); //Se retorna un mensaje
    }
    catch (err) {
        errorHandler.handleControllerError(res, err, "blogs");
        throw err;
    }
}

/* Metodos de borrado*/
const eliminarBlog = async (req, res) => {
    try {
        const {idBlog} = req.params;
        msg = await BlogService.eliminarBlog(idBlog);
        res.status(201).json(msg); //Se retorna un mensaje si se encuentra un error
    }
    catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "blogs");
    }
}

module.exports = {
    getBlogs,
    registrarBlog,
    actualizarBlog,
    eliminarBlog
}
