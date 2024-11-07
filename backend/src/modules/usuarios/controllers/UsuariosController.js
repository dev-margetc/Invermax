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

/* Metodos para guardar datos */

// Metodo para registrar customer junto con usuario
const crearCustomerUsuarios = async(req, res)=>{
    try {
        const {usuario, customer} = req.body;
        console.log(customer);
        const msg = await UsuarioService.insertUsuarioCustomer(usuario,customer);
        res.status(200).json(msg); //Se retorna un mensaje
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "usuarios");
    }
}

/* Metodos para borrar*/
// Borra el usuario y su customer asociado (tambien borra los inmuebles del customer)
const borrarUsuarioCustomer= async (req,res)=>{
    try{
        const {idUsuario, idCustomer} = req.params;
        console.log(req.params);
        const msg = await UsuarioService.deleteUsuarioCustomer(idUsuario,idCustomer);
        res.status(200).json(msg); //Se retorna un mensaje
    }catch(err){
        console.log(err);
        errorHandler.handleControllerError(res,err,"usuarios");
    }
}


module.exports = {
    getAllUsuarios,
    crearCustomerUsuarios,
    borrarUsuarioCustomer
};