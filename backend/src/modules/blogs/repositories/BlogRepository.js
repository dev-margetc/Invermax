// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const Blog = require("../entities/Blog");
const Categoria = require("../entities/Categoria");
const Usuario = require("../../usuarios/entities/Usuario");
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");
const Foto = require("../../inmuebles/entities/Foto");
const Video = require("../../inmuebles/entities/Video");

/* Metodos de consulta*/
// Traer los blogs dadas unas condiciones, se le puede asignar uno o mas id de categoria
const getAllBlogs = async (condiciones = null, categorias = null) => {
    const filtro = { ...condiciones || {} } // Combinar condiciones extra
    try {
        const blogs = await Blog.findAll({
            where: filtro,
            include: [
                {
                    model: Categoria, // Relación con el modelo de Categoria
                    as: 'categorias', // Nombre definido en la asociación
                    // Solo aplica el filtro si categorias no es null ni vacío
                    where: categorias && categorias.length > 0 ? { id_categoria: categorias } : undefined,
                    through: { attributes: [] }, // Excluir los atributos de la tabla pivote
                },
                {
                    model: Usuario,
                    as: 'autor',
                    attributes: ["idUsuario", "emailUsuario"]
                },
                {
                    model:Foto,
                    as:'fotos',
                    attributes: ["idFoto", "urlFoto"]
                },
                {
                    model:Video,
                    as:'videos',
                    attributes: ["idVideo", "urlVideo"]
                }
            ]
        });


        return blogs;
    } catch (err) {
        throw err;
    }
}

// Traer info de un video
const getInfoVideo = async (idVideo, idBlog) => {
    try {
        const videos = await Video.findAll({
            where: {
                idBlog: idBlog,
                idVideo: idVideo
            }
        });
        return videos;
    } catch (error) {
        throw error;
    }
}

// Traer info de una foto
const getInfoFoto = async (idFoto, idBlog) => {
    try {
        const fotos = await Foto.findAll({
            where: {
                idFoto: idFoto,
                idBlog: idBlog
            }
        });
        return fotos;
    } catch (error) {
        throw error;
    }
}
// Traer las categorias
const getAllCategorias = async () => {
   try {
        const categorias = await Categoria.findAll();


        return categorias;
    } catch (err) {
        throw err;
    }
}

/* Metodos de insercion*/

//Metodos insercion
const insertarBlog = async (datos) => {
    const { categorias, ...blogDatos } = datos; // Extrae las categorías del resto de los datos

    try {
        // Crea el blog
        const blog = await Blog.create(blogDatos);

        // Si hay categorías, establece la relación en la tabla intermedia
        if (categorias && categorias.length > 0) {
            await blog.setCategorias(categorias); // alias definido en la asociación
        }

        return blog; // Devuelve el blog creado
    } catch (err) {
        console.error('Error al insertar el blog:', err);
        throw err;
    }
}
// Insertar una foto para un blog
const insertarFoto = async (idBlog, rutaFoto) => {
    try {
        await Foto.create({
            urlFoto: rutaFoto,
            idBlog: idBlog
        });
        return "Foto de blog subida correctamente";
    } catch (error) {
        console.log(error);
        await transaction.rollback(); // Revertir en caso de error
        throw error;
    }
}
// Insertar video para un blog
const insertarVideo = async (idBlog, rutaVideo) => {
    try {
        await Video.create({
            urlVideo: rutaVideo,
            idBlog: idBlog
        });
       return "Video de blog subida correctamente";
    } catch (error) {
       throw error;
    }
}
/* Metodos de actualizacion*/
const actualizarBlog = async (idBlog, datos) => {
    const { categorias, ...blogDatos } = datos; // Extrae las categorías del resto de los datos

    try {
        // Buscar el blog por su ID
        const blog = await Blog.findByPk(idBlog);
        if (!blog) {
            throw new ErrorNegocio(`Blog con ID ${idBlog} no encontrado`);
        }

        // Actualizar los datos del blog
        await blog.update(blogDatos); 

        // Gestionar las categorías en la tabla intermedia
        if (categorias) {
            if (categorias.length > 0) {
                // Actualizar las relaciones: Sobrescribe con las nuevas categorías
                await blog.setCategorias(categorias);
            } else {
                // Si el array está vacío, elimina todas las relaciones
                await blog.setCategorias([]);
            }
        }

        return blog; // Devuelve el blog actualizado
    } catch (err) {
        console.error('Error al actualizar el blog:', err);
        throw err;
    }
};


/* Metodos de borrado*/
const eliminarBlog = async (idBlog) => {
    try {
        // Buscar el blog por su ID
        const blog = await Blog.findByPk(idBlog);
        if (!blog) {
            throw new Error(`Blog con ID ${idBlog} no encontrado`);
        }

        // Eliminar el blog
        await blog.destroy();

        console.log(`Blog con ID ${idBlog} eliminado correctamente`);
        return true; // Devuelve true si se eliminó correctamente
    } catch (err) {
        console.error('Error al eliminar el blog:', err);
        throw err;
    }
};

// Eliminar una foto de la bd
const eliminarFoto = async (idFoto, idBlog, transaccion) => {
    try {
        await Foto.destroy({ where: { idBlog: idBlog, idFoto: idFoto }, transaccion });
        return "Foto eliminada correctamente.";
    } catch (error) {
        throw error;
    }
}

// Eliminar un video de la bd
const eliminarVideo = async (idVideo, idBlog, transaccion) => {
    try {
        await Video.destroy({ where: { idBlog: idBlog, idVideo: idVideo }, transaccion });
        return "Video eliminado correctamente.";
    } catch (error) {
        throw error;
    }
}


module.exports = {
    insertarBlog,
    insertarFoto,
    insertarVideo,
    getAllCategorias,
    getAllBlogs,
    getInfoVideo,
    getInfoFoto,
    actualizarBlog,
    eliminarBlog,
    eliminarFoto,
    eliminarVideo
}