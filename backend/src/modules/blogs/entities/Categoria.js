const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');

const Categoria = sequelize.define('Categoria', {
  idCategoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true, // Declara que es autoincremental
    field: 'id_categoria'
  },
  nombreCategoria: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'nombre_categoria'
  }
}, {
  tableName: 'categorias',
  timestamps: false,
  freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

module.exports = Categoria;