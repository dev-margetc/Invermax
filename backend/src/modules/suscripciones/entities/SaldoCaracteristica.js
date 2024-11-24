// Permite saber cuanto de una caracteristica le queda a una suscripción. 
//Util principalmente para aquellas caracteristicas que el usuario puede activar y desactivar
const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');

const SaldoCaracteristica = sequelize.define('SaldoCaracteristica', {
    idSuscripcion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Suscripcion',
          key: 'idSuscripcion',
        },
        field: 'id_suscripcion', // Nombre en la base de datos
      },
    idCaracteristica: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Caracteristica', //Nombre modelo
          key: 'idCaracteristica', // KEY del modelo
        },
        field: 'id_caracteristica'
      },
    capacidadDisponible: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
        field: 'capacidad_disponible'
      },
}, {
    tableName: 'saldos_caracteristicas',
    timestamps: false,
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

module.exports = SaldoCaracteristica;

