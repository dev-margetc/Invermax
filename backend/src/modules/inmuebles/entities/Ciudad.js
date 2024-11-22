const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');

const Ciudad = sequelize.define('Ciudad', {
  codCiudad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true, // Declara que es autoincremental
    field: 'cod_ciudad'
  },
  nombreCiudad: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'nombre_ciudad'
  },
  idDepartamento: {
    type: DataTypes.INTEGER,
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