//Manejar las solicitudes HTTP. Llama al servicio correspondiente.

const inmuebleService = require('../services/InmuebleService'); //Importar el servicio 
const CustomerService = require('../../usuarios/services/CustomerService');
const filtroInmueble = require('../services/FiltrosInmuebleService');
const zonasInmueblesService = require('../services/ZonasInmueblesService');
const errorHandler = require('../../../utils/ErrorHandler');

const { traerToken } = require('../../../conf/firebaseAuth');
const ErrorNegocio = require('../../../utils/errores/ErrorNegocio');
// Insertar un inmueble
const insertInmueble = async (req, res) => {
    try {
        
        const token = await traerToken(req);

        const datos = {};
        datos.idUsuario = token.idUsuario;

        // Traer al customer correspondiente
        const customer = await CustomerService.getAllCustomers(datos);

        if(!customer){
            throw new ErrorNegocio("Customer relacionado al ID proporcionado no existe");
        }

        // Establecer el ID del usuario que inició sesion y asignarlo al cuerpo para crearlo
        req.body.inmueble.idCustomer = customer[0].dataValues.idCustomer;
        msg = await inmuebleService.insertarInmueble(req.body);
        res.status(201).json(msg); //Se retorna un mensaje
    } catch (error) {
        errorHandler.handleControllerError(res, error, "inmuebles");
    }
};

// Insertar un inmueble
const agregarZona = async (req, res) => {
    try {
        const token = await traerToken(req);
        const datos = req.body; //Datos del cuerpo de la solicitud (zonas)
        datos.idInmueble = req.params.idInmueble;

        console.log(datos.idInmueble);
        // Traer dueño del inmueble
        const idCustomer = await filtroInmueble.traerCustomerInmueble(null, datos.idInmueble);
        console.log(idCustomer);
        console.log( await CustomerService.coincideIdUsuario(token.idUsuario, idCustomer));
        // Validar que sea el dueño
        if (token.tipoUsuario == "admin" || await CustomerService.coincideIdUsuario(token.idUsuario, idCustomer)) {
            let msg = await zonasInmueblesService.agregarZona(datos);
            res.status(201).json(msg); //Se retorna un mensaje
        } else {
            throw new ErrorNegocio("No tiene permisos o el id del usuario que inició sesion no coincide con el solicitado.")
        }

    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "inmuebles");
    }
};

//Traer inmuebles publicados
const getInmueblesPublicados = async (req, res) => {
    try {
        msg = await filtroInmueble.getPublicados(req.query);
        res.status(201).json(msg); //Se retorna un mensaje
    } catch (err) {
        errorHandler.handleControllerError(res, err, "inmuebles");
    }
};

//Traer todas los tipos de inmueble
const getAllTipos = async (req, res) => {
    try {
        msg = await inmuebleService.getAllTipos();
        res.status(201).json(msg); //Se retorna un mensaje
    } catch (err) {
        errorHandler.handleControllerError(res, err, "inmuebles");
    }
};

//Traer todas los tipos de inmueble
const getInmuebleByID = async (req, res) => {
    try {
        msg = await filtroInmueble.getInmuebleByID(req.params);
        console.log("===");
        res.status(201).json(msg); //Se retorna un mensaje
    } catch (err) {
        errorHandler.handleControllerError(res, err, "inmuebles");
    }
};


//Traer inmuebles publicados
const getInmueblesUsuario = async (req, res) => {
    try {
        msg = await filtroInmueble.getInmueblesUsuario(req.params);
        res.status(201).json(msg);
    } catch (err) {
        errorHandler.handleControllerError(res, err, "inmuebles");
    }
};

//Traer inmuebles con un codigo
const getInmueblesCodigo = async (req, res) => {
    try {
        msg = await filtroInmueble.getInmueblesCodigo(req.params);
        res.status(201).json(msg); //Se retorna un mensaje si se encuentra un error
    } catch (err) {
        errorHandler.handleControllerError(res, err, "inmuebles");
    }
};

// Traer los interesados de un inmueble
const getInteresadosInmueble = async (req, res) => {
    try {
        const token = await traerToken(req);
        const {idInmueble} = req.params;
        const isDueño = await inmuebleService.isUsuarioDueño(token.idUsuario, idInmueble);
        // Verificar que el que inició sesión sea el dueño  
        if(isDueño){
            interesados = await inmuebleService.traerInteresados(req.params);
            res.status(201).json(interesados); //Se retornan los interesados
        }else{
            throw new ErrorNegocio("No puede acceder a esa información de inmueble.");
        }
       
    } catch (err) {
        errorHandler.handleControllerError(res, err, "inmuebles");
    }
};


//Editar un inmueble con detalles
const actualizarInmuebleDetalles = async (req, res) => {
    try {
        const token = await traerToken(req);
        const { idInmueble } = req.params;

        // Traer dueño del inmueble
        const idCustomer =await filtroInmueble.traerCustomerInmueble(null, idInmueble);
        // Validar que sea el dueño
        if (token.tipoUsuario == "admin" || await CustomerService.coincideIdUsuario(token.idUsuario, idCustomer)) {
            let msg = await inmuebleService.actualizarInmuebleDetalles(req.body, req.params);
            res.status(201).json(msg); //Se retorna un mensaje si se encuentra un error
        } else {
            throw new ErrorNegocio("No tiene permisos o el id del usuario que inició sesion no coincide con el solicitado.")
        }

    } catch (err) {
        errorHandler.handleControllerError(res, err, "inmuebles");
    }
}

// eliminar inmueble
const eliminarInmueble = async (req, res) => {
    try {
        const token = await traerToken(req);
        const { idInmueble } = req.params;

        // Traer dueño del inmueble
        const idCustomer = await filtroInmueble.traerCustomerInmueble(null, idInmueble);

        // Validar que sea el dueño
        if (token.tipoUsuario == "admin" || await CustomerService.coincideIdUsuario(token.idUsuario, idCustomer)) {
            msg = await inmuebleService.eliminarInmueble(req.params);
            res.status(201).json(msg); //Se retorna un mensaje si se encuentra un error
        } else {
            throw new ErrorNegocio("No tiene permisos o el id del usuario que inició sesion no coincide con el solicitado.")
        }
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "inmuebles");
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