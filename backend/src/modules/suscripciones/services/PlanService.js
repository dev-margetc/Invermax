/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");
const sequelize = require("../../../conf/database");

const planRepo = require("../repositories/PlanRepository");
const customerRepo = require("../../usuarios/repositories/CustomerRepository");
const { construirCondiciones } = require("../../../utils/utils");

/* Metodos GET */

// Traer todos los planes junto con sus caracteristicas. Puede agregarsele condiciones de precioPlan
const getAllPlanes = async (condiciones = null, condicionesPrecio = null) => {
    try {
        if (condiciones || condicionesPrecio) {
            return await planRepo.getAllPlanes(condiciones, condicionesPrecio);
        } else {
            return await planRepo.getAllPlanes();
        }


    } catch (err) {

        console.log(err);
        throw err;
    }
}

// Traer los planes agrupados por tipo de perfil, se puede especificar el tipo de perfil, si está vacio solo trae los activos
const getPlanesActivosTipoPerfil = async (idPerfil = null) => {
    try {
        let condicionesTipo = construirCondiciones({ idPerfil: idPerfil }); // Tipo de customer
        const planesPorTipo = await planRepo.getPlanesTipoPerfil(
            condicionesTipo,
            { estadoPlan: 1 }, // Planes activos
            { estadoPrecio: 1 } // Precios activos
        );
        return planesPorTipo;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// Verificar que un plan dado sea activo junto con su precioPlan tambien sea activo
const isEstadoActivoPlanPrecio = async (idPlan, idPrecioPlan) => {
    try {
        let precioPlan = await planRepo.isActivoPlanPrecio(idPlan, idPrecioPlan);

        if (precioPlan) {
            return "El plan y el precio seleccionado son validos";
        } else {
            return "El plan y precio seleccionados no son validos";
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// Verificar que un plan sea valido para activarsele a un usuario
const verificarPlanUsuario = async (idPlan, idPrecioPlan, idUsuario) => {
    try {

        // Traer informacion del plan
        let planes = await planRepo.getAllPlanes({ idPlan: idPlan }, { idPrecioPlan: idPrecioPlan });

        // Verificar que el plan y el precio estén activos
        await isEstadoActivoPlanPrecio(idPlan, idPrecioPlan);

        // Obtener perfil del plan
        if (!planes.length > 0) {
            throw new ErrorNegocio("Plan no encontrado.")
        }

        // Traer el customer, verificar si existe para verificar su perfil
        let customers = await customerRepo.getAllCustomers({ idUsuario });

        if (customers && customers.length > 0) {
            // Si existe se verifica el perfil y que sea igual al del plan seleccionado
            if (planes[0].perfil.idPerfil != customers[0].perfil.idPerfil) {
                throw new ErrorNegocio("El perfil actual del customer no le permite generar una suscripción a este plan");
            }
        }
        // Retornar datos del plan y precioPlan
        return planes[0];
    }
    catch (err) {
        throw err;
    }
}
module.exports = {
    getAllPlanes,
    getPlanesActivosTipoPerfil,
    verificarPlanUsuario,
    isEstadoActivoPlanPrecio
}
