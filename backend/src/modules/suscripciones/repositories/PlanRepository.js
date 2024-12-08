// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const sequelize = require("../../../conf/database");

const Plan = require("../entities/Plan");
const Caracteristica = require("../entities/Caracteristica");
const PrecioPlan = require("../entities/PrecioPlan");
const Perfil = require("../../usuarios/entities/PerfilCustomer");
const CaracteristicaPlan = require("../entities/CaracteristicaPlan");

const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");

const getAllPlanes = async (condiciones = null) => {
    const filtro = { ...condiciones || {} } // Combinar condiciones extra
    try {

        const planes = Plan.findAll({
            where: filtro,
            include: [
                {
                    model: CaracteristicaPlan, // Relacion con el modelo de caracteristicaPlan
                    as: 'caracteristicasPlanes', // Nombre definido en la asociacion
                    attributes: {
                        exclude: ['idPlan', 'id_plan', 'idCaracteristica', 'id_caracteristica']
                    },
                    include: [
                        {
                            model: Caracteristica, // Relacion entre CaracteristicaPlan y Caracteristica
                            as: 'caracteristica' // Nombre definido en la asociacion
                        }
                    ]
                },
                {
                    model: Perfil,
                    as: 'perfil'
                },
                {
                    model: PrecioPlan,
                    as: 'precios',
                    attributes: {
                        exclude: ['idPlan', 'id_plan']
                    },
                }
            ]
        });

        return planes;
    } catch (err) {
        throw err;
    }
}

// Verificar que el id de un precioPlan si corresponda
const verificarPrecioPlan= async (idPlan, idPrecioPlan) =>{
    console.log(idPlan);
    try{
        let precioPlanCorrespondiente = await PrecioPlan.findOne({
            where:{
                idPlan: idPlan,
                idPrecioPlan: idPrecioPlan
            }
        });
        if (!precioPlanCorrespondiente) {
            throw new ErrorNegocio('No existe una asociación entre este pago y este plan.');
        }
    }catch(err){
        throw err;
    }
}

module.exports = {
    getAllPlanes,
    verificarPrecioPlan
}
