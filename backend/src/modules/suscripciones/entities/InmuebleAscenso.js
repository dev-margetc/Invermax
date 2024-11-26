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
        allowNull: false,
        field: 'fecha_inicio'
    },
    estado_destacado:{
        type: DataTypes.TINYINT(1),
        allowNull: false,
        validate: {
            isIn: {
              args: [[0, 1]],  // Valores permitidos
              msg: "El valor de 'estado' no es correcto"
            }
          },
    },
    idInmueble: {
        type: DataTypes.INTEGER,
        allowNull: false,
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

