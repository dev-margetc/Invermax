// Intermedia que define la relación entre los tipos de inmueble y los perfiles

const sequelize = require('../../../conf/database');
const { DataTypes } = require('sequelize');

const TipoInmueblePerfil = sequelize.define('TipoInmueblePerfil', {

    idTipoInmueble: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'id_tipo_inmueble'
    },
    idPerfil: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'id_perfil'
    }
}, {

    tableName: 'tipo_inmueble_perfil',
    timestamps: false // No se tiene createdAt o updatedAt
});
module.exports = TipoInmueblePerfil;