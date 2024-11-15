const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const serviceAccount = require('../conf/prueba.json'); // archivo JSON descargado
const ErrorNegocio = require('../utils/errores/ErrorNegocio');


// Inicializar Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// Función para verificar el token de Firebase
const verifyToken = async (token) => {
  try {
    if (token == 'null' || !token) {
      throw new ErrorNegocio('Token no proporcionado', 'MISSING_TOKEN', 401);
    }
    // Verificar el token usando Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken; // Retorna la información decodificada del token

  } catch (error) {
    // Manejo de errores si el token no es válido
    throw error;
  }
};

// Verificar token propio
const verifyCustomToken = async (token) => {
  try {
    if (token == 'null' || !token) {
      throw new ErrorNegocio('Token no proporcionado', 'MISSING_TOKEN', 401);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Usa el mismo secreto
    return decoded; // Retorna la información decodificada
  } catch (error) {
    // Manejo de errores si el token no es válido
    throw error;
  }
};

// Traer token
const traerToken = async (req) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Token en el header

  //const decodedToken = await verifyToken(token); // Verificar el token con la función de firebase
  const decodedToken = await verifyCustomToken(token); // Verificar con el token custom

  return decodedToken;
}
// Exportar la función de verificación
module.exports = { verifyToken, verifyCustomToken, traerToken };

