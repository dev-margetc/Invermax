const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');

const Departamento = sequelize.define('Departamento', {
  idDepartamento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true, // Declara que es autoincremental
    field: 'id_departamento'
  },
  nombreDepartamento: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'nombre_departamento'
  }
}, {
  tableName: 'departamentos',
  timestamps: false,
  freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

module.exports = Departamento;