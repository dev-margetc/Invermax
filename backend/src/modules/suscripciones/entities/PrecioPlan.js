const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');

const PrecioPlan = sequelize.define('PrecioPlan', {
    idPrecioPlan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id_precio_plan'
    },
    idPlan: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Plan',
            key: 'idPlan'
        },
        allowNull: false,
        field: 'id_plan'
    },
    duracion: { // Duración en meses
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {
    tableName: 'precios_planes',
    timestamps: false
});


module.exports = PrecioPlan;
