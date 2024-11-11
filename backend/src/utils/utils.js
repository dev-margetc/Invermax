/**
 * Filtra los campos permitidos de un objeto.
 * @param {Object} sourceData - Datos recibidos a filtrar.
 * @param {Array} allowedFields - Lista de campos permitidos.
 * @returns {Object} - Objeto con solo los campos permitidos.
 */
const filtrarCampos = (sourceData, allowedFields) => {
    const filteredData = {};
    allowedFields.forEach((field) => {
        if (sourceData[field] !== undefined) {
            filteredData[field] = sourceData[field];
        }
    });
    return filteredData;
};

module.exports = {
    filtrarCampos
};