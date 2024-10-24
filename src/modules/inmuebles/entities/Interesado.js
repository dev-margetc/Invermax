const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');


//Tipos de ubicaciones
const UBICACIONES = ['rural', 'urbana'];

const Interesado = sequelize.define('Interesado', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'id_interesado'
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nombre'
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'telefono'
    },

    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'correo'
    },

    ubicacion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [UBICACIONES],
                msg: `Ubicacion no valida. Los tipos permitidos son: ${UBICACIONES.join(', ')}.`
            }
        },
        field: 'ubicacion'
    },
    estadoCivil: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'estadoCivil'
    },

    subsidio: { //Subsidio: 0- No, 1-si
        type: DataTypes.TINYINT(1),
        allowNull: false,
        isIn: {
            args: [[0, 1]],  // Valores permitidos
            msg: "El valor de 'subsidio' no es correcto"
        },
        field: 'subsidio'
    },

    idInmueble: {
        type: DataTypes.INTEGER,
        references: {
            model: 'inmuebles',  // Nombre de la tabla
            key: 'id_inmueble'
        },
        allowNull: false,
        field: 'id_inmueble'
    }
}, {
    tableName: 'interesados',
    timestamps: false,
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

module.exports = Interesado;