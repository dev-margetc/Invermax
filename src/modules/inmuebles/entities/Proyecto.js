const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');

const Proyecto = sequelize.define('Proyecto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    field: 'id_proyecto'
  },
  fechaEntrega: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'nombre_ciudad'
  },
  idInmueble: {
    type: DataTypes.INTEGER,
    references:{
        model: 'inmuebles',  // Nombre de la tabla
        key: 'id_inmueble'
    },
    allowNull: false,
    field: 'id_inmueble'
  }
}, {
  tableName: 'proyectos',
  timestamps: false,
  freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

module.exports = Proyecto;