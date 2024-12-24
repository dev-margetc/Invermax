//Manejar las solicitudes HTTP. Llama al servicio correspondiente. Este maneja las solicitudes GET
const errorHandler = require('../../../utils/ErrorHandler');
const ciudadService = require('../services/CiudadService'); //Importar el servicio

// Obtener todos los departamentos con sus ciudades
const getDepartamentosConCiudades = async (req, res) => {
    try {
        const results = await ciudadService.getDepartamentosConCiudades();
        res.status(200).json(results); //Se retornan los departamentos
    } catch (err) {
        errorHandler.handleControllerError(res, err, "inmuebles");
    }
};

// Obtener todos los departamentos con sus ciudades dado el nombre (o parte de el) de la ciudad
const getDepartamentosCiudadNombre = async (req, res) => {
    try {
        const results = await ciudadService.getDepartamentoCiudadesNombre(req.params);
        res.status(200).json(results); //Se retornan los departamentos
    } catch (err) {
        errorHandler.handleControllerError(res, err, "inmuebles");
    }
};

// Obtener todos ciudades dado el nombre (o parte de el) 
const getCiudadesNombre = async (req, res) => {
    try {
        const results = await ciudadService.getCiudadesNombre(req.params);
        res.status(200).json(results); //Se retornan los departamentos
    } catch (err) {
        errorHandler.handleControllerError(res, err, "inmuebles");
    }
};




// Obtener todos los departamentos con sus ciudades dado el id del departamento
const getCiudadesIDDepartamento = async (req, res) => {
    try {
        const results = await ciudadService.getDepartamentosID(req.params);
        res.status(200).json(results); //Se retornan los departamentos
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "inmuebles");
    }
};



module.exports = {
    getDepartamentosConCiudades,
    getCiudadesIDDepartamento,
    getDepartamentosCiudadNombre,
    getCiudadesNombre
};