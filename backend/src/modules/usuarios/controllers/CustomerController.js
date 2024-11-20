//Manejar las solicitudes HTTP. Llama al servicio correspondiente. Este maneja las solicitudes GET
const errorHandler = require('../../../utils/ErrorHandler');
const CustomerService = require('../services/CustomerService');
const { deleteMultimediaServidor } = require('../../../middleware/uploadConfig');
const ErrorNegocio = require('../../../utils/errores/ErrorNegocio');
const { traerToken } = require('../../../conf/firebaseAuth');

/* Metodos para traer datos */
// Obtener todos los customers
const getAllCustomers = async (req, res) => {
    try {
        const results = await CustomerService.getAllCustomers(req.query);
        res.status(200).json(results); //Se retornan los usuarios
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "usuarios");
    }
};

// Obtener todos los nombres, logos y tipo de customers
const getAllCustomersBasic = async (req, res) => {
    try {
        const customers = await CustomerService.getAllCustomersBasic(req.query);
        res.status(200).json(customers); //Se retornan los usuarios
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "usuarios");
    }
};

// Traer un customer dado su idUsuario o idCustomer
const getCustomerByID = async (req, res) => {
    try {
        const token = await traerToken(req);
        const { idCustomer, idUsuario } = req.params;
        let dato = {};
        if (idCustomer) {
            dato.idCustomer = idCustomer;
        } else if (idUsuario) {
            dato.idUsuario = idUsuario;
        } else {
            throw new ErrorNegocio("Parametro no colocado");
        }

        // Traer el customer
        const customer = await CustomerService.getAllCustomers(dato);

        // Si no se encuentra el customer
        if (!customer[0]) {
            throw new ErrorNegocio("Customer no encontrado con los datos proporcionados");
        }
        // Si el usuario es admin se permite el ver los datos 
        if (token.tipoUsuario == 'admin' || token.idUsuario == customer[0].dataValues.idUsuario) {
            res.status(200).json(customer); //Se retornan los usuarios
        } else {
            throw new ErrorNegocio("No tiene permisos o el id del usuario que inició sesion no coincide con el solicitado.")
        }

    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "usuarios");
    }
};

// Actualizar un customer
const actualizarCustomer = async (req, res) => {
    try {
        const token = await traerToken(req);
        const { idCustomer } = req.params;
        if (token.tipoUsuario == "admin" || await CustomerService.coincideIdUsuario(token.idUsuario, idCustomer)) {
            // Enviar tambien el rol del usuario, asi si es admin sse permite modificar el estado
            req.body.tipoUsuario = token.tipoUsuario;
            const msg = await CustomerService.actualizarCustomer(req.body, req.params);
            res.status(200).json(msg); //Se retornan el mensaje
        } else {
            throw new ErrorNegocio("No tiene permisos o el id del usuario que inició sesion no coincide con el solicitado.");
        }

    } catch (err) {
        errorHandler.handleControllerError(res, err, "usuarios");
    }
};

// Guardar la foto del logo
const actualizarLogo = async (req, res) => {
    const token = await traerToken(req);
    let rutaFoto = null;
    let nombreFoto = null;
    let tipoArchivo = null;
    // Verifica si se subió un archivo
    try {
        if (req.file) {
            rutaFoto = req.file.path; // Ruta del archivo subido
            nombreFoto = req.file.filename;
            tipoArchivo = req.file.tipoArchivo; // Propiedad agregada en la configuracion de subida
        } else {
            throw new ErrorNegocio("No se subió ningún archivo.", "FILE_ERROR", 400);
        }

        const { idCustomer } = req.params;

        // Verificar que el customer que se intenta actualizar sea el que inicio sesion
        if (token.tipoUsuario == "admin" || CustomerService.coincideIdUsuario(token.idUsuario, idCustomer)) {
            msg = await CustomerService.actualizarLogo(idCustomer, nombreFoto, tipoArchivo);
            return res.status(200).json({ message: msg });
        } else {
            throw new ErrorNegocio("No tiene permisos o el id del usuario que inició sesion no coincide con el solicitado.");
        }

    } catch (err) {
        // Elimina el archivo subido si hubo un error en la inserción
        if (rutaFoto) {
            await deleteMultimediaServidor("fotos", nombreFoto, "customers");
        }

        //Enviar el mensaje de error
        errorHandler.handleControllerError(res, err, "usuarios");
    }
}
module.exports = {
    getAllCustomers,
    getAllCustomersBasic,
    getCustomerByID,
    actualizarCustomer,
    actualizarLogo
}