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
    tiempoAcumulado: { // Tiempo acumulado que lleva desde que se activó
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'tiempo_acumulado'
    },
    codigoPeriodo: { 
        /* identifica el periodo de tiempo correspondiente a la suscripción activa 
        * en el que un inmueble es marcado como en ascenso. Se genera combinando el ID de la suscripción activa 
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

