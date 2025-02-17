/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const { deleteMultimediaServidor } = require("../../../middleware/uploadConfig");
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");
const DetalleInmueble = require("../entities/DetalleInmueble");
const CaracteristicaService = require("../../suscripciones/services/CaracteristicasService");
const detalleRepo = require("../repositories/DetalleInmuebleRepository");
const inmuebleRepo = require("../repositories/InmuebleRepository");
const sequelize = require("../../../conf/database");
const fs = require('fs');

// Subir algun tipo de multimedia
const insertarMultimediaDetalle = async (detalleId, rutaFoto, tipoArchivo, idCustomer) => {
    try {

        if (!rutaFoto) {
            throw new ErrorNegocio("Ruta no encontrada");
        }

        if (!tipoArchivo) {
            throw new ErrorNegocio("Tipo de archivo no especificado");
        }
        // Verificar que exista el id del detalle
        const detalle = await DetalleInmueble.findByPk(detalleId);

        if (!detalle) {
            throw new ErrorNegocio("Detalle no encontrado");
        }

        /*Si es valido se crea la foto o video*/
        msg = "";
        if (tipoArchivo === 'foto') {
            // Verificar que el plan le permita subir fotos
        //   await CaracteristicaService.verificarFotoDetalle(idCustomer, detalleId);
            msg = await detalleRepo.insertarFoto(detalleId, rutaFoto);
        } else if (tipoArchivo === 'video') {
          //  await CaracteristicaService.verificarVideoDetalle(idCustomer,detalleId);
            msg = await detalleRepo.insertarVideo(detalleId, rutaFoto);
        } else {
            throw new ErrorNegocio("Tipo de archivo no especificado");
        }
        return msg;

    } catch (error) {
        throw error;
    }
}

//Actualiza detalles y los crea si es necesario
const actualizarDetallesInmueble = async (listaDetalles, idInmueble, transaction) => {
    t = true; // Para marcar si existe la transaccion
    // Si no existe la transaccion la crea
    if (!transaction) {
        t = false;
        transaction = await sequelize.transaction(); // Iniciar la transacción
    }

    try {
        // Itera sobre cada detalle en listaDetalles
        await Promise.all(listaDetalles.map(async (detalle) => {

            const { idDetalle, ...nuevosDatos } = detalle;

            if (idDetalle) {
                // Actualiza el detalle si existe (tiene un id)
                await detalleRepo.actualizarDetalle(nuevosDatos, idDetalle, idInmueble, transaction);
            } else {

                // Crea un nuevo detalle si no existe idDetalle
                nuevosDatos.idInmueble = idInmueble;

                /*Agregar el id del proyecto si este es de ese tipo */
                let inmueble = await inmuebleRepo.getInmuebleByID(idInmueble);
                if(inmueble[0].proyecto){
                    nuevosDatos.idProyecto = inmueble[0].proyecto.idProyecto;
                    // Solo lo crea si es de tipo proyecto
                    await detalleRepo.insertDetalle(nuevosDatos, idDetalle, transaction);
                }
               
            }
        }));

        if (!t) {
            await transaction.commit();
        }

    } catch (error) {
        if (!t) {
            await transaction.rollback();
        }
        throw error;
    }
}

const obtenerDetallesPorInmueble = async (idInmueble) => {
    try {
        const detalles = detalleRepo.detallesPorInmueble(idInmueble);
        return detalles;

    } catch (error) {
        console.error("Error obteniendo los detalles:", error);
        throw error;
    }
};

// Traer fotos de un detalle
const getFotoDetalle = async (idDetalle) => {
    try {
        const fotos = await detalleRepo.fotosDetalle(idDetalle);
        console.log("fotos");
        console.log(fotos);
        return fotos;
    } catch (error) {
        throw error;
    }
}

// Traer videos de un detalle
const getVideoDetalle = async (idDetalle) => {
    try {

        const videos = await detalleRepo.videosDetalle(idDetalle);
        //console.log(videos[0].dataValues);
        return videos;
    } catch (error) {
        throw error;
    }
}

