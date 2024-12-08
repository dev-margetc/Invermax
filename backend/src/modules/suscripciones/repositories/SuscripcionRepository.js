// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const sequelize = require("../../../conf/database");

const Suscripcion = require("../entities/Suscripcion");
const SaldoCaracteristica = require("../entities/SaldoCaracteristica");
const Plan = require("../entities/Plan");
const PrecioPlan = require("../entities/PrecioPlan");
const Caracteristica = require("../entities/Caracteristica");


/* Metodos de consulta */

// Traer suscripciones dado unas condiciones ordenadas por fechaFin
const getSuscripcionesFechaFin = async (condiciones = null) => {
    const filtro = { ...condiciones || {} } // Combinar condiciones extra
    const suscripciones = Suscripcion.findAll({
        where: filtro,
        order: [['fechaFinSuscripcion', 'DESC']],
    });

    return suscripciones;
}


// Traer suscripciones dado unas condiciones junto con el plan
const getSuscripcionesPlan = async (condiciones = null) => {
    const filtro = { ...condiciones || {} } // Combinar condiciones extra
    const suscripciones = await Suscripcion.findAll({
        attributes: {
            exclude: ['idPrecioPlan', 'id_precio_plan', 'idCustomer', 'id_customer']
        },
        include: [
            {
                model: PrecioPlan,
                attributes: {
                    exclude: ['idPlan', 'id_plan', 'idCustomer', 'id_customer']
                },
                as: "precioPlan",
                include:[
                    {
                        model: Plan,
                        as: "plan"
                    }
                ]
            },
            {
                model: SaldoCaracteristica,
                as: "saldosCaracteristicas",
                attributes: [
                    'capacidadDisponible', 'idCaracteristica'
                ],
                include: [
                    {
                        model: Caracteristica,
                        as: "caracteristica"
                    }
                ]
            }],
        where: filtro,
    });
    return suscripciones;
}


// Traer las suscripciones unicamente dado unas caracteristicas
const getSuscripciones = async (condiciones = null) => {
    const filtro = { ...condiciones || {} } // Combinar condiciones extra
    const suscripciones = await Suscripcion.findAll(
        {
            where: filtro
        }
    );
    return suscripciones;
}


/* Metodos creación */

// Crear una suscripcion y los saldos del plan
const crearSuscripcion = async (datosSuscripcion, datosCaracteristicas) => {
    const transaction = await sequelize.transaction(); // Iniciar la transacción
    try {
        // Crear la suscripcion
        const suscripcion = await Suscripcion.create({
            ...datosSuscripcion
        }, { transaction });

        // Ahora crear el registro en saldos caracteristica

        //Se toma el ID de la suscripcion creada
        const idSuscripcion = suscripcion.idSuscripcion;
        // Se traen los datos de las caracteristicas para crear los saldos
        for (const caracteristicaPlan of datosCaracteristicas) {
            let data = caracteristicaPlan.dataValues;
            let idCaracteristica = data.caracteristica.dataValues.idCaracteristica;
            let saldo = data.valorCaracteristica;

            const datosSaldo = {};
            datosSaldo.idCaracteristica = idCaracteristica;
            datosSaldo.capacidadDisponible = saldo;
            datosSaldo.idSuscripcion = idSuscripcion;
            await SaldoCaracteristica.create({ ...datosSaldo }, { transaction });
        };
        await transaction.commit();

        return true;
    } catch (err) {
        await transaction.rollback();
        console.log(err);
        throw err;
    }

}

/**  
 * Metodos actualización
 */
/**
 * Actualizar suscripciones dadas unas condiciones, con una transacción opcional.
 * @param {Object} datos - Datos a actualizar.
 * @param {Object} condiciones - Condiciones para la actualización.
 * @param {Object} [transaccion=null] - Transacción opcional.
 */
const updateSuscripciones = async (datos, condiciones = null, transaccion = null) => {
    try {
        const filtro = { ...condiciones || {} } // Combinar condiciones extra

        if (transaccion) {
            // Si se proporciona transacción
            await Suscripcion.update(datos, {
                where: filtro,
                transaction: transaccion,
            });
        } else {
            // Si no se proporciona, ejecuta sin transacción
            await Suscripcion.update(datos, {
                where: filtro,
            });
        }

    } catch (err) {
        throw err;
    }

}
module.exports = {
    getSuscripcionesFechaFin,
    getSuscripcionesPlan,
    getSuscripciones,
    crearSuscripcion,
    updateSuscripciones
}