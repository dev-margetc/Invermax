// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const sequelize = require("../../../conf/database");

const Interesado = require("../entities/Interesado");
const Inmueble = require("../entities/Inmueble");

//Crea un inmueble con sus detalles y proyecto si es el caso
//Recibe los datos con detalles y una confirmación de si es proyecto
const insertarInteresado = async (datosInteresado, codInmueble) => {
  try {

    const interesado = await Interesado.create({
    ...datosInteresado,
    idInmueble: codInmueble
    });
    
    msg = "Interesado registrado.";
    return msg;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  insertarInteresado
}
