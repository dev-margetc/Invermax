//Manejar las solicitudes HTTP. Llama al servicio correspondiente.
const errorHandler = require('../../../utils/ErrorHandler');
const ErrorNegocio = require('../../../utils/errores/ErrorNegocio');

const SuscripcionService = require('../services/SuscripcionService');
const PlanService = require('../services/PlanService');
const UsuarioService = require('../../usuarios/services/UsuariosService');
const CustomerService = require('../../usuarios/services/CustomerService')
const { traerToken } = require('../../../conf/firebaseAuth');

// Manejar el pago
const handlePago = async (req, res) => {
    try {
        let { idUsuario, idPlan, idPrecioPlan } = req.body.metadata; // El id del plan y el usuario llegan en el body
        let { status, id, amount, payment_method } = req.body; // Informacion que llegaría de la pasarela de pago
        let infoSuscripcion = {};

        if (status == "success") { // Si el pago fue recibido correctamente se crea la suscripcion
            // Asignar info extra
            infoSuscripcion.montoPagado = amount;

            infoSuscripcion.medioPago = payment_method;

            infoSuscripcion.idTransaccion = id;

            // Traer informacion del plan
            let plan = await PlanService.getAllPlanes({ idPlan: idPlan });

            // Obtener perfil del plan
            let perfil = plan[0].dataValues.perfil;

            // Traer el customer, verificar si existe, si no, se crea
            let customer = await CustomerService.generarOCrearCustomer(idUsuario, perfil.idPerfil);

            infoSuscripcion.customer = customer; // Entregar el objeto completo para validar estado
            infoSuscripcion.idCustomer = customer.idCustomer;//Acceder al ID para crear la suscripcion

            // Crear la suscripcion para el customer
            infoSuscripcion.idPlan = idPlan;
            infoSuscripcion.idPrecioPlan = idPrecioPlan;
            let msg = await SuscripcionService.crearSuscripcionPagada(infoSuscripcion);
            res.status(201).json(msg); //Se retorna la respuesta
        }
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "suscripciones");
    }
};

// Traer todas las suscripciones de un customer y su plan
const getSuscripcionesCustomer = async (req, res) => {
    try {
        const token = await traerToken(req);
        const { idCustomer } = req.params;
        if (token.tipoUsuario == "admin" || await CustomerService.coincideIdUsuario(token.idUsuario, idCustomer)) {
            let suscripciones = await SuscripcionService.getSuscripcionesCustomer(idCustomer);
            res.status(201).json(suscripciones); //Se retorna la respuesta
        } else {
            throw new ErrorNegocio("No tiene permisos o el id del usuario que inició sesion no coincide con el solicitado.")
        }

    } catch (err) {
        errorHandler.handleControllerError(res, err, "suscripciones");
    }
}

// Generar una suscripcion a un plan gratuito
const generarSuscripcionGratuita = async (req, res) => {
    try {
        let { idUsuario, idPlan, idPrecioPlan } = req.body.metadata; // El id del plan y el usuario llegan en el body
        let infoSuscripcion = {};

        // Traer informacion del plan
        let plan = await PlanService.getAllPlanes({ idPlan: idPlan });

        // Obtener perfil del plan
        let perfil = plan[0].dataValues.perfil;

        // Traer el customer, verificar si existe, si no, se crea
        let customer = await CustomerService.generarOCrearCustomer(idUsuario, perfil.idPerfil);

        infoSuscripcion.customer = customer; //Acceder al customer para crear la suscripcion
        infoSuscripcion.idCustomer = customer.idCustomer; // Entregar el objeto completo para validar estado
           
        // Crear la suscripcion para el customer
        infoSuscripcion.idPlan = idPlan;
        infoSuscripcion.idPrecioPlan = idPrecioPlan;
        
        let msg = await SuscripcionService.crearSuscripcionGratuita(infoSuscripcion);
        res.status(201).json(msg); //Se retorna la respuesta
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "suscripciones");
    }

}

module.exports = {
    handlePago,
    getSuscripcionesCustomer,
    generarSuscripcionGratuita
}
