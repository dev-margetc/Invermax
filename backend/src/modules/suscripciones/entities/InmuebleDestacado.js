const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');


const InmuebleDestacado = sequelize.define('InmuebleDestacado', {
    idDestacado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, // Declara que es autoincremental
        field: 'id_destacado'
    },
    fechaInicio: { // Fecha en la que inició el inmueble como destacado
        type: DataTypes.DATE,
        allowNull: true,
        field: 'fecha_inicio'
    },
    estadoDestacado: { // Si actualmente está como destacado activo o inactivo
        type: DataTypes.TINYINT(1),
        allowNull: false,
        validate: {
            isIn: {
                args: [[0, 1]],  // Valores permitidos (0 inactivo, 1 activo)
                msg: "El valor de 'estado' no es correcto"
            }
        },
        field: 'estado_destacado'
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
    tableName: 'inmuebles_destacados',
    timestamps: false,
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

module.exports = InmuebleDestacado;

