//Manejar las solicitudes HTTP. Llama al servicio correspondiente. Este maneja las solicitudes GET
const errorHandler = require('../../../utils/ErrorHandler');
const BlogService = require('../services/BlogService'); //Importar el servicio  

const { traerToken } = require('../../../conf/firebaseAuth');

const { deleteMultimediaServidor } = require('../../../middleware/uploadConfig');

/* Metodos de lectura*/


// Trae todos los blogs dada una o mas id de categoria, si está vacio trae todos
const getBlogs = async (req, res) => {
    try {
        const results = await BlogService.getBlogs(req.query);
        res.status(200).json(results); //Se retornan los departamentos
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "blogs");
    }
}

// Trae todos las categorias de blogs
const getCategorias = async (req, res) => {
    try {
        const results = await BlogService.getCategorias();
        res.status(200).json(results); //Se retornan los departamentos
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "blogs");
    }
}

/* Metodos de creacion*/
const registrarBlog = async (req, res) => {
    try {
        const token = await traerToken(req);
        const datos = {};

        datos.idUsuario = token.idUsuario;

        msg = await BlogService.registrarBlog(token.idUsuario, req.body);
        res.status(201).json(msg); //Se retorna un mensaje
    } catch (error) {
        console.log(error);
        errorHandler.handleControllerError(res, error, "blogs");
    }
}

const subirMultimediaBlog = async (req, res) => {
    // Verifica si se subió uno o mas archivos
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: { message: "No se subió ningún archivo." } });
    }

    try {
        const { idBlog } = req.params;

        // Almacenar información de los archivos procesados
        const archivosProcesados = [];

        for (const file of req.files) {
            const nombreArchivo = file.filename;
            const tipoArchivo = file.tipoArchivo;

            try {
                // Insertar la información de cada archivo en la base de datos
                const msg = await BlogService.insertarMultimediaBlog(idBlog, nombreArchivo, tipoArchivo);
                archivosProcesados.push({ nombreArchivo, msg });
            } catch (error) {
                // Si ocurre un error, elimina el archivo del servidor
                let folder = tipoArchivo === "video" ? "videos" : "fotos";
                deleteMultimediaServidor(folder, file.filename, "blogs");
                throw error; // Propaga el error para manejarlo fuera del bucle
            }
        }

        // Detalles de los archivos procesados
        return res.status(200).json({ message: "Archivos subidos exitosamente.", archivosProcesados });


    } catch (err) {
        errorHandler.handleControllerError(res, err, "inmuebles");
    }
}




/* Metodos de actualizacion*/
const actualizarBlog = async (req, res) => {
    try {
        const { idBlog } = req.params;
        // Verifica si se subió uno o mas archivos
        if (req.files && req.files.length > 0) {
           // Asignar el nombre
           req.body.fotoPrincipalBlog = req.files[0].filename;
        }

        req.body.idBlog = idBlog;
        msg = await BlogService.actualizarBlog(req.body);
        res.status(201).json(msg); //Se retorna un mensaje
    }
    catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "blogs");
    }
}

/* Metodos de borrado*/
const eliminarBlog = async (req, res) => {
    try {
        const { idBlog } = req.params;
        msg = await BlogService.eliminarBlog(idBlog);
        res.status(201).json(msg); //Se retorna un mensaje si se encuentra un error
    }
    catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "blogs");
    }
}

// Eliminar multimedia asociada a un blog
const eliminarMultimediaBlog = async (req, res) => {
    try {
        const { idBlog, idFoto, idVideo } = req.params;

        // Si idFoto existe el tipo es foto, si no es tipo video
        const tipo = idFoto ? 'foto' : 'video';

        // Toma el id de foto o video
        const id = idFoto || idVideo;

        let msg = await BlogService.deleteMultimediaBD(id, tipo, idBlog);
        res.status(201).json(msg); //Se retorna un mensaje si se encuentra un error
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "inmuebles");
    }
};

module.exports = {
    getBlogs,
    getCategorias,
    subirMultimediaBlog,
    registrarBlog,
    actualizarBlog,
    eliminarBlog,
    eliminarMultimediaBlog
}
