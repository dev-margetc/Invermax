const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');

const Foto = sequelize.define('Foto', {
  idFoto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true, // Declara que es autoincremental
    field: 'id_foto'
  },
  urlFoto: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'url_foto'
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
  tableName: 'fotos',
  timestamps: false,
  freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

module.exports = Foto;