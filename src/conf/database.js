//Configuración sequelize y base de datos
const { Sequelize } = require('sequelize');

// No es necesario cargar dotenv en producción
require('dotenv').config({ path: __dirname + '/.env' });

 
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false, // Cambiar a `console.log` si se quieren ver las consultas SQL en consola
    }
);

// Probar la conexión
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida con éxito.');
    } catch (error) {
        console.log(process.env.DB_USER);
        console.error('No se pudo conectar a la base de datos:', error);
    }
})();

module.exports = sequelize; // Exportar la instancia de Sequelize