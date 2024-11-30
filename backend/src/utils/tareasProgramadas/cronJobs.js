// Se ncarga de realizar tareas programadas cada cierto tiempo

const cron = require('node-cron');
const { actualizarEstadoSuscripciones } = require('../../modules/suscripciones/services/SuscripcionService'); // Importar lógica de suscripciones

// Configurar cron job para ejecutar actualización de suscripciones y usuarios a las 2 AM todos los días
cron.schedule('*/4 * * * * *', async () => {
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
