// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const Usuario = require("../entities/Usuario");
const Customer = require("../entities/Customer");

// Las condiciones ya llegan con el formato de nombreCampo:valor
const getAllCustomers = async (condiciones) => {
    const customers = Customer.findAll({
        where:condiciones
    });
    return customers;

}

module.exports = {
    getAllCustomers
}