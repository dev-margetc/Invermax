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
    estadoPlan:{
        type: DataTypes.TINYINT(1),
        allowNull: false,
        validate: {
            isIn: {
              args: [[0, 1]],  // Valores permitidos
              msg: "El valor de 'estado' no es correcto"
            }
          },
          field: 'estado_plan'
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