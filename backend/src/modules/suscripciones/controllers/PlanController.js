//Manejar las solicitudes HTTP. Llama al servicio correspondiente.
const errorHandler = require('../../../utils/ErrorHandler');

const PlanService = require('../services/PlanService');

// Traer todos los planes con caracteristicas
const getAllPlanes = async (req, res) => {
    try {
        let planes = await PlanService.getAllPlanes();
        res.status(201).json(planes); //Se retorna la respuesta
    } catch (err) {
        console.log(err); 
        errorHandler.handleControllerError(res, err, "usuarios");
    }
};

module.exports = {
    getAllPlanes
}
  