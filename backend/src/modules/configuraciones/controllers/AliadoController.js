//Manejar las solicitudes HTTP. Llama al servicio correspondiente. Este maneja las solicitudes GET
const errorHandler = require('../../../utils/ErrorHandler');
const AliadoService = require('../services/AliadoService'); //Importar el servicio  

const { traerToken } = require('../../../conf/firebaseAuth');

const { deleteMultimediaServidor } = require('../../../middleware/uploadConfig');

/* Metodos de lectura*/


// Trae todos los aliados dada una o mas condiciones
const getAliados = async (req, res) => {
    try {
        const results = await AliadoService.getAliados(req.query);
        res.status(200).json(results); //Se retornan los departamentos
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "aliados");
    }
}

/* Metodos de creacion*/
const registrarAliado = async (req, res) => {
    try {
        msg = await AliadoService.registrarAliado(req.body);
        res.status(201).json(msg); //Se retorna un mensaje
    } catch (error) {
        console.log(error);
        errorHandler.handleControllerError(res, error, "aliados");
    }
}


/* Metodos de actualizacion*/
const actualizarAliado = async (req, res) => {
    try {
        const { idAliado } = req.params;
        // Verifica si se subió uno o mas archivos
        if (req.files && req.files.length > 0) {
            // Asignar el nombre
            req.body.logoAliado = req.files[0].filename;
        }

        req.body.idAliado = idAliado;
        msg = await AliadoService.actualizarAliado(req.body);
        res.status(201).json(msg); //Se retorna un mensaje
    }
    catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "aliados");
    }
}

/* Metodos de borrado*/
const eliminarAliado = async (req, res) => {
    try {
        const { idAliado } = req.params;
        msg = await AliadoService.eliminarAliado(idAliado);
        res.status(201).json(msg); //Se retorna un mensaje si se encuentra un error
    }
    catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "aliados");
    }
}


module.exports = {
    getAliados,
    registrarAliado,
    actualizarAliado,
    eliminarAliado
}
