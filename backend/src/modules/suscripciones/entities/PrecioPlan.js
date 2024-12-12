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
        allowNull: true
    },
    estadoPrecio:{
        type: DataTypes.TINYINT(1),
        allowNull: false,
        validate: {
            isIn: {
              args: [[0, 1]],  // Valores permitidos
              msg: "El valor de 'estado' no es correcto"
            }
          },
          field: 'estado_precio'
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'precios_planes',
    timestamps: false
});


module.exports = PrecioPlan;