// Traer info de una multimedia (video o foto)
const getInfoMultimedia = async (idMultimedia, tipo, idDetalle) => {
    try {
        let multimedia;
        // Dependiendo del tipo se trae diferente informacion (videos o fotos)
        if (tipo === 'foto') {
            multimedia = await detalleRepo.getInfoFoto(idMultimedia, idDetalle);
        } else if (tipo === 'video') {
            multimedia = await detalleRepo.getInfoVideo(idMultimedia, idDetalle);
        } else {
            return "Tipo no especificado";
        }
        if (!multimedia || multimedia.length <= 0) {
            throw new ErrorNegocio("No se encontró multimedia con esos parametros");
        }

        // Solo se retorna el primer valor
        return multimedia[0];
    } catch (error) {
        throw error;
    }
}



// Eliminar un detalle. Los registros de fotos y videos se borran por la relacion cascade
const deleteDetalle = async (idDetalle) => {
    try {

        // Traer el id del inmueble asociado
        const detalle = await DetalleInmueble.findByPk(idDetalle);

        if (!detalle) {
            throw new ErrorNegocio("No existe un detalle con el ID proporcionado");
        }

        const listaDetalles = await obtenerDetallesPorInmueble(detalle.idInmueble);

        // Si el inmueble solo tiene ese detalle no se borra (se debe modificar o eliminar el inmueble)
        if (listaDetalles.length <= 1) {
            throw new ErrorNegocio("Un inmueble no puede quedarse sin tipos. Modifique el actual o elimine el inmueble.");
        } else {

            // Obtener fotos para idDetalle
            let fotosDetalle = await getFotoDetalle(idDetalle);

            // Obtener videos para cada idDetalle de forma concurrente
            let videosDetalle = await getVideoDetalle(idDetalle)

            // Extraer las URLs de las fotos encontradas
            const urlsFoto = fotosDetalle.flatMap(foto => foto.dataValues.urlFoto);

            // URL video
            const urlsVideo = videosDetalle.flatMap(video => video.dataValues.urlVideo);

            // Borrar el detalle
            await detalleRepo.eliminarDetalle(idDetalle);

            // Eliminar fotos y videos usando las URL
            await Promise.all(
                urlsFoto.map(url => deleteMultimediaServidor("fotos", url, "inmuebles"))
            );
            // Borrar archivos de videos de detalles
            await Promise.all(
                urlsVideo.map(url => deleteMultimediaServidor("videos", url, "inmuebles"))
            );
        }

        return "Detalle eliminado correctamente"

    } catch (error) {
        throw error;
    }
}


// Eliminar archivos de un detalle del servidor y la BD. 
const deleteMultimediaBD = async (idMultimedia, tipoMultimedia, idDetalle) => {
    transaction = await sequelize.transaction(); // Iniciar la transacción
    try {
        // Traer informacion del video o foto
        multimedia = await getInfoMultimedia(idMultimedia, tipoMultimedia, idDetalle);
        // Eliminar archivo del servidor
        const filePath = tipoMultimedia === 'foto' ? multimedia.urlFoto : multimedia.urlVideo;
        const tipo = tipoMultimedia === 'foto' ? "fotos" : "videos";
        await deleteMultimediaServidor(tipo, filePath, "inmuebles");
        // Primero, eliminar de la BD dentro de la transacción
        if (tipoMultimedia === 'foto') {
            await detalleRepo.eliminarFoto(idMultimedia, idDetalle, transaction);
        } else {
            await detalleRepo.eliminarVideo(idMultimedia, idDetalle, transaction);
        }

        await transaction.commit();

        return "Multimedia borrada";
    } catch (error) {
        transaction.rollback();
        throw error;
    }

}


module.exports = {
    insertarMultimediaDetalle,
    actualizarDetallesInmueble,
    obtenerDetallesPorInmueble,
    getFotoDetalle,
    getVideoDetalle,
    deleteMultimediaBD,
    deleteDetalle,
    getInfoMultimedia
}