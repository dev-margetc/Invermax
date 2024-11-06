const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');


//Tipos de customer permitidos
const PERFILES = ['constructora', 'inmobiliaria', 'agente inmobiliario', 'propietario'];

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
        allowNull: false,
        field: 'logo_customer'
    },
    correoNotificacionCustomer: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'correo_notificaciones'
    },
    
    telefonoNotificacionCustomer: {
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
        allowNull: false,
        unique: true,
        field: 'codigo_customer'
    },
    perfilCustomer: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [PERFILES],
                msg: `Tipo de customer no valido. Los tipos permitidos son: ${PERFILES.join(', ')}.`
            }
        },
        field: 'perfil'
    },
    numeroComercialCustomer: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'numero_comercial'
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuarios',  // Nombre de la tabla asociada
            key: 'id_usuario' //Nombre de la clave primaria de la tabla asociada
        },
        allowNull: false,
        field: 'id_usuario' //Nombre del campo FK
    }
}, {
    tableName: 'customers',
    timestamps: false,
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
})


module.exports = Customer;