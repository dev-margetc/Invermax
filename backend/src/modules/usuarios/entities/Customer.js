const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');

//Estados de customer permitidos
const ESTADOS = ['activo', 'inactivo', 'nuevo'];

const Customer = sequelize.define('Customer', {
    idCustomer: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, // Declara que es autoincremental
        field: 'id_customer'
    },
    nombreCustomer: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nombre_customer'
    },
    logoCustomer: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'logo_customer'
    },
    correoNotiCustomer: { // Campo correo de notificaciones
        type: DataTypes.STRING,
        allowNull: false,
        field: 'correo_notificaciones'
    },
    
    telefonoNotiCustomer: { // Campo correo de notificaciones
        type: DataTypes.STRING,
        allowNull: false,
        field: 'telefono_notificaciones'
    },    
    telefonoFijoCustomer: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'telefono_fijo'
    },
    codigoCustomer: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        field: 'codigo_customer'
    },
    numComercialCustomer: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'numero_comercial'
    },
    estadoCustomer: {
        type: DataTypes.STRING,
        defaultValue: 'inactivo', // Valor por defecto
        allowNull: false,
        validate: {
            isIn: {
                args: [ESTADOS],
                msg: `Estado de customer no valido. Los tipos permitidos son: ${ESTADOS.join(', ')}.`
            }
        },
        field: 'estado_customer'
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuarios',  // Nombre de la tabla asociada
            key: 'id_usuario' //Nombre de la clave primaria de la tabla asociada
        },
        allowNull: false,
        field: 'id_usuario' //Nombre del campo FK
    },
    idPerfil: {
        type: DataTypes.INTEGER,
        references: {
            model: 'perfiles_customer',  // Nombre de la tabla asociada
            key: 'id_perfil' //Nombre de la clave primaria de la tabla asociada
        },
        allowNull: false,
        field: 'id_perfil' //Nombre del campo FK
    }
}, {
    tableName: 'customers',
    timestamps: false,
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
})


module.exports = Customer;