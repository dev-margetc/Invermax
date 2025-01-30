//Manejar las solicitudes HTTP. Llama al servicio correspondiente.
const errorHandler = require('../../../utils/ErrorHandler');
const ErrorNegocio = require('../../../utils/errores/ErrorNegocio');
const { traerToken } = require('../../../conf/firebaseAuth');

const AscensoService = require("../services/AscensoService");
const filtroService = require("../../inmuebles/services/FiltrosInmuebleService");

const CustomerService = require("../../usuarios/services/CustomerService");

// Insertar un inmueble en la tabla de ascensos o modificar su estado de activo a inactivo o visceversa
const insertarInmuebleAscenso = async (req, res) => {
    try {
        const token = await traerToken(req);
        const { idInmueble } = req.params;

        // Traer dueño del inmueble
        const idCustomer = await filtroService.traerCustomerInmueble(null, idInmueble);
        // Validar que sea el dueño
        if (token.tipoUsuario == "admin" || await CustomerService.coincideIdUsuario(token.idUsuario, idCustomer)) {
            let msg = await AscensoService.manejarRegistroAscenso(idInmueble);
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

// Traer todos los inmuebles en ascenso
const getInmueblesAscenso = async (req, res) => {
    try{
        let ascendidos = await AscensoService.getAscensoCustomerEstado();
        res.status(201).json(ascendidos); //Se retorna la respuesta
    }catch(err){
        console.log(err);
        errorHandler.handleControllerError(res, err, "suscripciones");
    }

}

// Traer todos los destacados activos
const getAscendidosActivos = async (req, res) => {
    try{
        let ascendidos = await AscensoService.getAscensoCustomerEstado(1,null,true);
        res.status(201).json(ascendidos); //Se retorna la respuesta
    }catch(err){
        console.log(err);
        errorHandler.handleControllerError(res, err, "suscripciones");
    }

}

// Traer todos los inmuebles en ascenso de un customer
const getAscensoCustomer = async (req, res) => {
    try{
        const {idCustomer} = req.params;
        // Traer todos los ascendidos del customer, sin importar estado
        let ascendidos = await AscensoService.getAscensoCustomerEstado(null,idCustomer);
        res.status(201).json(ascendidos); //Se retorna la respuesta
    }catch(err){
        console.log(err);
        errorHandler.handleControllerError(res, err, "suscripciones");
    }

}


module.exports = {
    insertarInmuebleAscenso ,
    getInmueblesAscenso,
    getAscendidosActivos,
    getAscensoCustomer
}
