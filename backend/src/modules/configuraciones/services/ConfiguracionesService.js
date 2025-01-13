/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/

const ConfRepo = require("../repositories/ConfiguracionesRepository");
/* Metodos de consulta*/

// Traer la informacion de INVERMAX
const getInfoInvermax = async () => {
  return JSON.parse(await ConfRepo.traerInfoInvermax());
}

/* Metodos actualizacion*/
// Traer la informacion de INVERMAX
const updateInfoInvermax = async (nuevosDatos) => {
  // Leer contenido actual del archivo
  try {
    const contenidoActual = JSON.parse(await ConfRepo.traerInfoInvermax());

    /* 
    La caracteristica del operador de propagacion ... permite
    1: Copiar las propiedades de obj1 al nuevo objeto.
    2: Copiar las propiedades de obj2. Si hay una coincidencia, el valor en obj2 reemplaza el valor en obj1 .
    */
    const contenidoActualizado = {
      ...contenidoActual, // Copia todas las propiedades de `contenidoActual`
      ...nuevosDatos,  // Sobrescribe o agrega propiedades con las de `nuevosDatos`
      contactInfo: {
        ...contenidoActual.contactInfo,
        ...nuevosDatos.contactInfo,
      },
      socialInfo: {
        ...contenidoActual.socialInfo,
        ...nuevosDatos.socialInfo,
      },
    };

    await ConfRepo.actualizarInfoInvermax(contenidoActualizado);

    return contenidoActualizado;

  } catch (err) {
    throw err;
  }
}
module.exports = {
  getInfoInvermax,
  updateInfoInvermax
}
