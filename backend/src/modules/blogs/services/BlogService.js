/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");
const { filtrarCampos } = require("../../../utils/utils");

const { deleteMultimediaServidor } = require("../../../middleware/uploadConfig");
const sequelize = require("../../../conf/database");
const BlogRepo = require("../repositories/BlogRepository");


/* Metodos de lectura*/


// Trae todos los blogs dada una o mas id de categoria, si está vacio trae todos
const getBlogs = async (datos) => {
    try {
        /// Los datos llegan asi del query: ids=1,2,3
        const { categorias } = datos; // Traer los ids
        let idCategorias = null;
        if (datos.categorias) {
            idCategorias = categorias.split(',').map(Number); // Convierte la lista de IDs en un array de números
        }
        const filtro = filtrarCampos(datos, ["idBlog", "tituloBlog", "contenidoBlog", "fechaCreacionBlog", "idAutor"])
        let blogs = await BlogRepo.getAllBlogs(filtro, idCategorias);
        return blogs;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// Trae todos las categorias
const getCategorias = async () => {
    try {
        let categorias = await BlogRepo.getAllCategorias();
        return categorias;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/* Metodos de creacion*/
const registrarBlog = async (idUsuario, datosBlog) => {
    try {
        const fechaActual = new Date(); // Fecha actual
        datosBlog.idAutor = idUsuario;
        datosBlog.fechaCreacionBlog = fechaActual;
        let blog = await BlogRepo.insertarBlog(datosBlog);
        if (blog) {
            return "Blog " + blog.idBlog + " Creado correctamente"
        }

    } catch (error) {
        throw error;
    }
}

// Inserta una foto o video de un blog
const insertarMultimediaBlog = async (idBlog, urlMultimedia, tipoArchivo) => {
    try {
        let msg = "";
        if (tipoArchivo === 'foto') {
            msg = await BlogRepo.insertarFoto(idBlog, urlMultimedia);
        } else if (tipoArchivo === 'video') {
            msg = await BlogRepo.insertarVideo(idBlog, urlMultimedia);
        } else {
            throw new ErrorNegocio("Tipo de archivo no especificado");
        }

        return msg;
    } catch (error) {
        throw error;
    }
}

/* Metodos de actualizacion*/
const actualizarBlog = async (datosBlog) => {
    try {
        // Campos permitidos para actualizar
        const campos = ["tituloBlog", "contenidoBlog", "categorias", "fotoPrincipalBlog"];

        // Filtraar los datos permitidos
        const blogData = filtrarCampos(datosBlog, campos);

        /* Si los nuevos datos tienen la foto entonces se debe eliminar la anterior*/
        if(datosBlog.fotoPrincipalBlog){
            const blogs = await BlogRepo.getAllBlogs({idBlog: datosBlog.idBlog});
            // Eliminar la foto si la tenia
            if(blogs[0].fotoPrincipalBlog){
                await deleteMultimediaServidor("fotos", blogs[0].fotoPrincipalBlog, "blogs");
            }
        }

        // Actualizar los datos
        await BlogRepo.actualizarBlog(datosBlog.idBlog, blogData);


        return "Datos actualizados del blog " + datosBlog.idBlog;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

/* Metodos de borrado*/
const eliminarBlog = async (idBlog) => {
    try {
        // Traer el blog
        const listaBlogs = await BlogRepo.getAllBlogs({ idBlog });
        const blog = listaBlogs[0];
        // Obtener las fotos y videos
        const videos = blog.videos;
        const fotos = blog.fotos;


        // Extraer las URLs de las fotos encontradas
        const urlsFoto = fotos.flatMap(foto => foto.urlFoto);

        // URL video
        const urlsVideo = videos.flatMap(video => video.urlVideo);

        // Borrar el blog
        await BlogRepo.eliminarBlog(idBlog);

        // Si el blog tenia fotoPrincipal se elimina
        if(blog.fotoPrincipalBlog){
            await deleteMultimediaServidor("fotos", blog.fotoPrincipalBlog, "blogs")
        }

        // Eliminar fotos y videos usando las URL
        await Promise.all(
            urlsFoto.map(url => deleteMultimediaServidor("fotos", url, "blogs"))
        );
        // Borrar archivos de videos
        await Promise.all(
            urlsVideo.map(url => deleteMultimediaServidor("videos", url, "blogs"))
        );

        return "Blog eliminado";
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}


// Eliminar archivos de un blog del servidor y la BD. 
const deleteMultimediaBD = async (idMultimedia, tipoMultimedia, idBlog) => {
    const transaction = await sequelize.transaction(); // Iniciar la transacción
    try {
        // Traer informacion del video o foto
        multimedia = await getInfoMultimedia(idMultimedia, tipoMultimedia, idBlog);
        // Eliminar archivo del servidor
        const filePath = tipoMultimedia === 'foto' ? multimedia.urlFoto : multimedia.urlVideo;
        const tipo = tipoMultimedia === 'foto' ? "fotos" : "videos";
        // Borrar del servidor
        await deleteMultimediaServidor(tipo, filePath, "blogs");
        // Eliminar de la BD dentro de la transacción
        if (tipoMultimedia === 'foto') {
            await BlogRepo.eliminarFoto(idMultimedia, idBlog, transaction);
        } else {
            await BlogRepo.eliminarVideo(idMultimedia, idBlog, transaction);
        }

        await transaction.commit();

        return "Multimedia borrada";
    } catch (error) {
        transaction.rollback();
        throw error;
    }

}
// Traer info de una multimedia (video o foto)
const getInfoMultimedia = async (idMultimedia, tipo, idBlog) => {
    try {
        let multimedia;
        // Dependiendo del tipo se trae diferente informacion (videos o fotos)
        if (tipo === 'foto') {
            multimedia = await BlogRepo.getInfoFoto(idMultimedia, idBlog);
        } else if (tipo === 'video') {
            multimedia = await BlogRepo.getInfoVideo(idMultimedia, idBlog);
        } else {
            return "Tipo no especificado";
        }
        if (!multimedia || multimedia.length <= 0) {
            throw new ErrorNegocio("No se encontró multimedia con esos parametros");
        }

        // Solo se retorna el primer valor
        return multimedia[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getBlogs,
    getCategorias,
    insertarMultimediaBlog,
    registrarBlog,
    actualizarBlog,
    eliminarBlog,
    deleteMultimediaBD
}
