// Se ncarga de realizar tareas programadas cada cierto tiempo
require('dotenv').config();
const cron = require('node-cron');
const { actualizarEstadoSuscripciones } = require('../../modules/suscripciones/services/SuscripcionService'); // Importar lógica de suscripciones


const frecuenciaSuscripciones = process.env.CRON_FRECUENCIA_SUSCRIPCIONES || '0 * * * *'; // Predeterminado: cada hora

// Configurar cron job para ejecutar actualización de suscripciones y usuario
cron.schedule( frecuenciaSuscripciones, async () => {
    console.log('Iniciando actualización de suscripciones y usuarios...');
    try {
        await actualizarEstadoSuscripciones();
        console.log('Actualización completada.');
    } catch (error) {
        console.error('Error al actualizar suscripciones y usuarios:', error);
    }
});

// Puedes agregar más cron jobs en el futuro, por ejemplo:
// cron.schedule('0 3 * * *', async () => { ... }); // Para otra tarea programada
