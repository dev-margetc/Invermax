const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const serviceAccount = require('../conf/prueba.json'); // archivo JSON descargado


// Inicializar Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// Función para verificar el token de Firebase
const verifyToken = async (token) => {
  try {
    if (token) {
      // Verificar el token usando Firebase Admin SDK
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken; // Retorna la información decodificada del token
    }
  } catch (error) {
    // Manejo de errores si el token no es válido
    console.error('Error al verificar el token:', error);
    throw new Error('Token inválido o expirado');
  }
};

// Verificar token propio
const verifyCustomToken = async (token) => {
  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Usa el mismo secreto
      return decoded; // Retorna la información decodificada
    }
  } catch (error) {
    // Manejo de errores si el token no es válido
    console.error('Error al verificar el token:', error);
    throw new Error('Token inválido o expirado');
  }
};


// Exportar la función de verificación
module.exports = { verifyToken, verifyCustomToken };

