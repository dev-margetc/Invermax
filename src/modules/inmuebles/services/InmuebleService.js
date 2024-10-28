/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const Inmueble = require("../entities/Inmueble");
const TipoInmueble = require("../entities/TipoInmueble");
const seq = require("../../../conf/database");
const inmuebleRepository = require("../repositories/InmuebleRepository");


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

//Agregar zona
const agregarZona = async (datos) => {
    try {
        //idZona puede ser una lista de id de zonas
        const { idZona, idInmueble } = datos;

        // Buscar por ID el inmueble
        const inmueble = await Inmueble.findByPk(idInmueble);

        if (!inmueble) {
            throw new Error("Inmueble no encontrado");
        }

        /*Si es valido se inserta en la intermedia definida en asociaciones*/
        msg = await inmuebleRepository.asociarZona(inmueble, idZona);
        return msg;

    } catch (error) {
        return manejarErrorSequelize(error, null);
    }
}

module.exports = {
    insertarInmueble,
    agregarZona
}



//Manejar los errores
function manejarErrorSequelize(error, def) {
    msgVal = "Error de clave unica";
    if (def == "inmueble-insert") {
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