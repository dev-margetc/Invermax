const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');

const Aliado = sequelize.define('Aliado', {
    idAliado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, // Declara que es autoincremental
        field: 'id_aliado'
    },
    nombreAliado: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'nombre_aliado'
    },
    logoAliado: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'logo_aliado'
    },
    urlRedireccion: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'url_redireccion'
    }
}, {
    tableName: 'aliados',
    timestamps: false,
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

module.exports = Aliado;