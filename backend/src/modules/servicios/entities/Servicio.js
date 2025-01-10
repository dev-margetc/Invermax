const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');

const Servicio = sequelize.define('Servicio', {
    idServicio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, // Declara que es autoincremental
        field: 'id_servicio'
    },
    codigoServicio: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'codigo'
    },
    nombreServicio: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nombre'
    },
    descripcionServicio: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'descripcion'
    },
    precioServicio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'precio',
    },
    fotoServicio: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'foto_servicio'
    },
}, {
    tableName: 'servicios',
    timestamps: false,
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

module.exports = Servicio;