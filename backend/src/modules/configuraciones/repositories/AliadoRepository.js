// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const Aliado = require("../entities/Aliado");

const ErrorNegocio = require('../../../utils/errores/ErrorNegocio');

/* Metodos de consulta*/
// Traer los aliados dadas unas condiciones
const getAllAliados = async (condiciones = null) => {
    const filtro = { ...condiciones || {} } // Combinar condiciones extra
    try {
        const aliados = await Aliado.findAll({
            where: filtro
        });
        return aliados;
    } catch (err) {
        throw err;
    }
}

/* Metodos de insercion*/

//Metodos insercion
const insertarAliado = async (datos) => {
    try {
        // Crea el aliado
        const aliado = await Aliado.create(datos);

        return aliado; // Devuelve el aliado creado
    } catch (err) {
        console.error('Error al insertar el aliado:', err);
        throw err;
    }
}

/* Metodos de actualizacion*/
const actualizarAliado = async (idAliado, datos) => {

    try {
        // Buscar el aliado por su ID
        const aliado = await Aliado.findByPk(idAliado);
        if (!aliado) {
            throw new ErrorNegocio(`Aliado con ID ${idAliado} no encontrado`);
        }

        // Actualizar los datos del aliado
        await aliado.update(datos); 

        return aliado; // Devuelve el aliado actualizado
    } catch (err) {
        console.error('Error al actualizar el aliado:', err);
        throw err;
    }
};


/* Metodos de borrado*/
const eliminarAliado = async (idAliado) => {
    try {
        // Buscar el aliado por su ID
        const aliado = await Aliado.findByPk(idAliado);
        if (!aliado) {
            throw new Error(`Aliado con ID ${idAliado} no encontrado`);
        }

        // Eliminar el aliado
        await aliado.destroy();

        console.log(`Aliado con ID ${idAliado} eliminado correctamente`);
        return true; // Devuelve true si se eliminó correctamente
    } catch (err) {
        console.error('Error al eliminar el aliado:', err);
        throw err;
    }
};



module.exports = {
    insertarAliado,
    getAllAliados,
    actualizarAliado,
    eliminarAliado,
}