const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');


const CaracteristicaPlan = sequelize.define('CaracteristicaPlan', {
    idPlan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Plan',
          key: 'idPlan',
        },
        field: 'id_plan', // Nombre en la base de datos
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
    valorCaracteristica: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'valor_caracteristica'
      },
}, {
    tableName: 'caracteristicas_planes',
    timestamps: false,
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

module.exports = CaracteristicaPlan;

