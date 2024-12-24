// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const sequelize = require("../../../conf/database");

const Caracteristica = require("../entities/Caracteristica");
const Plan = require("../entities/Plan");
const PrecioPlan = require("../entities/PrecioPlan");
const CaracteristicaPlan = require("../entities/CaracteristicaPlan");
const SaldoCaracteristica = require("../entities/SaldoCaracteristica");
const Suscripcion = require("../entities/Suscripcion");


/* Metodos consulta*/

/*  Trae una caracteristica asociada a una suscripcion activa junto con su capacidad disponible
    Recibe el idCustomer para buscar su suscripcion activa y la clave de la caracteristica
*/
const obtenerCaracteristicaDisponible = async (idCustomer, claveCaracteristica) => {
    try {
        // Consulta única para evitar multiples accesos a la BD
        const resultado = await Suscripcion.findOne({
            attributes: ['idSuscripcion'],
            where: {
                idCustomer: idCustomer,
                estado: 'activa', // Traer suscripcion activa del customer
            },
            include: [
                {
                    model: SaldoCaracteristica,
                    as: "saldosCaracteristicas",
                    include: [
                        {
                            model: Caracteristica,
                            as: "caracteristica",
                            where: {
                                clave: claveCaracteristica,
                            },
                            attributes: ['idCaracteristica', 'nombreCaracteristica'], // Datos de la característica
                        },
                    ],
                    attributes: ['capacidadDisponible'], // Datos del saldo de la característica
                },
            ],
        });
        return resultado;
    } catch (error) {
        console.error('Error al obtener la característica disponible:', error.message);
        throw error;
    }
};
/*  Trae una caracteristica asociada a un id de plan junto con su capacidad disponible
    Recibe el idPlan para buscar su suscripcion y la clave de la caracteristica
*/
const obtenerCaracteristicaPlan = async (idPlan, claveCaracteristica) => {
    try {
        // Consulta única para evitar multiples accesos a la BD
        const resultado = await Plan.findOne({
            attributes: ['idPlan'],
            where: {
                idPlan: idPlan,
            },
            include: [
                {
                    model: CaracteristicaPlan, // Relacion con el modelo de caracteristicaPlan
                    as: 'caracteristicasPlanes', // Nombre definido en la asociacion
                    attributes: {
                        include: ['valor_caracteristica']
                    },
                    include: [
                        {
                            model: Caracteristica, // Relacion entre CaracteristicaPlan y Caracteristica
                            as: 'caracteristica', // Nombre definido en la asociacion,
                            where: {
                                clave: claveCaracteristica
                            }
                        }
                    ]
                }
            ]
        });

        return resultado;
    } catch (error) {
        console.error('Error al obtener la característica disponible:', error.message);
        throw error;
    }
};

// Obtener una caracteristica dadas condiciones
const obtenerCaracteristica = async (condiciones=null) => {
    try {
        const filtro = { ...condiciones || {} } // Combinar condiciones extra
        const caracteristicas = await Caracteristica.findAll(
            {
                where: filtro
            }
        );
        return caracteristicas;
    } catch (error) {
        console.error('Error al obtener la característica disponible:', error.message);
        throw error;
    }
};

module.exports = {
    obtenerCaracteristicaDisponible,
    obtenerCaracteristicaPlan,
    obtenerCaracteristica
}

