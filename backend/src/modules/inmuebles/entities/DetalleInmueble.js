const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');

//opciones de parqueaderos permitidos
const PARQUEADEROS = ['si, carros', 'si, motos', 'no'];

const DetalleInmueble = sequelize.define('DetalleInmueble', {
  idDetalle: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true, // Declara que es autoincremental
    field: 'id_detalle'
  },
  valorInmueble: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    field: 'valor_inmueble'
  },

  area: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'area'
  },
  frameRecorrido: {
    type: DataTypes.DECIMAL(12, 2),
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
    validate: {
      isIn: {
        args: [PARQUEADEROS],
        msg: `Valor no valido. Las opciones permitidas son: ${PARQUEADEROS.join(', ')}.`
      }
    },
    field: 'parqueadero'
  },
  amoblado: { //amoblado: 0- No, 1-si
    type: DataTypes.TINYINT(1),
    allowNull: false,
    validate: {
      isIn: {
        args: [[0, 1]],  // Valores permitidos
        msg: "El valor de 'amoblado' no es correcto"
      }
    },
    field: 'amoblado'
  },
  idInmueble: {
    type: DataTypes.INTEGER,
    references: {
      model: 'inmuebles',  // Nombre de la tabla
      key: 'id_inmueble'
    },
    allowNull: false,
    field: 'id_inmueble'
  },
  idProyecto: {
    type: DataTypes.INTEGER,
    references: {
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