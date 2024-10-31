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

        const { idTipoInmueble, estadoInmueble, modalidadInmueble, administracion } = datosInmueble.inmueble;

        // Buscar el tipo de inmueble por ID
        const tipoInmueble = await TipoInmueble.findByPk(idTipoInmueble);

        if (!tipoInmueble) {
            throw new Error("Tipo de producto no encontrado");
        }

        // Verificar si el tipo es "proyecto" y es valido
        if (tipoInmueble.tipoInmueble === 'proyecto' && estadoInmueble !== 'nuevo') {
            throw new Error("Los inmuebles de tipo 'proyecto' deben ser nuevos.");
        }

        // Verificar si es arriendo entonces el campo de administracion no puede ser null
        if (modalidadInmueble === 'arriendo' && (!administracion)) {
            throw new Error("Los inmuebles en modalidad de arriendo deben especificar si incluyen o no la administracion.");

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
        
        //Si hay un nuevo tipo y este es arriendo se valida que arriendo no sea null
        if(inmueble.modalidadInmueble== "arriendo" && !inmueble.administracion){
            throw new Error("La modalidad de arriendo requiere que se especifique si la administración está incluida");     
        }
        
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

const eliminarInmueble = async (params) => {
    const { idInmueble } = params;

    try {
        //  Traer detalles (para sus ID)
        const detalles = await DetalleService.obtenerDetallesPorInmueble(idInmueble);

        // Extraer los IDs de los detalles
        const idsDetalles = detalles.map(detalle => detalle.dataValues.idDetalle);

        // Obtener fotos para cada idDetalle de forma concurrente
        const fotosPorDetalle = await Promise.all(
            idsDetalles.map(idDetalle => DetalleService.getFotoDetalle(idDetalle))
        );

        // Obtener videos para cada idDetalle de forma concurrente
        const videosPorDetalle = await Promise.all(
            idsDetalles.map(idDetalle => DetalleService.getVideoDetalle(idDetalle))
        );

        // Extraer las URLs de las fotos encontradas
        const urlsFoto = fotosPorDetalle.flatMap(fotos => fotos.map(foto => foto.urlFoto));

        // URL fotos por video
        const urlsVideo = videosPorDetalle.flatMap(videos => videos.map(video => video.urlVideo));

        // Borrar inmueble, proyectos, detalles y fotos por cascade
        await inmuebleRepository.borrarInmueble(idInmueble);

        // Borrar archivos de fotos de detalles

        await Promise.all(
            urlsFoto.map(url => DetalleService.deleteMultimedia("fotos", url))
        );

        // Borrar archivos de videos de detalles
        await Promise.all(
            urlsVideo.map(url => DetalleService.deleteMultimedia("videos", url))
        );
        return "Inmueble borrado correctamente. ";
    } catch (error) {
        return manejarErrorSequelize(error, null);
    }

}


module.exports = {
    insertarInmueble,
    actualizarInmuebleDetalles,
    eliminarInmueble
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