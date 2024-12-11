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
            infoSuscripcion.montoPago = amount;

            infoSuscripcion.medioPago = payment_method;

            infoSuscripcion.idTransaccion = id;
            
            // Traer informacion del plan
            let plan = await PlanService.getAllPlanes({ idPlan: idPlan });

            // Obtener perfil del plan
            let perfil = plan[0].dataValues.perfil;
            // Verificar que el customer asociado exista
            let customer = await CustomerService.getAllCustomers({ idUsuario: idUsuario });

            // Si no existe crearlo
            if (!customer || customer.length == 0) {

                // Buscar el correo del usuario respectivo
                let usuario = await UsuarioService.getAllUsuarios({ idUsuario: idUsuario });

                if (!usuario || usuario.length == 0) {
                    throw new ErrorNegocio("Error, no existe este usuario");
                }
                // Crear el customer
                customer = await CustomerService.crearCustomerBasico(idUsuario, perfil.dataValues.idPerfil, usuario[0].dataValues.emailUsuario);
                infoSuscripcion.idCustomer = customer.dataValues.idCustomer; //Acceder al ID para crear la suscripcion
            }else{
                // Si exite el customer se accede a su ID
                infoSuscripcion.idCustomer = customer[0].dataValues.idCustomer; //Acceder al ID para crear la suscripcion
            }

            // Crear la suscripcion para el customer
            infoSuscripcion.idPlan = idPlan;
            infoSuscripcion.idPrecioPlan = idPrecioPlan;
            let msg = await SuscripcionService.crearSuscripcion(infoSuscripcion);
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

module.exports = {
    handlePago,
    getSuscripcionesCustomer
}
