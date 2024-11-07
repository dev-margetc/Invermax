//Manejar las solicitudes HTTP. Llama al servicio correspondiente. Este maneja las solicitudes GET
const errorHandler = require('../../../utils/ErrorHandler');
const detalleService = require('../services/DetalleService'); //Importar el servicio 
const fs = require('fs'); // Para manejar la eliminación de archivos
const { deleteMultimediaServidor } = require('../../../middleware/uploadConfig');

// Asignar una foto/video a un detalle
const insertMultimedia = async (req, res) => {
    let rutaFoto = null;
    let nombreFoto = null;
    let tipoArchivo = null;
    // Verifica si se subió un archivo
    if (req.file) {
        rutaFoto = req.file.path; // Ruta del archivo subido
        nombreFoto = req.file.filename;
        tipoArchivo = req.file.tipoArchivo; // Propiedad agregada en la configuracion de subida
    } else {
        return res.status(400).json({ error: { message: "No se subió ningún archivo." } });
    }

    try {
        const { idDetalle } = req.params;

        msg = await detalleService.insertarMultimediaDetalle(idDetalle, nombreFoto, tipoArchivo);
        return res.status(200).json({ message: msg }); // Asegúrate de enviar una respuesta aquí
    } catch (err) {
        // Elimina el archivo subido si hubo un error en la inserción
        if (rutaFoto) {
            let folder = "fotos";
            if (tipoArchivo == "video") {
                folder = "videos";
            }
            deleteMultimediaServidor(folder, nombreFoto, "inmuebles");
        }

        //Enviar el mensaje de error
        errorHandler.handleControllerError(res, err, "inmuebles");
    }
};

// Eliminar un detalle
const eliminarDetalle = async (req, res) => {
    try {
        const { idDetalle } = req.params;
        msg = await detalleService.deleteDetalle(idDetalle);
        res.status(201).json(msg); //Se retorna un mensaje
    } catch (err) {
        errorHandler.handleControllerError(res, err, "inmuebles");
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

        msg = await detalleService.deleteMultimediaBD(id, tipo, idDetalle);

        res.status(201).json(msg); //Se retorna un mensaje

    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "inmuebles");
    }
};


module.exports = {
    insertMultimedia,
    eliminarDetalle,
    eliminarMultimediaDetalle
};

