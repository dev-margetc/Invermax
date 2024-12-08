const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');

//Estados de suscripcion
const ESTADOS = ['activa', 'inactiva', 'pendiente'];

const Suscripcion = sequelize.define('Suscripcion', {
    idSuscripcion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, // Declara que es autoincremental
        field: 'id_suscripcion'
    },
    fechaInicioSuscripcion: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'fecha_inicio'
    },
    fechaFinSuscripcion: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'fecha_fin'
    },
    estadoSuscripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [ESTADOS], //Valores permitidos
                msg: `Estado no valido. Los estados permitidos son: ${ESTADOS.join(', ')}.`
            }
        },
        field: 'estado'
    },
    idPrecioPlan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'PrecioPlan', //Nombre modelo
            key: 'idPrecioPlan', // KEY del modelo
        },
        field: 'id_precio_plan'
    },

    idCustomer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Customer', //Nombre modelo
            key: 'idCustomer', // KEY del modelo
        },
        field: 'id_customer'
    },

}, {
    tableName: 'suscripciones',
    timestamps: false,
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

module.exports = Suscripcion;

