const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');

//Tipos de zona permitidas
const TIPOS = ['zona de interés', 'zona común'];

const Zona = sequelize.define('Zona', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    field: 'id_zona'
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'nombre'
  },
  icono: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'icono'
  },
  tipoZona: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      isIn:{
        args:[TIPOS],
        msg: `Tipo no valido. Los tipos permitidos son: ${TIPOS.join(', ')}.`
      }
    },
    field: 'tipo_zona'
  }
}, {
  tableName: 'zonas',
  timestamps: false,
  freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

module.exports = Zona;