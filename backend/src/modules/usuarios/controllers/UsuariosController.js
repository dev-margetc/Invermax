//Manejar las solicitudes HTTP. Llama al servicio correspondiente. Este maneja las solicitudes GET
const errorHandler = require('../../../utils/ErrorHandler');
const UsuarioService = require('../services/UsuariosService');

// Obtener todos los usuarios y customers
const getAllUsuarios = async (req, res) => {
    try {
        const results = await UsuarioService.getAllUsuarios();
        console.log(results);
        res.status(200).json(results); //Se retornan los usuarios
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "usuarios");
    }
};


module.exports = {
    getAllUsuarios
};