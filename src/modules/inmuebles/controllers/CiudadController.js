//Manejar las solicitudes HTTP. Llama al servicio correspondiente. Este maneja las solicitudes GET

const ciudadService = require('../services/CiudadService'); //Importar el servicio

// Obtener todos los departamentos con sus ciudades
const getDepartamentosConCiudades = async (req, res) => {
    try {
        const results = await ciudadService.getDepartamentosConCiudades();
        res.status(200).json(results); //Se retornan los departamentos
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};


module.exports = {
    getDepartamentosConCiudades
};