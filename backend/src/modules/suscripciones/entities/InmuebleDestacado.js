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
    tiempoAcumulado: { // Tiempo acumulado que lleva desde que se activó
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'tiempo_acumulado'
    },
    codigoPeriodo: { 
        /* identifica el periodo de tiempo correspondiente a la suscripción activa 
        * en el que un inmueble es marcado como destacado. Se genera combinando el ID de la suscripción activa 
        * y el número de mes transcurrido desde su inicio. 
        * Ejemplo:
        * - Si el ID de la suscripción es 4 y el usuario se encuentra en su primer mes desde el inicio de la suscripción,
        *   el codigoPeriodo será "4-1".
        * - Al pasar al siguiente mes de la suscripcion, el codigoPeriodo será "4-2".*/
        type: DataTypes.STRING,
        allowNull: false,
        field: 'codigo_periodo'
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

