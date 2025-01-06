// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const Blog = require("../entities/Blog");
const Categoria = require("../entities/Categoria");
const Usuario = require("../../usuarios/entities/Usuario");
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");

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
                }
            ]
        });


        return blogs;
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

        console.log(categorias);
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


module.exports = {
    insertarBlog,
    getAllBlogs,
    actualizarBlog,
    eliminarBlog
}