// Se ncarga de realizar tareas programadas cada cierto tiempo
require('dotenv').config();
const cron = require('node-cron');
const { actualizarEstadoSuscripciones } = require('../../modules/suscripciones/services/SuscripcionService'); // Importar lógica de suscripciones
const { actualizarDestacadosActivos, reiniciarDestacadosPorMes, desactivarDestacadosVencidos} = require('../../modules/suscripciones/services/DestacadoService');

const frecuenciaSuscripciones = process.env.CRON_FRECUENCIA_SUSCRIPCIONES || '0 * * * *'; // Predeterminado: cada hora
const frecuenciaDestacados = process.env.CRON_FRECUENCIA_DESTACADOS || '0 * * * *'; // Predeterminado: cada hora
const frecuenciaDestacadosMensual = process.env.CRON_FRECUENCIA_REINICIO_DESTACADOS || '0 * * * *'; // Predeterminado: cada hora
// Configurar cron job para ejecutar actualización de suscripciones y usuario
cron.schedule( frecuenciaSuscripciones, async () => {
    console.log('Iniciando actualización de suscripciones y usuarios...');
    try {
        console.log("Actualizando estado de suscripciones");
        await actualizarEstadoSuscripciones();
        console.log("Desactivar destacados de suscripciones vencidas");
        await desactivarDestacadosVencidos();
        console.log('Actualización completada.');
    } catch (error) {
        console.error('Error al actualizar suscripciones y usuarios:', error);
    }
});

// Configurar cron job para ejecutar actualización de estados destacados
cron.schedule( frecuenciaDestacados, async () => {
    console.log('Iniciando actualización de destacados...');
    try {
        console.log('Actualizar acumulados');
        await actualizarDestacadosActivos();
        console.log('Actualización destacados completada.');
    } catch (error) {
        console.error('Error al actualizar suscripciones y usuarios:', error);
    }
});

// Configurar cron job para ejecutar revision de estados destacados mensual (depende de la suscripcion)
cron.schedule( frecuenciaDestacadosMensual, async () => {
    console.log('Iniciando actualización de destacados...');
    try {
        console.log("Verificando reinicios de destacados por sucripcion");
        await reiniciarDestacadosPorMes();
        console.log('Reinicios de destacados completada.');
    } catch (error) {
        console.error('Error al actualizar suscripciones y usuarios:', error);
    }
});
