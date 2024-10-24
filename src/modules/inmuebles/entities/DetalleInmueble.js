const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');

//opciones de parqueaderos permitidos
const PARQUEADEROS = ['si, carros', 'si, motos', 'no'];

const DetalleInmueble = sequelize.define('DetalleInmueble', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    field: 'id_detalle'
  },
  valor: {
    type: DataTypes.DECIMAL(12,2),
    allowNull: false,
    field: 'valor_inmueble'
  },
  
  area: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'area'
  },
  frameRecorrido: {
    type: DataTypes.DECIMAL(12,2),
    allowNull: false,
    field: 'iframe_recorrido'
  },
  
  cantidadHabitaciones: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'cantidad_habitaciones'
  },
    
  cantidadBaños: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'cantidad_baños'
  },
  parqueadero: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
        isIn:{
          args:[PARQUEADEROS],
          msg: `Valor no valido. Las opciones permitidas son: ${PARQUEADEROS.join(', ')}.`
        }
      },
    field: 'cantidad_habitaciones'
  },
  idInmueble: {
    type: DataTypes.INTEGER,
    references:{
        model: 'inmuebles',  // Nombre de la tabla
        key: 'id_inmueble'
    },
    allowNull: false,
    field: 'id_inmueble'
  },
  idProyecto: {
    type: DataTypes.INTEGER,
    references:{
        model: 'proyectos',  // Nombre de la tabla
        key: 'id_proyecto'
    },
    allowNull: true,
    field: 'id_proyecto'
  }
}, {
  tableName: 'detalles_inmuebles',
  timestamps: false,
  freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

module.exports = DetalleInmueble;