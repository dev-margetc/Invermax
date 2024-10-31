//Manejar las solicitudes HTTP. Llama al servicio correspondiente.

const interesadoService = require('../services/InteresadoService');

// Insertar un interesado
const registrarInteresado = async (req, res) => {
    try {
        const datos = req.body; //Datos del cuerpo de la solicitud
        msg = await interesadoService.registrarInteresado(datos.idInmueble, datos.interesado);
        if(!msg.error){
            res.status(201).json(msg); //Se retorna un mensaje
        }else{
            return res.status(500).json({ error: 'Error inesperado: ' + msg.message });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor: ' + err.message });
    }
};


module.exports = {
    registrarInteresado
}; 