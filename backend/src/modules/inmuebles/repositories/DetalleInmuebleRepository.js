// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const sequelize = require("../../../conf/database");
const DetalleInmueble = require("../entities/DetalleInmueble");
const Foto = require("../entities/Foto");
const Video = require("../entities/Video");


const insertDetalle = async (datosDetalle, transaction) => {
    try {
        if (transaction) {
            await DetalleInmueble.create(datosDetalle, { transaction });
        } else {
            await DetalleInmueble.create(datosDetalle);
        }
        return "Detalle creado correctamente."
    } catch (error) {
        throw error;
    }
};

const insertarFoto = async (idDetalle, rutaFoto) => {
    const transaction = await sequelize.transaction(); // Iniciar la transacción
    try {
        await Foto.create({
            urlFoto: rutaFoto,
            idDetalleInmueble: idDetalle
        });
        await transaction.commit();
        return "Foto de inmueble subida correctamente";
    } catch (error) {
        await transaction.rollback(); // Revertir en caso de error
        throw error;
    }
}

const insertarVideo = async (idDetalle, rutaVideo) => {
    const transaction = await sequelize.transaction(); // Iniciar la transacción
    try {
        await Video.create({
            urlVideo: rutaVideo,
            idDetalleInmueble: idDetalle
        });
        await transaction.commit();
        return "Video de inmueble subido correctamente";
    } catch (error) {
        await transaction.rollback(); // Revertir en caso de error
        throw error;
    }
}

// Actualizar detalle
const actualizarDetalle = async (datos, idDetalle, idInmueble, transaccion) => {
    try {
        // Bandera para saber si la transaccion se crea acá
        let t = false;

        // Si no existe la transaccion la crea
        if (!transaccion) {
            t = true;
            transaccion = await sequelize.transaction(); // Iniciar la transacción
        }
        console.log(idInmueble);
        console.log(idDetalle);
        console.log(datos);
        await DetalleInmueble.update(datos, {
            where: { idDetalle: idDetalle, idInmueble: idInmueble },
            fields: ['valorInmueble', 'area', 'frameRecorrido', 'cantidadHabitaciones',
                'cantidadBaños', 'parqueadero', 'amoblado'], // Campos permitidos para actualizar
            transaccion
        });
        if (t) {
            console.log("trans");
           await transaccion.commit();
        }
        return "Detalle actualizado"
    } catch (error) {
        if(t){
           await transaccion.rollback();
        }
        throw error;
    }
}

// Traer fotos de un detalle
const fotosDetalle = async (idDetalle) => {
    try {
        const fotos = await Foto.findAll({
            where: {
                idDetalleInmueble: idDetalle
            }
        });
        // console.log(fotos[0].dataValues);
        return fotos;
    } catch (error) {
        throw error;
    }
}
// Traer videos de un detalle
const videosDetalle = async (idDetalle) => {
    try {
        const videos = await Video.findAll({
            where: {
                idDetalleInmueble: idDetalle
            }
        });
        // console.log(fotos[0].dataValues);
        return videos;
    } catch (error) {
        throw error;
    }
}

// Traer info de una foto
const getInfoFoto = async (idFoto, idDetalle) => {
    try {
        const fotos = await Foto.findAll({
            where: {
                idFoto: idFoto,
                idDetalleInmueble: idDetalle
            }
        });
        // console.log(fotos[0].dataValues);
        return fotos;
    } catch (error) {
        throw error;
    }
}

// Traer info de un video
const getInfoVideo = async (idVideo, idDetalle) => {
    try {
        const videos = await Video.findAll({
            where: {
                idDetalleInmueble: idDetalle,
                idVideo: idVideo
            }
        });
        // console.log(fotos[0].dataValues);
        return videos;
    } catch (error) {
        throw error;
    }
}

// Detalles de un inmueble
const detallesPorInmueble = async (idInmueble) => {
    try {
        const detalles = await DetalleInmueble.findAll({
            where: {
                idInmueble: idInmueble
            }
        });
        // console.log(detalles[0].dataValues);
        return detalles;
    } catch (error) {
        throw error;
    }
}

// Eliminar un detalle de inmueble
const eliminarDetalle = async (idDetalle) => {
    try {
        await DetalleInmueble.destroy({ where: { idDetalle } });
        return "Detalle eliminado correctamente.";
    } catch (error) {
        throw error;
    }
}

// Eliminar una foto de la bd
const eliminarFoto = async (idFoto, idDetalle, transaccion) => {
    try {
        await Foto.destroy({ where: { idDetalleInmueble: idDetalle, idFoto: idFoto }, transaccion });
        return "Foto eliminada correctamente.";
    } catch (error) {
        throw error;
    }
}

// Eliminar un video de la bd
const eliminarVideo = async (idVideo, idDetalle, transaccion) => {
    try {
        await Video.destroy({ where: { idDetalleInmueble: idDetalle, idVideo: idVideo }, transaccion });
        return "Video eliminado correctamente.";
    } catch (error) {
        throw error;
    }
}

module.exports = {
    insertDetalle, insertarFoto, insertarVideo, actualizarDetalle,
    detallesPorInmueble, fotosDetalle, videosDetalle, eliminarDetalle,
    getInfoVideo, getInfoFoto, eliminarFoto, eliminarVideo
}
