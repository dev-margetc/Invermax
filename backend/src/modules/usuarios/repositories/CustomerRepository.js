// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const Usuario = require("../entities/Usuario");
const Customer = require("../entities/Customer");
const sequelize = require("../../../conf/database");


/* traer todos los customers, puede incluir condiciones 
Las condiciones ya llegan con el formato de nombreCampo:valor*/
const getAllCustomers = async (condiciones) => {
    const customers = Customer.findAll({
        where: condiciones
    });
    return customers;

}

/*  Insertar un customer
    Los datos ya traen el id de usuario
    Una transaccion en caso de que se necesite
*/
const insertarCustomer = async (datosCustomer, transaccion) => {
    try {
        if (!transaccion) {
            transaccion = await sequelize.transaction(); // Iniciar la transacción
        }

        const customer = await Customer.create({
            ...datosCustomer
        }, { transaction: transaccion });
        return customer;
    } catch (error) {
        throw error;
    }
}

// Actualizar los datos de un customer
const actualizarCustomer = async (datosCustomer, idCustomer, transaction = null) => {
    try {
        await Customer.update(datosCustomer, {
            where: { idCustomer },
            fields: ['nombreCustomer', 'logoCustomer', 'correoNotiCustomer', 'telefonoNotiCustomer',
                'telefonoFijoCustomer', 'codigoCustomer', 'perfilCustomer', 'numComercialCustomer',
                'estadoPublicacion'], // Campos permitidos para actualizar

            transaction: transaction // Si no se pasa, será null y no se usará
        });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllCustomers,
    insertarCustomer,
    actualizarCustomer
}