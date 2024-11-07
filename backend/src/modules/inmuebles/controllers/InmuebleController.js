//Manejar las solicitudes HTTP. Llama al servicio correspondiente.

const inmuebleService = require('../services/InmuebleService'); //Importar el servicio 
const filtroInmueble = require('../services/FiltrosInmuebleService');
const zonasInmueblesService = require('../services/ZonasInmueblesService');
const errorHandler = require('../../../utils/ErrorHandler');
// Insertar un inmueble
const insertInmueble = async (req, res) => {
    try {
        msg = await inmuebleService.insertarInmueble(req.body);
        res.status(201).json(msg); //Se retorna un mensaje
    } catch (error) {
       errorHandler.handleControllerError(res,error,"inmuebles");
    }
};

// Insertar un inmueble
const agregarZona = async (req, res) => {
    try {
        const datos = req.body; //Datos del cuerpo de la solicitud (zonas)
        datos.idInmueble = req.params.idInmueble;
        msg = await zonasInmueblesService.agregarZona(datos);
    } catch (err) {
        errorHandler.handleControllerError(res,err,"inmuebles");
    }
};

//Traer inmuebles publicados
const getInmueblesPublicados = async (req, res) => {
    try {
        msg = await filtroInmueble.getPublicados(req.query);
        res.status(201).json(msg); //Se retorna un mensaje
    } catch (err) {
        errorHandler.handleControllerError(res,err,"inmuebles");
    }
};

//Traer todas los tipos de inmueble
const getAllTipos = async (req, res) => {
    try {
        msg = await inmuebleService.getAllTipos();
        res.status(201).json(msg); //Se retorna un mensaje
    } catch (err) {
        errorHandler.handleControllerError(res,err,"inmuebles");
    }
};

//Traer todas los tipos de inmueble
const getInmuebleByID = async (req, res) => {
    try {
        msg = await filtroInmueble.getInmuebleByID(req.params);
        console.log("===");
        res.status(201).json(msg); //Se retorna un mensaje
    } catch (err) {
        errorHandler.handleControllerError(res,err,"inmuebles");
    }
};


//Traer inmuebles publicados
const getInmueblesUsuario = async (req, res) => {
    try {
        msg = await filtroInmueble.getInmueblesUsuario(req.params);
        res.status(201).json(msg); 
    } catch (err) {
        errorHandler.handleControllerError(res,err,"inmuebles");
    }
};

//Traer inmuebles con un codigo
const getInmueblesCodigo = async (req, res) => {
    try {
        msg = await filtroInmueble.getInmueblesCodigo(req.params);
        res.status(201).json(msg); //Se retorna un mensaje si se encuentra un error
    } catch (err) {
        errorHandler.handleControllerError(res,err,"inmuebles");
    }
};

// Traer los interesados de un inmueble
const getInteresadosInmueble = async (req, res) => {

    try {
        interesados = await inmuebleService.traerInteresados(req.params);
        res.status(201).json(interesados); //Se retorna un mensaje si se encuentra un error
    } catch (err) {
        errorHandler.handleControllerError(res,err,"inmuebles");
    }
};


//Editar un inmueble con detalles
const actualizarInmuebleDetalles = async (req, res) => {
    try {
        msg = await inmuebleService.actualizarInmuebleDetalles(req.body, req.params);
        res.status(201).json(msg); //Se retorna un mensaje si se encuentra un error
    } catch (err) {
        errorHandler.handleControllerError(res,err,"inmuebles");
    }
}

// eliminar inmueble
const eliminarInmueble = async (req, res) => {
    try {
        msg = await inmuebleService.eliminarInmueble(req.params);
        res.status(201).json(msg); //Se retorna un mensaje si se encuentra un error
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res,err,"inmuebles");
    }
}
module.exports = {
    insertInmueble,
    agregarZona,
    getAllTipos,
    getInmuebleByID,
    getInmueblesPublicados,
    getInmueblesUsuario,
    getInmueblesCodigo,
    getInteresadosInmueble,
    actualizarInmuebleDetalles,
    eliminarInmueble
}; 