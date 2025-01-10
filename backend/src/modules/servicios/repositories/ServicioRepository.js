// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const Servicio = require("../entities/Servicio");
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");

/* Metodos de consulta*/
// Traer los servicios dadas unas condiciones
const getAllServicios = async (condiciones = null) => {
    const filtro = { ...condiciones || {} } // Combinar condiciones extra
    try {
        const servicios = await Servicio.findAll({
            where: filtro
        });
        return servicios;
    } catch (err) {
        throw err;
    }
}

/* Metodos de insercion*/

//Metodos insercion
const insertarServicio = async (datos) => {
    try {
        // Crea el servicio
        const servicio = await Servicio.create(datos);

        return servicio; // Devuelve el servicio creado
    } catch (err) {
        console.error('Error al insertar el servicio:', err);
        throw err;
    }
}
/* Metodos de actualizacion*/
const actualizarServicio = async (idServicio, datos) => {
    try {
        // Buscar el servicio por su ID
        const servicio = await Servicio.findByPk(idServicio);
        if (!servicio) {
            throw new ErrorNegocio(`Servicio con ID ${idServicio} no encontrado`);
        }

        // Actualizar los datos del servicio
        await servicio.update(datos); 

        return servicio; // Devuelve el servicio actualizado
    } catch (err) {
        throw err;
    }
};


/* Metodos de borrado*/
const eliminarServicio = async (idServicio) => {
    try {
        // Buscar el servicio por su ID
        const servicio = await Servicio.findByPk(idServicio);
        if (!servicio) {
            throw new ErrorNegocio(`Servicio con ID ${idServicio} no encontrado`);
        }

        // Eliminar el servicio
        await servicio.destroy();

        console.log(`Servicio con ID ${idServicio} eliminado correctamente`);
        return true; // Devuelve true si se eliminó correctamente
    } catch (err) {
        console.error('Error al eliminar el servicio:', err);
        throw err;
    }
};


module.exports = {
    insertarServicio,
    getAllServicios,
    actualizarServicio,
    eliminarServicio
}