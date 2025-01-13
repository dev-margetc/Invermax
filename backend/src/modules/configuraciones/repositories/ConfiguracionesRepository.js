// Se interactua con el archivo JSON directamente
const fs = require('fs').promises;
const path = require('path');

/* Consulta */
// Traer todo el archivo de informacion de INVERMAX
const traerInfoInvermax = async () => {
    try {
        const CONFIG_PATH = path.join(__dirname, '../../../conf/appSettings/info-invermax.json');
        const infoInvermax = await fs.readFile(CONFIG_PATH, 'utf-8');
        return infoInvermax;
    } catch (err) {
        throw err;
    }

}

/* Actualizacion*/
// Actualizar el archivo de información de INVERMAX
const actualizarInfoInvermax = async (contenidoActualizado) => {
    try {
        const CONFIG_PATH = path.join(__dirname, '../../../conf/appSettings/info-invermax.json');
        console.log(contenidoActualizado);
        // Guardar el archivo actualizado
        await fs.writeFile(CONFIG_PATH, JSON.stringify(contenidoActualizado, null, 2), 'utf8');

        return "objeto actualizado";
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    traerInfoInvermax,
    actualizarInfoInvermax
}
