//Manejar las solicitudes HTTP. Llama al servicio correspondiente.
const errorHandler = require('../../../utils/ErrorHandler');
const ErrorNegocio = require('../../../utils/errores/ErrorNegocio');

const SuscripcionService = require('../services/SuscripcionService');
const CustomerService = require('../../usuarios/services/CustomerService')
const { traerToken } = require('../../../conf/firebaseAuth');

// Info de prueba de un pago
let infoPago={
    "transaction_id": "txn_123456",
    "status": "success",
    "amount": 5000,
    "currency": "USD",
    "created_at": "2024-11-22T14:32:00Z",
    "payment_method": "credit_card",
    "order_id": "order_78910",
    "id_customer": "12",
    "signature": "abc123456789xyz",
    "id_plan": "1"
}

// Manejar el pago
const handlePago = async (req, res) => {
    try {
        let info = infoPago;
        if(info.status == "success"){ // Si el pago fue recibido correctamente se crea la suscripcion
            let msg = await SuscripcionService.crearSuscripcion(info);
            res.status(201).json(msg); //Se retorna la respuesta
        }
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "suscripciones");
    }
};

// Traer todas las suscripciones de un customer y su plan
const getSuscripcionesCustomer = async (req, res)=>{
    try{
        const token = await traerToken(req);
        const {idCustomer} = req.params;
        if (token.tipoUsuario == "admin" || await CustomerService.coincideIdUsuario(token.idUsuario, idCustomer)) {
            let suscripciones = await SuscripcionService.getSuscripcionesCustomer(idCustomer);
            res.status(201).json(suscripciones); //Se retorna la respuesta
        }else {
            throw new ErrorNegocio("No tiene permisos o el id del usuario que inició sesion no coincide con el solicitado.")
        }
       
    }catch(err){
        errorHandler.handleControllerError(res, err, "suscripciones");
    }
}

module.exports = {
    handlePago,
    getSuscripcionesCustomer
}
  