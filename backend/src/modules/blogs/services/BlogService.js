/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");
const { construirCondiciones, filtrarCampos } = require("../../../utils/utils");


const BlogRepo = require("../repositories/BlogRepository");


/* Metodos de lectura*/


// Trae todos los blogs dada una o mas id de categoria, si está vacio trae todos
const getBlogs = async (datos) => {
    try {
        /// Los datos llegan asi del query: ids=1,2,3
        const { categorias } = datos; // Traer los ids
        let cond = construirCondiciones(datos); // Construir las condiciones extra
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



/* Metodos de actualizacion*/
const actualizarBlog = async (datosBlog) => {
    try {
        // Campos permitidos para actualizar
        const campos = ["tituloBlog", "contenidoBlog", "categorias"];

        // Filtraar los datos permitidos
        const blogData = filtrarCampos(datosBlog, campos);

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
        await BlogRepo.eliminarBlog(idBlog);

        return "Blog eliminado  ";
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    getBlogs,
    registrarBlog,
    actualizarBlog,
    eliminarBlog
}
