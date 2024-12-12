/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");
const sequelize = require("../../../conf/database");

const planRepo = require("../repositories/PlanRepository");

/* Metodos GET */

// Traer todos los planes junto con sus caracteristicas. Puede agregarsele condiciones de precioPlan
const getAllPlanes= async (condiciones = null, condicionesPrecio = null) =>{
    try{
        if(condiciones|| condicionesPrecio){
            return await planRepo.getAllPlanes(condiciones, condicionesPrecio);
        }else{
            return await planRepo.getAllPlanes();
        }
        

    }catch(err){
        
        console.log(err);
        throw err;
    }
}

// Verificar que un plan dado sea activo junto con su precioPlan tambien sea activo
const isEstadoActivoPlanPrecio = async (idPlan, idPrecioPlan) =>{
    try{
        let precioPlan = await planRepo.isActivoPlanPrecio(idPlan, idPrecioPlan);

        if(precioPlan){
            return "El plan y el precio seleccionado son validos";
        }else{
            return "El plan y precio seleccionados no son validos";
        }
    }catch(err){
        console.log(err);
        throw err;
    }
}
module.exports = {
    getAllPlanes,
    isEstadoActivoPlanPrecio
  }
  