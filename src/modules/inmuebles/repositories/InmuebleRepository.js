// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const sequelize = require("../../../conf/database");

const DetalleInmueble = require("../entities/DetalleInmueble");
const Inmueble = require("../entities/Inmueble");
const Proyecto = require("../entities/Proyecto")

//Crea un inmueble con sus detalles y proyecto si es el caso
//Recibe los datos con detalles y una confirmación de si es proyecto
const insertarInmuebleDetalles = async (datosInmueble, isProyecto) => {
  const transaction = await sequelize.transaction(); // Iniciar la transacción
  try {

    //Crear el inmueble
    const inmueble = await Inmueble.create({
      ...datosInmueble, // Desestructura los campos que coinciden
      detalles: datosInmueble.detalles // Se manejan luego los detalles
    }, { transaction });

    // Se obtiene el id del inmueble creado
    const inmuebleId = inmueble.idInmueble;

    //Si el inmueble es tipo proyecto se inserta
    idProyecto = null;
    if (isProyecto) {
      const proyecto = await Proyecto.create({
        ...datosInmueble.proyecto,
        idInmueble: inmuebleId
      }, { transaction })

      //Se obtiene el id del proyecto si fue creado
      idProyecto = proyecto.idProyecto;
    }

    // Iterar sobre los detalles y crear cada registro en DetalleInmueble
    const detalles = datosInmueble.detalles;
    for (const detalle of detalles) {
      await DetalleInmueble.create({
        ...detalle,
        idInmueble: inmuebleId, // Usar el id del inmueble insertado
        idProyecto: idProyecto //Id del proyecto insertado o NULL
      }, { transaction });
    }
    await transaction.commit(); // Confirmar la transacción
    msg = "Inmueble con detalles creado correctamente.";
    if (isProyecto) {
      msg = "Proyecto creado correctamente."
    }
    return msg;
  } catch (error) {
    await transaction.rollback(); // Revertir la transacción en caso de error
    throw error;
  }
};

module.exports = {
  insertarInmuebleDetalles
}
