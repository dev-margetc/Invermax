const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');


const Plan = sequelize.define('Plan', {
    idPlan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, // Declara que es autoincremental
        field: 'id_plan'
    },
    tipoPlan: { // Nombre del plan
        type: DataTypes.STRING,
        allowNull: false,
        field: 'tipo_plan'
    },
    precioPlan: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field: 'precio'
    },
    duracionPlan: { //Se coloca en meses
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'duracion'
    },
    idPerfil: {
        type: DataTypes.INTEGER,
        references: {
            model: 'perfiles_customer',  // Nombre de la tabla asociada
            key: 'id_perfil' //Nombre de la clave primaria de la tabla asociada
        },
        allowNull: false,
        field: 'id_perfil' //Nombre del campo FK
    },

}, {
    tableName: 'planes',
    timestamps: false,
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
})


module.exports = Plan;