// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const Usuario = require("../entities/Usuario");
const Customer = require("../entities/Customer");
const Perfil = require("../entities/PerfilCustomer");
const sequelize = require("../../../conf/database");

/* traer todos los customers, puede incluir condiciones 
Las condiciones ya llegan con el formato de nombreCampo:valor*/
const getAllCustomers = async (condiciones) => {
    const customers = await Customer.findAll({
        attributes: {
            exclude: ['idPerfil', 'id_perfil']
        },
        include: [
            {
                model: Perfil,
                as: 'perfil'
            }
        ],
        where: condiciones
    });
    console.log(customers[0].nombreCustomer);
    return customers;

}

/*  Insertar un customer
    Los datos ya traen el id de usuario
    Una transaccion en caso de que se necesite
*/
const insertarCustomer = async (datosCustomer, transaccion) => {
    let transaccionPropia = false;
    let trans = transaccion;
    try {
        if (!transaccion) {
            trans = await sequelize.transaction(); // Iniciar la transacción
            transaccionPropia = true;
        }

        const customer = await Customer.create({
            ...datosCustomer
        }, { transaction: trans });

        if (transaccionPropia) {
            trans.commit();
        }
        return customer;
    } catch (error) {
        // Si hay un error, hacer rollback de la transacción
        if (transaccionPropia) {
            await trans.rollback();
        }
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
                'estadoCustomer'], // Campos permitidos para actualizar

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