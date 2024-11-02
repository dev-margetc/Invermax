//Manejar las solicitudes HTTP. Llama al servicio correspondiente.
const ZonaService = require("../services/ZonaService");

//Traer todas las zonas
const getAllZonas = async (req, res) => {
    try {
        msg = await ZonaService.getAllZonas();
        if(!msg.error){
            res.status(201).json(msg); //Se retorna un mensaje si se encuentra un error
        }else{
            return res.status(500).json({ error: 'Error inesperado: ' + msg.message });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor: ' + err.message });
    }
};

module.exports = {
    getAllZonas
}