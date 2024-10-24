const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');

const Ciudad = sequelize.define('Ciudad', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    field: 'cod_ciudad'
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'nombre_ciudad'
  },
  idDepartamento: {
    type: DataTypes.STRING,
    references:{
        model: 'departamentos',  // Nombre de la tabla
        key: 'id_departamento'
    },
    allowNull: false,
    field: 'id_departamento'
  }
}, {
  tableName: 'ciudades',
  timestamps: false,
  freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

module.exports = Ciudad;