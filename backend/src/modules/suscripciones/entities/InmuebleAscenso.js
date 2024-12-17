const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');


const InmuebleAscenso = sequelize.define('InmuebleAscenso', {
    idAscenso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, // Declara que es autoincremental
        field: 'id_ascenso'
    },fechaInicio: { // Fecha en la que inició el inmueble como
        type: DataTypes.DATE,
        allowNull: true,
        field: 'fecha_inicio'
    },
    estadoAscenso:{
        type: DataTypes.TINYINT(1),
        allowNull: false,
        validate: {
            isIn: {
              args: [[0, 1]],  // Valores permitidos
              msg: "El valor de 'estado' no es correcto"
            }
          },
          field: 'estado_ascenso'
    },
    idInmueble: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Inmueble', //Nombre modelo
            key: 'idInmueble', // KEY del modelo
        },
        field: 'id_inmueble'
    }

}, {
    tableName: 'inmuebles_en_ascenso',
    timestamps: false,
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

module.exports = InmuebleAscenso;

