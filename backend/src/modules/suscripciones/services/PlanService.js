/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");
const sequelize = require("../../../conf/database");

const planRepo = require("../repositories/PlanRepository");

/* Metodos GET */

// Traer todos los planes junto con sus caracteristicas
const getAllPlanes= async (condiciones = null) =>{
    try{
        if(condiciones){
            return planRepo.getAllPlanes(condiciones);
        }else{
            return planRepo.getAllPlanes();
        }
        

    }catch(err){
        
        console.log(err);
        throw err;
    }
}
module.exports = {
    getAllPlanes
  }
  