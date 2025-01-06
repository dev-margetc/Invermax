// Define las relaciones entre los modelos de sequelize

const Blog = require("../entities/Blog");
const Categoria = require("../entities/Categoria");
const Usuario = require("../../usuarios/entities/Usuario");
const CategoriaBlog = require("../entities/CategoriaBlog");


/* Relaciones  blog-categoria (intermedia) */

// Una categoría puede tener varios blogs asociados
Categoria.belongsToMany(Blog, {
    through: CategoriaBlog, // Tabla intermedia
    foreignKey: 'id_categoria', // Llave en la tabla intermedia relacionada con Categoria
    otherKey: 'id_blog', // Llave en la tabla intermedia relacionada con Blog
    as: "blogs", // Alias para acceder a los blogs de una categoría
});

// Un blog puede estar asociado a varias categorías
Blog.belongsToMany(Categoria, {
    through: CategoriaBlog, // Tabla intermedia
    foreignKey: 'id_blog', // Llave en la tabla intermedia relacionada con Blog
    otherKey: 'id_categoria', // Llave en la tabla intermedia relacionada con Categoria
    as: "categorias", // Alias para acceder a las categorías de un blog
});


/* Relaciones  blog-usuario */

// Un usuario puede crear varios blogs
Usuario.hasMany(Blog, { foreignKey: 'id_autor', as: 'blogs' });

// Un blog solo tiene un autor
Blog.belongsTo(Usuario, { foreignKey: 'id_autor', as: 'autor' });