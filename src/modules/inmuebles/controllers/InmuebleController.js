//Manejar las solicitudes HTTP. Llama al servicio correspondiente. Este maneja las solicitudes GET

const inmuebleService = require('../services/InmuebleService'); //Importar el servicio 

// Insertar un inmueble
const insertInmueble = async (req, res) => {
    try {
        const datosInmuebles = req.body; //Datos del cuerpo de la solicitud
        msg = await inmuebleService.insertarInmueble(datosInmuebles);
        if(!msg.error){
            res.status(201).json(msg); //Se retorna un mensaje
        }else{
            switch (msg.type) {
                case 'VALIDATION_ERROR':
                    return res.status(422).json({ error: 'Error de validación: ' + msg.message });
                default:
                    return res.status(500).json({ error: 'Error inesperado: ' + msg.message });
            }   
        }
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor: ' + err.message });
    }
};


module.exports = {
    insertInmueble
}; 