const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');

const Video = sequelize.define('Video', {
  idVideo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true, // Declara que es autoincremental
    field: 'id_video'
  },
  urlVideo: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'url_video'
  },
  idDetalleInmueble: {
    type: DataTypes.INTEGER,
    references:{
        model: 'detalles_inmuebles',  // Nombre de la tabla
        key: 'id_detalle'
    },
    allowNull: true,
    field: 'id_detalle_inmueble'
  },
  idBlog: {
    type: DataTypes.INTEGER,
    references:{
        model: 'blogs',  // Nombre de la tabla
        key: 'id_blog'
    },
    allowNull: true,
    field: 'id_blog'
  }
}, {
  tableName: 'videos',
  timestamps: false,
  freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

module.exports = Video;