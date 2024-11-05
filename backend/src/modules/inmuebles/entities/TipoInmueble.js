const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');

const TipoInmueble = sequelize.define('TipoInmueble', {
  idTipoInmueble: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true, // Declara que es autoincremental
    field: 'id_tipo_inmueble'
  },
  tipoInmueble: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'tipo_inmueble'
  }
}, {
  tableName: 'tipos_inmueble',
  timestamps: false,
  freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

module.exports = TipoInmueble;