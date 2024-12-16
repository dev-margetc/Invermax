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

/**
 * Construye un objeto de condiciones a partir de los parámetros.
 * Esta función filtra un objeto, devolviendo solo las propiedades con valores válidos
 * (que no sean `null` ni `undefined`).
 * 
 * @param {Object} params - Objeto que contiene todas las posibles condiciones.
 *                          Las propiedades de este objeto son los parámetros a evaluar.
 *                        - Params puede ingresarse como objeto asi {nombreCondicion: Valor} o {nombreCondicion}
 * @returns {Object} - Un nuevo objeto que incluye únicamente las propiedades 
 *                    cuyo valor no sea `null` ni `undefined`.
 */
const construirCondiciones = (params) => {
    //  objeto vacío donde se guardarán las condiciones filtradas
    return Object.keys(params) // Se obtiene un arreglo (condiciones) con las claves del objeto `params`
        .reduce((condiciones, key) => {
            /**
             * Por cada clave (`key`) del objeto `params`:
             * - Verificar si el valor asociado NO es `null` NI `undefined`.
             * - Si cumple la condición, la agregar al objeto `condiciones`.
             */
            if (params[key] !== null && params[key] !== undefined) {
                condiciones[key] = params[key]; // Agregar la clave y su valor al nuevo objeto
            }

            // Devolver el objeto `condiciones` actualizado en cada iteración
            return condiciones;
        }, {}); // El objeto inicial con el que comienza `reduce` es un objeto vacío {}
};


module.exports = {
    filtrarCampos,
    construirCondiciones
};