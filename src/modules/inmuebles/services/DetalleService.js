/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const DetalleInmueble = require("../entities/DetalleInmueble");
const detalleRepo = require("../repositories/DetalleInmuebleRepository");
const sequelize = require("../../../conf/database");

const insertarMultimediaDetalle = async (detalleId, rutaFoto, tipoArchivo) => {
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
            msg = await detalleRepo.insertarVideo(detalleId, rutaFoto);
        } else {
            throw new Error("Tipo de archivo no especificado");
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
            console.log(detalle);
            const { idDetalle, ...nuevosDatos } = detalle;

            if (idDetalle) {
                // Actualiza el detalle si existe (tiene un id)
                await detalleRepo.actualizarDetalle(nuevosDatos, idDetalle, idInmueble, transaction);
            } else {
             
                // Crea un nuevo detalle si no existe idDetalle
                nuevosDatos.idInmueble = idInmueble;
                await detalleRepo.insertDetalle(nuevosDatos, idDetalle, transaction);
            }
        }));

        if(!t){
            await transaction.commit();
        }

    } catch (error) {
        if(!t){
            await transaction.rollback();
        }
        throw error;
    }
}


module.exports = {
    insertarMultimediaDetalle,
    actualizarDetallesInmueble
}