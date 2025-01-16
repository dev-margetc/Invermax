//Manejar las solicitudes HTTP. Llama al servicio correspondiente.
const errorHandler = require('../../../utils/ErrorHandler');
const ErrorNegocio = require('../../../utils/errores/ErrorNegocio');

const SuscripcionService = require('../services/SuscripcionService');
const PlanService = require('../services/PlanService');
const CustomerService = require('../../usuarios/services/CustomerService');
const UsuarioService = require('../../usuarios/services/UsuariosService');
const PayUWebHookService = require('../services/PayUWebhookService');
const { traerToken } = require('../../../conf/firebaseAuth');
const admin = require('firebase-admin');

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
        let plan = await PlanService.getAllPlanes({ idPlan: idPlan }, { idPrecioPlan: idPrecioPlan });

        // Verificar que el plan y el precio estén activos
        await PlanService.isEstadoActivoPlanPrecio(idPlan, idPrecioPlan);

        // Obtener perfil del plan
        if (!plan.length > 0) {
            throw new ErrorNegocio("Plan no encontrado.")
        }

        let perfil = plan[0].dataValues.perfil;
        // Verificar que el precio sea gratuito
        let precio = plan[0].precios[0].precio;
        if (precio != 0) {
            throw new ErrorNegocio("Este plan no es gratuito.");
        } else {
            // Traer el customer, verificar si existe, si no, se crea
            let customer = await CustomerService.generarOCrearCustomer(idUsuario, perfil.idPerfil);

            infoSuscripcion.customer = customer; //Acceder al customer para crear la suscripcion
            infoSuscripcion.idCustomer = customer.idCustomer; // Entregar el objeto completo para validar estado

            // Si el customer existe verificar que el plan sea del mismo tipo
            if (plan[0].perfil.idPerfil != customer.perfil.idPerfil) {
                throw new ErrorNegocio("El perfil actual del customer no le permite generar una suscripción a este plan");
            }
            // Crear la suscripcion para el customer
            infoSuscripcion.idPlan = idPlan;
            infoSuscripcion.idPrecioPlan = idPrecioPlan;
            let msg = await SuscripcionService.crearSuscripcionGratuita(infoSuscripcion);
            res.status(201).json(msg); //Se retorna la respuesta
        }
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "suscripciones");
    }

}


// Generar datos para enviar al webhook de payU
const generarDatosWebhook = async (req, res) => {
    try {

        const token = await traerToken(req);
        let { idUsuario, idPlan, idPrecioPlan } = req.body.metadata; // El id del plan y el usuario llegan en el body

        // Verificar el plan que sea compatible con el usuario, se recupera el plan completo con el precioPlan
        const plan = await PlanService.verificarPlanUsuario(idPlan, idPrecioPlan, idUsuario);

        /* Generar datos para el webhook */
        // Traer usuario
        // Verifica el idToken con Firebase Admin
        const uid = token.uid;
        // Buscar el usuario por UID de la BD
        const user = await UsuarioService.getUserByUID(uid);
        // Buscar el usuario en la BD de firebase
        const firebaseUser = await admin.auth().getUser(uid);
        const paymentData = await PayUWebHookService.generarPaymentData(user, plan.precios[0], plan, firebaseUser);

        // Retornar la información de pago y la url a la que se debe dirigir
        res.status(201).json({
            url: process.env.PAYU_PAYMENT_URL,
            params: paymentData,
        }); //Se retorna la respuesta
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "suscripciones");
    }

}

module.exports = {
    handlePago,
    getSuscripcionesCustomer,
    generarSuscripcionGratuita,
    generarDatosWebhook
}
