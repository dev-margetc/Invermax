//Manejar las solicitudes HTTP. Llama al servicio correspondiente.
const errorHandler = require('../../../utils/ErrorHandler');
const ErrorNegocio = require('../../../utils/errores/ErrorNegocio');
const { traerToken } = require('../../../conf/firebaseAuth');

const DestacadoService = require("../services/DestacadoService");
const filtroService = require("../../inmuebles/services/FiltrosInmuebleService");

const CustomerService = require("../../usuarios/services/CustomerService");

// Traer todos los planes con caracteristicas
const insertarDestacado = async (req, res) => {
    try {
        const token = await traerToken(req);
        const { idInmueble } = req.params;

        // Traer dueño del inmueble
        const idCustomer = await filtroService.traerCustomerInmueble(null, idInmueble);

        // Validar que sea el dueño
        if (token.tipoUsuario == "admin" || await CustomerService.coincideIdUsuario(token.idUsuario, idCustomer)) {
            let msg = await DestacadoService.manejarRegistroDestacado(idInmueble);
            res.status(201).json(msg); //Se retorna la respuesta
        } else {
            throw new ErrorNegocio("No tiene permisos o el id del usuario que inició sesion no coincide con el del dueño del inmueble.")
        }
        
    } catch (err) {
        
        console.log(err);
        errorHandler.handleControllerError(res, err, "suscripciones");
    }
};


/* Metodos de consulta*/

// Traer todos los destacados
const getDestacados = async (req, res) => {
    try{
        let destacados = await DestacadoService.getDestacadoCustomerEstado();
        res.status(201).json(destacados); //Se retorna la respuesta
    }catch(err){
        console.log(err);
        errorHandler.handleControllerError(res, err, "suscripciones");
    }

}

// Traer todos los destacados activos
const getDestacadosActivos = async (req, res) => {
    try{
        let destacados = await DestacadoService.getDestacadoCustomerEstado(1,null,true);
        res.status(201).json(destacados); //Se retorna la respuesta
    }catch(err){
        console.log(err);
        errorHandler.handleControllerError(res, err, "suscripciones");
    }

}

// Traer todos los destacados de un customer
const getDestacadosCustomer = async (req, res) => {
    try{
        const {idCustomer} = req.params;
        // Traer todos los destacados del customer, sin importar estado
        let destacados = await DestacadoService.getDestacadoCustomerEstado(null,idCustomer);
        res.status(201).json(destacados); //Se retorna la respuesta
    }catch(err){
        console.log(err);
        errorHandler.handleControllerError(res, err, "suscripciones");
    }

}


module.exports = {
    insertarDestacado,
    getDestacados,
    getDestacadosActivos,
    getDestacadosCustomer
}
