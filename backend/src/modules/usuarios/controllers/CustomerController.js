//Manejar las solicitudes HTTP. Llama al servicio correspondiente. Este maneja las solicitudes GET
const errorHandler = require('../../../utils/ErrorHandler');
const UsuarioService = require('../services/UsuariosService');
const CustomerService = require('../services/CustomerService');

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

module.exports = {
    getAllCustomers,
    getAllCustomersBasic
};