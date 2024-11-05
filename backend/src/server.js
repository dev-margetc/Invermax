const express = require('express');
const cors = require('cors');
const multer  = require('multer');
const upload = multer();
require('dotenv').config();

const sequelize = require('./conf/database'); // Importar la conexión a la BD


// Importar y ejecutar las asociaciones de los modelos
require('../src/modules/inmuebles/associations/associations');


const inmueblesRoutes = require('./modules/inmuebles/routes/InmueblesRoutes'); // Importar las rutas de inmuebles


//Configuración aplicacion
const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://tu-frontend.com', // Cambia esto al dominio de tu frontend
    optionsSuccessStatus: 200
};

app.use(express.json());
app.use(cors(corsOptions)); 

//Ruta por defecto    
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Usar las rutas del modulo de inmuebles
app.use('/inmuebles', inmueblesRoutes);


// Manejo de rutas no encontradas (404)
app.use((req, res, next) => {
    res.status(404).json({ error: {message: "Recurso no encontrado" }});
});


// Escuchar peticiones en el puerto solicitado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto:${PORT}`);
});