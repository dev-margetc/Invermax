// Middleware para proteger las rutas

const { verifyToken, verifyCustomToken } = require('../conf/firebaseAuth'); // Importa la función para verificar el token
const {getUserByUID} = require('../modules/usuarios/services/UsuariosService');
const ErrorNegocio = require('../utils/errores/ErrorNegocio');

// Middleware para verificar el token de Firebase en las rutas protegidas. Pide una lista de roles permitidos
const protegerRuta = (rolesPermitidos) =>{
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Token en el header
 
      //const decodedToken = await verifyToken(token); // Verificar el token con la función de firebase
      const decodedToken = await verifyCustomToken(token); // Verificar con el token custom
      const {uid} = decodedToken; // Obtener el UID

      const user = await getUserByUID(uid); // Buscar al usuario en la BD y extraer su rol

      if (!rolesPermitidos.includes(user.tipoUsuario)) {
        throw new ErrorNegocio('Acceso denegado: No tienes permisos suficientes', 'AUTH_ERROR', 403);
      }

      next(); // Pasa al siguiente middleware o ruta
    } catch (error) {
      next(error);// Si ocurre un error inesperado, pasarlo al manejador global
    }
  };
  
}


module.exports = { protegerRuta };
