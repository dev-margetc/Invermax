// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const Usuario = require("../entities/Usuario");
const Customer = require("../entities/Customer");

const getAllUsuarios = async () => {
    const users = await Usuario.findAll({});
    return users;

}

module.exports = {
    getAllUsuarios
}