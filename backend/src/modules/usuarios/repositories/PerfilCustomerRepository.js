// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const Perfil = require("../entities/PerfilCustomer");

/* Metodos GET*/

// Traer los perfiles dadas unas condiciones
const getPerfiles = async (condiciones) => {
    const filtro = { ...condiciones || {} } // Combinar condiciones extra
    const perfiles = await Perfil.findAll({
        where: filtro
    });
    return perfiles;
}

module.exports = {
    getPerfiles
}
