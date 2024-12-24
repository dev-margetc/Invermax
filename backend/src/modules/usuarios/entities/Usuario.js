const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');


//Tipos de usuarios permitidos
const TIPOSUSUARIO = ['usuario', 'customer', 'admin'];

const Usuario = sequelize.define('Usuario', {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, // Declara que es autoincremental
        field: 'id_usuario'
    },
    emailUsuario: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'email'
    },
    tipoUsuario: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [TIPOSUSUARIO],
                msg: `Tipo de usuario no valido. Los tipos permitidos son: ${TIPOSUSUARIO.join(', ')}.`
            }
        },
        field: 'tipo_usuario'
    },
    uidFirebase:{
        type: DataTypes.STRING,
        allowNull: true,
        unique:true,
        field:'UID_firebase'
    }

}, {
    tableName: 'usuarios',
    timestamps: false,
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
})


module.exports = Usuario;