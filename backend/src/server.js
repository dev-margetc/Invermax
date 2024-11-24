const express = require('express');
const cors = require("cors");
const multer  = require('multer');
const upload = multer();
require('dotenv').config();

const sequelize = require('./conf/database'); // Importar la conexión a la BD


// Importar y ejecutar las asociaciones de los modelos de los modulos
require('./modules/inmuebles/associations/associations');
require('./modules/usuarios/associations/associations');
require('./modules/suscripciones/associations/associations'); 

const inmueblesRoutes = require('./modules/inmuebles/routes/InmueblesRoutes'); // Importar las rutas de inmuebles
const usuariosRoutes = require('./modules/usuarios/routes/UsuariosRoutes'); // Importar las rutas de usuarios
const suscripcionesRoutes = require('./modules/suscripciones/routes/SuscripcionesRoutes'); // Importar las rutas de usuarios
const globalErrorHandler = require("./middleware/globalErrorHandler"); // Handler de errores

//Configuración aplicacion
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

// Permitir solicitudes desde el frontend (http://localhost:3001)
app.use(cors({
    origin: "http://localhost:3001", // Reemplazar con el origen del frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    credentials: true, // enviar cookies o autenticación
}));

//Ruta por defecto    
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Usar las rutas del modulo de inmuebles
app.use('/inmuebles', inmueblesRoutes);

// Usar las rutas del modulo de usuarios
app.use('/usuarios', usuariosRoutes);

// Usar las rutas del modulo de suscripciones
app.use('/suscripciones', suscripcionesRoutes);

// Manejador de errores globales
app.use(globalErrorHandler);

// Manejo de rutas no encontradas (404)
app.use((req, res, next) => {
    res.status(404).json({ error: {message: "404.Recurso no encontrado" }});
});


// Escuchar peticiones en el puerto solicitado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto:${PORT}`);
});