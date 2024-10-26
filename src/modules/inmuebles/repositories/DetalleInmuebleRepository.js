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

const insertarFoto = async (idDetalle, rutaFoto)=>{
    const transaction = await sequelize.transaction(); // Iniciar la transacción
    try {
        await Foto.create({
            urlFoto: rutaFoto,
            idDetalleInmueble: idDetalle
        });
        await transaction.commit();
        return "Foto de inmueble subida correctamente";
    }catch(error){
        await transaction.rollback(); // Revertir en caso de error
        throw error;
    }
}

const insertarVideo = async (idDetalle, rutaVideo)=>{
    const transaction = await sequelize.transaction(); // Iniciar la transacción
    try {
        await Video.create({
            urlFoto: rutaFoto,
            idDetalleInmueble: idDetalle
        });
        await transaction.commit();
        return "Video de inmueble subida correctamente";
    }catch(error){
        await transaction.rollback(); // Revertir en caso de error
        throw error;
    }
}

module.exports = {
    insertDetalle, insertarFoto
}
