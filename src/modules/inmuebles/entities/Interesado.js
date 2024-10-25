const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');


//Tipos de ubicaciones
const UBICACIONES = ['rural', 'urbana'];

const Interesado = sequelize.define('Interesado', {
    idInteresado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, // Declara que es autoincremental
        field: 'id_interesado'
    },
    nombreInteresado: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nombre'
    },
    telefonoInteresado: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'telefono'
    },

    correoInteresado: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'correo'
    },

    ubicacionInteresado: {
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
    estadoCivilInteresado: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'estadoCivil'
    },

    subsidioInteresado: { //Subsidio: 0- No, 1-si
        type: DataTypes.TINYINT(1),
        allowNull: false,
        validate: {
            isIn: {
                args: [[0, 1]],  // Valores permitidos
                msg: "El valor de 'subsidio' no es correcto"
            }
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