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

// Traer todos los planes activos con sus caracteristicas
const getPlanesActivos = async (req, res) => {
    try {
        let condicionPlan = {};
        let condicionPrecio = {};
        condicionPlan.estadoPlan = 1;
        condicionPrecio.estadoPrecio = 1;
        let planes = await PlanService.getAllPlanes(condicionPlan, condicionPrecio);
        res.status(201).json(planes); //Se retorna la respuesta
    } catch (err) {
        console.log(err); 
        errorHandler.handleControllerError(res, err, "usuarios");
    }
};

// Validar que un precioPago coincida con un plan y que ambos tengan su estado activo
const validarPrecioPago= async (req, res) => {
    try {
        let {idPlan, idPrecioPlan} = req.params;
        let msg = await PlanService.isEstadoActivoPlanPrecio(idPlan, idPrecioPlan);
        res.status(201).json(msg); //Se retorna la respuesta
    } catch (err) {
        console.log(err); 
        errorHandler.handleControllerError(res, err, "usuarios");
    }
};
module.exports = {
    getAllPlanes,
    getPlanesActivos,
    validarPrecioPago
}
  