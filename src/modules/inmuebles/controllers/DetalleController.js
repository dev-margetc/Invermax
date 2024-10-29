//Manejar las solicitudes HTTP. Llama al servicio correspondiente. Este maneja las solicitudes GET

const detalleService = require('../services/DetalleService'); //Importar el servicio 
const fs = require('fs'); // Para manejar la eliminación de archivos

// Asignar una foto/video a un detalle
const insertMultimedia = async (req, res) => {
    const rutaFoto = req.file.path; // Ruta del archivo subido
    try {
        const {tipoArchivo } = req.body;
        const {idDetalle} = req.params;
        msg = await detalleService.insertarMultimediaDetalle(idDetalle, rutaFoto, tipoArchivo);  
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

module.exports = {
    insertMultimedia
}; 

