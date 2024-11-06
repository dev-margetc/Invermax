// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const Usuario = require("../entities/Usuario");
const Customer = require("../entities/Customer");
const sequelize = require("../../../conf/database");


const getAllUsuarios = async () => {
    const users = await Usuario.findAll({});
    return users;

}


/*  Insertar un usuario
    Se incluye transaccion en caso de ser requerido por el servicio
*/
const insertarUsuario = async (datosUsuario, transaccion) => {
    try {
        const user = await Usuario.create({
            ...datosUsuario,
        },{transaction:transaccion});

        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllUsuarios,
    insertarUsuario
}