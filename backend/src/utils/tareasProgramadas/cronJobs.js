// Se ncarga de realizar tareas programadas cada cierto tiempo
require('dotenv').config();
const cron = require('node-cron');
const { actualizarEstadoSuscripciones } = require('../../modules/suscripciones/services/SuscripcionService'); // Importar lógica de suscripciones
const { actualizarDestacadosActivos, reiniciarDestacadosPorMes, desactivarDestacadosVencidos } = require('../../modules/suscripciones/services/DestacadoService');
const { actualizarAscendidosActivos, reiniciarAscendidosPorMes, desactivarAscendidosVencidos } = require('../../modules/suscripciones/services/AscensoService')
const frecuenciaSuscripciones = process.env.CRON_FRECUENCIA_SUSCRIPCIONES || '0 * * * *'; // Predeterminado: cada hora
const frecuenciaDestacados = process.env.CRON_FRECUENCIA_DESTACADOS || '0 * * * *'; // Predeterminado: cada hora
const frecuenciaDestacadosMensual = process.env.CRON_FRECUENCIA_REINICIO_DESTACADOS || '0 * * * *'; // Predeterminado: cada hora
// Configurar cron job para ejecutar actualización de suscripciones y usuario
cron.schedule(frecuenciaSuscripciones, async () => {
    console.log('Iniciando actualización de suscripciones y usuarios...');
    try {
        console.log("Actualizando estado de suscripciones");
        await actualizarEstadoSuscripciones();
        console.log("Desactivar destacados de suscripciones vencidas");
        await desactivarDestacadosVencidos();
        console.log("Desactivar ascendidos de suscripciones vencidas");
        await desactivarAscendidosVencidos();
        console.log('Actualización completada.');
    } catch (error) {
        console.error('Error al actualizar suscripciones y usuarios:', error);
    }
});

// Configurar cron job para ejecutar actualización de estados destacados si superan el limite
cron.schedule(frecuenciaDestacados, async () => {
    console.log('Iniciando actualización de destacados y ascendidos...');
    try {
        console.log('Actualizar acumulados destacados');
        await actualizarDestacadosActivos();
        console.log('Actualización destacados completada.');
        console.log('Actualizar acumulados ascenso');
        await actualizarAscendidosActivos();
        console.log('Actualización ascenso completada.');
    } catch (error) {
        console.error('Error al actualizar suscripciones y usuarios:', error);
    }
});

// Configurar cron job para ejecutar desactivacion de destacados y ascendidos activos que cumplieron su mes (depende de la suscripcion)
cron.schedule(frecuenciaDestacadosMensual, async () => {
    console.log('Iniciando actualización de destacados y ascendidos...');
    try {
        console.log("Verificando reinicios de destacados por sucripcion");
        await reiniciarDestacadosPorMes();
        console.log('Reinicios de destacados completada.');

        console.log("Verificando reinicios de ascendidos por sucripcion");
        await reiniciarAscendidosPorMes();
        console.log('Reinicios de ascendidos completada.');
    } catch (error) {
        console.error('Error al actualizar suscripciones y usuarios:', error);
    }
});
