const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const ErrorNegocio = require('../utils/errores/ErrorNegocio');
require('dotenv').config();


const serviceAccount = {
    "type" : process.env.FB_TYPE,
    "project_id" : process.env.FB_PROJECT_ID,
    "private_key_id" : process.env.FB_PRIVATE_KEY_ID,
    "private_key" : process.env.FB_PRIVATE_KEY,
    "client_email" : process.env.FB_CLIENT_EMAIL,
    "client_id" : process.env.FB_CLIENT_ID,
    "auth_uri" : process.env.FB_AUTH_URI,
    "token_uri" : process.env.FB_TOKEN_URI,
    "auth_provider_x509_cert_url" : process.env.FB_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url" : process.env.FB_CLIENT_X509_CERT_URL,
    "universe_domain" : process.env.FB_UNIVERSE_DOMAIN
}


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

