//Manejar las solicitudes HTTP. Llama al servicio correspondiente. Este maneja las solicitudes GET

const detalleService = require('../services/DetalleService'); //Importar el servicio 
const fs = require('fs'); // Para manejar la eliminación de archivos

// Asignar una foto/video a un detalle
const insertMultimedia = async (req, res) => {
    const rutaFoto = req.file.path; // Ruta del archivo subido
    const nombreFoto = req.file.filename;
    try {
        const {tipoArchivo } = req.body;
        const {idDetalle} = req.params;
        msg = await detalleService.insertarMultimediaDetalle(idDetalle, nombreFoto, tipoArchivo);  
        return res.status(200).json({ message: msg }); // Asegúrate de enviar una respuesta aquí
    } catch (err) {

        // Elimina el archivo subido si hubo un error en la inserción
       if (fs.existsSync(rutaFoto)) {
            fs.unlink(rutaFoto, (err) => {
                if (err) {
                    console.error('Error al eliminar el archivo:', err);
                }
            });
        }

        //Enviar el mensaje de error
        res.status(500).json({ error: 'Error del servidor: ' + err.message });
    }
};

// Eliminar un detalle
const eliminarDetalle = async (req, res) => {
    try {
        const {idDetalle} = req.params;
        msg = await detalleService.deleteDetalle(idDetalle);
        if(!msg.error){
            res.status(201).json(msg); //Se retorna un mensaje
        }else{
            return res.status(500).json({ error: 'Error inesperado: ' + msg.message });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor: ' + err.message });
    }
};

// Eliminar multimedia asociada a un detalle
const eliminarMultimediaDetalle = async (req, res) => {
    try {
        let msg;

        const { idDetalle, idFoto, idVideo } = req.params;

        // Si idFoto existe el tipo es foto, si no es tipo video
        const tipo = idFoto ? 'foto' : 'video';

        // Toma el id de foto o video
        const id = idFoto || idVideo;

        msg = await detalleService.deleteMultimediaBD(id, tipo, idDetalle)

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
    insertMultimedia,
    eliminarDetalle,
    eliminarMultimediaDetalle   
}; 

