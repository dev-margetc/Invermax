const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');

const PerfilCustomer = sequelize.define('PerfilCustomer', {
    idPerfil: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, // Declara que es autoincremental
        field: 'id_perfil'
    },
    perfil: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'perfil'
    }
}, {
    tableName: 'perfiles_customer',
    timestamps: false,
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
})


module.exports = PerfilCustomer;