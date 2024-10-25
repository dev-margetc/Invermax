// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const sequelize = require("../../../conf/database");

const DetalleInmueble = require("../entities/DetalleInmueble");
const Inmueble = require("../entities/Inmueble");
const Proyecto = require("../entities/Proyecto")

const insertarInmuebleBasico = async (datosInmueble) => {
  const transaction = await sequelize.transaction(); // Iniciar la transacción
  try {

    //Crear el inmueble
    const inmueble =await Inmueble.create({
      ...datosInmueble, // Desestructura los campos que coinciden
      detalles: datosInmueble.detalles // Se manejan luego los detalles
    },{transaction});

    // Se obtiene el id del inmueble creado
    const inmuebleId = inmueble.idInmueble;

    //Se inserta el primer y unico detalle
    const detalle = datosInmueble.detalles[0];

    await DetalleInmueble.create({
      ...detalle,
      idInmueble: inmuebleId // Usar el id del inmueble insertado
    },{transaction})

    await transaction.commit(); // Confirmar la transacción
    return "Inmueble con detalles creado correctamente."
  } catch (error) {
    await transaction.rollback(); // Revertir la transacción en caso de error
    throw error;
  }
};

const insertarInmuebleProyecto = async (datosInmueble) => {
  const transaction = await sequelize.transaction(); // Iniciar la transacción
  try {
    await Inmueble.create({
      codigoInmueble: datosInmueble.codigoInmueble,
      estadoInmueble: datosInmueble.estadoInmueble,
      modalidadInmueble: datosInmueble.modalidadInmueble,
      tituloInmueble: datosInmueble.tituloInmueble,
      estrato: datosInmueble.estrato,
      administracion: datosInmueble.administracion,
      tipoVivienda: datosInmueble.tipoVivienda,
      idCustomer: datosInmueble.idCustomer,
      codigoCiudad: datosInmueble.codigoCiudad,
      idTipoInmueble: datosInmueble.idTipoInmueble,
      frameMaps: datosInmueble.frameMaps,
      descripcionInmueble: datosInmueble.descripcionInmueble,
      estadoPublicacionInmueble: datosInmueble.estadoPublicacionInmueble,
      DetalleInmueble: datosInmueble.detalles, //Detalles de los inmuebles (al ser de proyecto)
      Proyecto: datosInmueble.proyecto  //Detalles del proyecto
    }
      , {
        transaction,
        include: [
          { model: DetalleInmueble, as: "detalles" },
          { model: DetalleInmueble, as: "proyecto" }
        ]
      });

    await transaction.commit(); // Confirmar la transacción
    return "Inmueble con detalles creado correctamente."
  } catch (error) {
    await transaction.rollback(); // Revertir la transacción en caso de error
    throw error;
  }

};

module.exports = {
  insertarInmuebleBasico, insertarInmuebleProyecto
}
