/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const foto = require("../entities/Foto");
const DetalleInmueble = require("../entities/DetalleInmueble");
const detalleRepo = require("../repositories/DetalleInmuebleRepository");

const insertarFotoDetalle = async (detalleId, rutaFoto, tipoArchivo) => {
    try {

        // Verificar que exista el id del detalle
        const detalle = await DetalleInmueble.findByPk(detalleId);

        if (!detalle) {
            throw new Error("Detalle no encontrado");
        }

        /*Si es valido se crea la foto o video*/
        msg = "";
        if (tipoArchivo === 'foto') {
            msg = await detalleRepo.insertarFoto(detalleId, rutaFoto);
        } else if (tipoArchivo === 'video') {
            msg = await detalleRepo.insertarFoto(detalleId, rutaFoto);
        } else {
            throw new Error("Tipo de archivo no especificado");
        }      
        return msg;

    } catch (error) {
        throw error;
    }
}

const insertarVideoDetalle = async (detalleId, rutaVideo) => {
    try {

        // Verificar que exista el id del detalle
        const detalle = await DetalleInmueble.findByPk(detalleId);

        if (!detalle) {
            throw new Error("Detalle no encontrado");
        }

        /*Si es valido se crea la foto*/
        msg = await detalleRepo.insertarFoto(detalleId, rutaFoto);
        console.log(msg);
        return msg;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    insertarFotoDetalle
}