const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');

//Tipos de zona permitidas
const TIPOS = ['zona de interés', 'zona común'];

const Zona = sequelize.define('Zona', {
  idZona: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true, // Declara que es autoincremental
    field: 'id_zona'
  },
  nombreZona: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'nombre'
  },
  iconoZona: {
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