//Manejar las solicitudes HTTP. Llama al servicio correspondiente. Este maneja las solicitudes GET
const errorHandler = require('../../../utils/ErrorHandler');
const UsuarioService = require('../services/UsuariosService');
const CustomerService = require('../services/CustomerService');
const {deleteMultimediaServidor} = require('../../../middleware/uploadConfig');
const fs = require('fs');
const ErrorNegocio = require('../../../utils/errores/ErrorNegocio');

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
        const {idCustomer, idUsuario} = req.params;
        let dato = {};
        if(idCustomer){
            dato.idCustomer = idCustomer;
        }else if(idUsuario){
            dato.idUsuario = idUsuario; 
        }else{
            throw new ErrorNegocio("Parametro no colocado");
        }
        const customer = await CustomerService.getAllCustomers(dato);
        res.status(200).json(customer); //Se retornan los usuarios
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "usuarios");
    }
};

// Actualizar un customer
const actualizarCustomer = async (req, res) => {
    try {
        const msg = await CustomerService.actualizarCustomer(req.body, req.params);
        res.status(200).json(msg); //Se retornan el mensaje
    } catch (err) {
        errorHandler.handleControllerError(res, err, "usuarios");
    }
};

// Guardar la foto del logo
const actualizarLogo = async (req, res) => {
    let rutaFoto = null;
    let nombreFoto = null;
    let tipoArchivo = null;
    // Verifica si se subió un archivo
    if (req.file) {
        rutaFoto = req.file.path; // Ruta del archivo subido
        nombreFoto = req.file.filename;
        tipoArchivo = req.file.tipoArchivo; // Propiedad agregada en la configuracion de subida
    } else {
        return res.status(400).json({ error: { message: "No se subió ningún archivo." } });
    }
    try {
        const { idCustomer } = req.params;

        msg = await CustomerService.actualizarLogo(idCustomer, nombreFoto, tipoArchivo);
        return res.status(200).json({ message: msg });
    } catch (err) {
        // Elimina el archivo subido si hubo un error en la inserción
        if (rutaFoto) {
            await deleteMultimediaServidor("fotos",nombreFoto,"customers");
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