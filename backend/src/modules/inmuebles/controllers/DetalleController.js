//Manejar las solicitudes HTTP. Llama al servicio correspondiente. Este maneja las solicitudes GET
const errorHandler = require('../../../utils/ErrorHandler');
const detalleService = require('../services/DetalleService');
const CustomerService = require('../../usuarios/services/CustomerService');
const FiltrosInmuebleService = require('../services/FiltrosInmuebleService');
const fs = require('fs'); // Para manejar la eliminación de archivos

const ErrorNegocio = require('../../../utils/errores/ErrorNegocio');
const { deleteMultimediaServidor } = require('../../../middleware/uploadConfig');
const { traerToken } = require('../../../conf/firebaseAuth');

// Asignar una foto/video a un detalle
const insertMultimedia = async (req, res) => {

    const token = await traerToken(req);

    // Verifica si se subieron archivos
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: { message: "No se subió ningún archivo." } });
    }

    try {
        const { idDetalle } = req.params;
        /* Verificar que el customer dueño sea el mismo que inició sesion
          Si el usuario es admin se permite el ver los datos*/
        const idCustomer = await FiltrosInmuebleService.traerCustomerInmueble(idDetalle, null);

        if (token.tipoUsuario !== "admin" && !(await CustomerService.coincideIdUsuario(token.idUsuario, idCustomer))) {
            throw new ErrorNegocio("No tiene permisos o el id del usuario que inició sesión no coincide con el solicitado.");
        }


        // Almacenar información de los archivos procesados
        const archivosProcesados = [];

        for (const file of req.files) {
            const nombreArchivo = file.filename;
            const tipoArchivo = file.tipoArchivo;

            try {
                // Inserta la información de cada archivo en la base de datos
                const msg = await detalleService.insertarMultimediaDetalle(idDetalle, nombreArchivo, tipoArchivo, idCustomer);
                archivosProcesados.push({ nombreArchivo, msg });
            } catch (error) {
                // Si ocurre un error, elimina el archivo del servidor
                let folder = tipoArchivo === "video" ? "videos" : "fotos";
                deleteMultimediaServidor(folder, file.filename, "inmuebles");
                throw error; // Propaga el error para manejarlo fuera del bucle
            }
        }
        //s detalles de los archivos procesados
    return res.status(200).json({ message: "Archivos subidos exitosamente.", archivosProcesados });


    } catch (err) {
        //Enviar el mensaje de error
        errorHandler.handleControllerError(res, err, "inmuebles");
    }
};

// Eliminar un detalle
const eliminarDetalle = async (req, res) => {
    try {
        const token = await traerToken(req);
        const { idDetalle } = req.params;
        /* Verificar que el customer dueño sea el mismo que inició sesion
          Si el usuario es admin se permite el ver los datos*/
        const idCustomer = await FiltrosInmuebleService.traerCustomerInmueble(idDetalle, null);
        if (token.tipoUsuario == "admin" || await CustomerService.coincideIdUsuario(token.idUsuario, idCustomer)) {
            msg = await detalleService.deleteDetalle(idDetalle);
            res.status(201).json(msg); //Se retorna un mensaje
        } else {
            throw new ErrorNegocio("No tiene permisos o el id del usuario que inició sesion no coincide con el solicitado.")
        }
    } catch (err) {
        errorHandler.handleControllerError(res, err, "inmuebles");
    }
};

// Eliminar multimedia asociada a un detalle
const eliminarMultimediaDetalle = async (req, res) => {
    try {
        let msg;
        const token = await traerToken(req);
        const { idDetalle, idFoto, idVideo } = req.params;

        // Si idFoto existe el tipo es foto, si no es tipo video
        const tipo = idFoto ? 'foto' : 'video';

        // Toma el id de foto o video
        const id = idFoto || idVideo;
        /* Verificar que el customer dueño sea el mismo que inició sesion
          Si el usuario es admin se permite el ver los datos*/
        const idCustomer = await FiltrosInmuebleService.traerCustomerInmueble(idDetalle, null);
        if (token.tipoUsuario == "admin" || await CustomerService.coincideIdUsuario(token.idUsuario, idCustomer)) {
            let msg = await detalleService.deleteMultimediaBD(id, tipo, idDetalle);

            res.status(201).json(msg); //Se retorna un mensaje
        } else {
            throw new ErrorNegocio("No tiene permisos o el id del usuario que inició sesion no coincide con el solicitado.")
        }

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

