//Manejar las solicitudes HTTP. Llama al servicio correspondiente. Este maneja las solicitudes GET
const errorHandler = require('../../../utils/ErrorHandler');
const UsuarioService = require('../services/UsuariosService');
const express = require('express');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const ErrorNegocio = require('../../../utils/errores/ErrorNegocio');
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
    try {
        // Verifica el idToken con Firebase Admin
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;
        const correo = decodedToken.email;

        // Buscar el usuario por UID
        let user = await UsuarioService.getUserByUID(uid);

        if(!user){
            // Si no se encuentra por UID se busca por correo
            user = await UsuarioService.getUserByEmail(correo);
            if(user){
                // El correo estaría asociado a otro usuario
                return res.status(400).json({
                    message: "El correo ya está asociado a otra cuenta. Contacta soporte.",
                });
            } else {
                // Crear un usuario nuevo si no existe ni el correo ni el UID
                console.log("creando");
            }

        }
        console.log(user.tipoUsuario);

        // Crear un JWT personalizado para la sesión del usuario
        const jwtPayload = { uid, email: correo, tipoUsuario: user.tipoUsuario, idUsuario: user.idUsuario };
        const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Responde con el JWT generado
        res.json({ token: jwtToken });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'No se puede verificar el token. Error' +error.message });
    }
}

/* Metodos para guardar datos */

// Metodo para registrar customer junto con usuario
const crearCustomerUsuarios = async (req, res) => {
    try {
        const { usuario, customer } = req.body;
        console.log(customer);
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
    getAllUsuarios,
    crearCustomerUsuarios,
    borrarUsuarioCustomer
};