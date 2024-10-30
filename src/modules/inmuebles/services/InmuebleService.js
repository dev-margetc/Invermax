/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const Inmueble = require("../entities/Inmueble");
const TipoInmueble = require("../entities/TipoInmueble");
const sequelize = require("../../../conf/database");
const inmuebleRepository = require("../repositories/InmuebleRepository");
const DetalleService = require("./DetalleService");
const zonaInmuebleService = require("./ZonasInmueblesService");


const insertarInmueble = async (datosInmueble) => {
    try {

        //Verifica que un proyecto que no es nuevo tampoco sea proyecto 

        const { idTipoInmueble, estadoInmueble } = datosInmueble.inmueble;

        // Buscar el tipo de producto por ID
        const tipoInmueble = await TipoInmueble.findByPk(idTipoInmueble);

        if (!tipoInmueble) {
            throw new Error("Tipo de producto no encontrado");
        }

        // Verificar si el tipo es "proyecto" y es valido
        if (tipoInmueble.tipoInmueble === 'proyecto' && estadoInmueble !== 'nuevo') {
            throw new Error("Los productos de tipo 'proyecto' deben ser nuevos.");
        }

        // Extraer los campos y modificar los que se necesiten. Tambien se agrega lo que no viene en el front
        datosInmueble.inmueble.estadoPublicacionInmueble = "borrador";

        /*Si es valido se crea el inmueble con los detalles*/
        msg = await inmuebleRepository.insertarInmuebleDetalles(datosInmueble.inmueble, tipoInmueble.tipoInmueble === 'proyecto');
        return msg;

    } catch (error) {
        return manejarErrorSequelize(error, "inmueble-insert");
    }
}
//Actualizar inmueble con detalles
const actualizarInmuebleDetalles = async (datos, params) => {
    const { inmueble } = datos;
    const { idInmueble } = params
    const listaDetalles = inmueble.detalles;
    const zonas = inmueble.zonas;

    // crear transaccion
    const transaction = await sequelize.transaction(); // Iniciar la transacción
    try {
        // actualizar el inmueble
        await inmuebleRepository.actualizarInmueble(inmueble, idInmueble, transaction);

        // Si hay zonas se actualizan
        if (zonas) {
            await zonaInmuebleService.actualizarZonasInmuebles(zonas, idInmueble, transaction);
        }

        // Actualizar detalles si hay
        if (listaDetalles) {
            await DetalleService.actualizarDetallesInmueble(listaDetalles, idInmueble, transaction);
        }

        await transaction.commit();
        return "Actualizado";
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        return manejarErrorSequelize(error, "update");
    }
}


module.exports = {
    insertarInmueble,
    actualizarInmuebleDetalles
}



//Manejar los errores
function manejarErrorSequelize(error, def) {
    msgVal = "Error de clave unica";
    if (def == "inmueble-insert" || def == "update") {
        msgVal = "Ya existe ese código de inmueble en el sistema";
    }

    switch (error.name) {
        case "SequelizeUniqueConstraintError":
            return { error: true, type: 'VALIDATION_ERROR', message: msgVal };
        case "SequelizeValidationError":
            return { error: true, type: 'VALIDATION_ERROR', message: error.message };
        case "SequelizeForeignKeyConstraintError":
            return { error: true, type: 'VALIDATION_ERROR', message: "Error en la inserción. Error de relaciones: " + error.message };
        default:
            return { error: true, type: 'UNKNOWN', message: error.message };
    }
}