// Se interactua con la base de datos haciendo uso de sequelize o personalizadas

const DetalleInmueble = require("../entities/DetalleInmueble");


const insertDetalle = async (datosDetalle, transaction) => {
    try {
        if(transaction){
            await DetalleInmueble.create(datosDetalle,{transaction});
        }else{
            await DetalleInmueble.create(datosDetalle);
        }
        return "Detalle creado correctamente."
    }catch(error){
        throw error;
    }
};


module.exports = {
    insertDetalle,
}
