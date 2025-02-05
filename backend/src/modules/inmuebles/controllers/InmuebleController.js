//Manejar las solicitudes HTTP. Llama al servicio correspondiente.

const inmuebleService = require('../services/InmuebleService'); //Importar el servicio 
const CustomerService = require('../../usuarios/services/CustomerService');
const filtroInmueble = require('../services/FiltrosInmuebleService');
const zonasInmueblesService = require('../services/ZonasInmueblesService');
const TipoInmueblePerfilService = require('../services/TipoInmueblePerfilService');
const ZonaService = require('../services/ZonaService');
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

        if (!customer) {
            throw new ErrorNegocio("Customer relacionado al ID proporcionado no existe");
        }
        // Validar que el estado del customer sea activo si es customer
        if (token.tipoUsuario == "customer" && customer[0].dataValues.estadoCustomer != "activo") {
            throw new ErrorNegocio("Su estado actual no le permite realizar esta accion");
        }
        // Establecer el ID del usuario que inició sesion y asignarlo al cuerpo para crearlo
        req.body.inmueble.idCustomer = customer[0].dataValues.idCustomer;
        msg = await inmuebleService.insertarInmueble(req.body);
        res.status(201).json(msg); //Se retorna un mensaje
    } catch (error) {
        errorHandler.handleControllerError(res, error, "inmuebles");
    }
};

// Agrgar una zona
const agregarZona = async (req, res) => {
    try {
        const token = await traerToken(req);
        const datos = req.body; //Datos del cuerpo de la solicitud (zonas)
        datos.idInmueble = req.params.idInmueble;

        // Traer dueño del inmueble
        const idCustomer = await filtroInmueble.traerCustomerInmueble(null, datos.idInmueble);
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
        res.status(201).json(msg); //Se retorna un mensaje
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "inmuebles");
    }
};


//Traer inmuebles de un usuario
const getInmueblesUsuario = async (req, res) => {
    try {
        const token = await traerToken(req);
        // Verificar si el id de quien inicio sesion es el mismo del que se intenta acceder
        let { idCustomer } = req.params;
        let coincide = await CustomerService.coincideIdUsuario(token.idUsuario, idCustomer);
        if (token.tipoUsuario == "admin" || coincide) {
            msg = await filtroInmueble.getInmueblesUsuario(req.params);
            res.status(201).json(msg);
        } else {
            throw new ErrorNegocio("No tiene permisos o el id del usuario que inició sesion no coincide con el solicitado.")
        }

    } catch (err) {
        console.log(err);
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
        const { idInmueble } = req.params;
        const isDueño = await inmuebleService.isUsuarioDueño(token.idUsuario, idInmueble);
        console.log(token.idUsuario);
        console.log(idInmueble);
        // Verificar que el que inició sesión sea el dueño  
        if (isDueño) {
            interesados = await inmuebleService.traerInteresados(req.params);
            res.status(201).json(interesados); //Se retornan los interesados
        } else {
            throw new ErrorNegocio("No puede acceder a esa información de inmueble.");
        }

    } catch (err) {
        errorHandler.handleControllerError(res, err, "inmuebles");
    }
};

// Traer informacion requerida para la creacion desde un solo endpoint
const getInfoCreacion = async(req, res) =>{
    try {
        const data = {};
        const token = await traerToken(req);

        /* Generar datos asociados al usuario */
        const customerList = await CustomerService.getAllCustomers({idUsuario: token.idUsuario});
        console.log(customerList);
        // Traer tipos de inmueble segun el perfil
        data.tiposInmueble = await TipoInmueblePerfilService.getInmueblesPerfil(null, customerList[0].perfil.idPerfil);

        // Traer las zonas
        data.zonas = await ZonaService.getAllZonas();
        console.log(data);
        res.status(201).json(data); //Se retorna un mensaje si se encuentra un error
    }catch(err){
        errorHandler.handleControllerError(res, err, "inmuebles");
    }
}

//Editar un inmueble con detalles
const actualizarInmuebleDetalles = async (req, res) => {
    try {
        const token = await traerToken(req);
        const { idInmueble } = req.params;

        // Traer dueño del inmueble
        const idCustomer = await filtroInmueble.traerCustomerInmueble(null, idInmueble);

        //Agregar el idCustomer al cuerpo para pasarlo al servicio
        req.body.idCustomer = idCustomer;
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
        let data = {};

        // Traer dueño del inmueble
        const idCustomer = await filtroInmueble.traerCustomerInmueble(null, idInmueble);

        data.idInmueble = idInmueble;
        data.customer = idCustomer;
        // Validar que sea el dueño
        if (token.tipoUsuario == "admin" || await CustomerService.coincideIdUsuario(token.idUsuario, idCustomer)) {
            msg = await inmuebleService.eliminarInmueble(data);
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
    getInfoCreacion,
    eliminarInmueble
}; 