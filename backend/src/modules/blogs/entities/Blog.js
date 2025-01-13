const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');

const Blog = sequelize.define('Blog', {
  idBlog: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true, // Declara que es autoincremental
    field: 'id_blog'
  },
  tituloBlog: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'titulo_blog'
  },
  contenidoBlog: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'contenido'
  },
  fechaCreacionBlog: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'fecha_creacion'
  },
  fotoPrincipalBlog: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'foto_principal'
  },
  idAutor: {
    type: DataTypes.INTEGER,
    references:{
        model: 'usuarios',  // Nombre de la tabla
        key: 'id_usuario' 
    },
    allowNull: false,
    field: 'id_autor'
  },
}, {
  tableName: 'blogs',
  timestamps: false,
  freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

module.exports = Blog;