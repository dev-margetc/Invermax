const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');

const TipoInmueble = sequelize.define('TipoImueble', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    field: 'id_tipo_inmueble'
  },
  tipo: {
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