//Manejar las solicitudes HTTP. Llama al servicio correspondiente. Este maneja las solicitudes GET
const errorHandler = require('../../../utils/ErrorHandler');
const ServicioService = require('../services/ServicioService'); //Importar el servicio  

const { traerToken } = require('../../../conf/firebaseAuth');

/* Metodos de lectura*/


// Trae todos los servicios dada una o mas id de categoria, si está vacio trae todos
const getServicios = async (req, res) => {
    try {
        const results = await ServicioService.getServicios(req.query);
        res.status(200).json(results); //Se retornan los departamentos
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "servicios");
    }
}

/* Metodos de creacion*/
const registrarServicio = async (req, res) => {
    try {
        msg = await ServicioService.registrarServicio(req.body);
        res.status(201).json(msg); //Se retorna un mensaje
    } catch (error) {
        console.log(error);
        errorHandler.handleControllerError(res, error, "servicios");
    }
}



/* Metodos de actualizacion*/
const actualizarServicio = async (req, res) => {
    try {
        const { idServicio } = req.params;
         // Verifica si se subió uno o mas archivos
         if (req.files && req.files.length > 0) {
            // Asignar el nombre
            req.body.fotoServicio = req.files[0].filename;
         } 
        req.body.idServicio = idServicio;
        msg = await ServicioService.actualizarServicio(req.body);
        res.status(201).json(msg); //Se retorna un mensaje
    }
    catch (err) {
        errorHandler.handleControllerError(res, err, "servicios");
    }
}

/* Metodos de borrado*/
const eliminarServicio = async (req, res) => {
    try {
        const { idServicio } = req.params;
        msg = await ServicioService.eliminarServicio(idServicio);
        res.status(201).json(msg); //Se retorna un mensaje si se encuentra un error
    }
    catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "servicios");
    }
}

module.exports = {
    getServicios,
    registrarServicio,
    actualizarServicio,
    eliminarServicio
}
