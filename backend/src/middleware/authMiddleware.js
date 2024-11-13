// Middleware para proteger las rutas

const { verifyToken, verifyCustomToken } = require('../conf/firebaseAuth'); // Importa la función para verificar el token

// Middleware para verificar el token de Firebase en las rutas protegidas
const protegerRuta = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Token en el header

  if (!token) {
    return res.status(401).send('Token no proporcionado');
  }

  try {
    //const decodedToken = await verifyToken(token); // Verificar el token con la función de firebase
    const decodedToken = await verifyCustomToken(token); // Verificar con el token custom
    req.user = decodedToken; // Almacena los datos del usuario en req.user
    next(); // Pasa al siguiente middleware o ruta
  } catch (error) {
    return res.status(401).send('Token inválido o expirado');
  }
};

module.exports = { protegerRuta };
