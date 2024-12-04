//Manejar las solicitudes HTTP. Llama al servicio correspondiente. Este maneja las solicitudes GET
const errorHandler = require('../../../utils/ErrorHandler');
const UsuarioService = require('../services/UsuariosService');
const admin = require('firebase-admin');
const { traerToken } = require('../../../conf/firebaseAuth');
const jwt = require('jsonwebtoken');
const ErrorNegocio = require('../../../utils/errores/ErrorNegocio');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config(); // Para cargar el JWT_SECRET desde .env


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

const autenticarUsuario = async (req, res) => {
    const { idToken } = req.body; // Recibe el idToken de Firebase desde el frontend
    if (!idToken) {
        throw new ErrorNegocio("No se recibió ningun token", null, 400);
    }
    try {
        // Verifica el idToken con Firebase Admin
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;
        const correo = decodedToken.email;

        // Buscar el usuario por UID
        let user = await UsuarioService.getUserByUID(uid);

        if (!user) {
            // Si no se encuentra por UID se busca por correo
            user = await UsuarioService.getUserByEmail(correo);
            if (user) {
                // El correo estaría asociado a otro usuario
                throw new ErrorNegocio("El correo ya se encuentra asociado a otra cuenta. Contacte soporte.", null, 400);
                
            } else {
                // Si no existe el usuario nuevo ni con correo o UID  en la BD del sistema crearlo            
               user = await UsuarioService.insertBasicUser(uid, correo);
            }

        }
        // Crear un JWT personalizado para la sesión del usuario
        const jwtPayload = { uid, email: correo, tipoUsuario: user.tipoUsuario, idUsuario: user.idUsuario, jti: uuidv4() };
        const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '1h', }); // Expiración e identificador

        // Responde con el JWT generado
        res.json({ token: jwtToken });
    } catch (error) {
        console.error(error);
        errorHandler.handleControllerError(res, error, "usuarios");
    }
}

// Cerrar sesion
const cerrarSesion = async (req, res) => {
    try {
        const token = await traerToken(req);


        const jti = token.jti; // Obtener el id del token

        if (!jti) {
            throw new ErrorNegocio('El token no contiene un identificador único', 'INVALID_TOKEN', 400);
        }

        // El token expirará naturalmente cuando pase el tiempo establecido en el JWT
        // No es necesario hacer nada más para invalidar el token

        res.status(200).json({ message: 'Sesión cerrada correctamente' });
    } catch (error) {
        console.error(error);
        errorHandler.handleControllerError(res, error, "usuarios");
    }
}
/* Metodos para guardar datos */

// Metodo para registrar customer junto con usuario
const crearCustomerUsuarios = async (req, res) => {
    try {
        const { usuario, customer } = req.body;
        const msg = await UsuarioService.insertUsuarioCustomer(usuario, customer);
        res.status(200).json(msg); //Se retorna un mensaje
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "usuarios");
    }
}

/* Metodos para borrar*/
// Borra el usuario y su customer asociado (tambien borra los inmuebles del customer)
const borrarUsuarioCustomer = async (req, res) => {
    try {
        const { idUsuario, idCustomer } = req.params;
        console.log(req.params);
        const msg = await UsuarioService.deleteUsuarioCustomer(idUsuario, idCustomer);
        res.status(200).json(msg); //Se retorna un mensaje
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "usuarios");
    }
}


module.exports = {
    autenticarUsuario,
    cerrarSesion,
    getAllUsuarios,
    crearCustomerUsuarios,
    borrarUsuarioCustomer
};