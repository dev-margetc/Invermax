const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');

const Caracteristica = sequelize.define('Caracteristica', {
    idCaracteristica: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, // Declara que es autoincremental
        field: 'id_caracteristica'
    },
    nombreCaracteristica: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nombre_caracteristica'
    },
    descripcionCaracteristica: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'descripcion'
    },
    claveCaracteristica: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'clave'
    },
    obligatoria: { //Caracteristica obligatoria para un plan: 0- No, 1-si
        type: DataTypes.TINYINT(1),
        allowNull: true,
        validate: {
            isIn: {
                args: [[0, 1]],  // Valores permitidos
                msg: "El valor de 'obligatoria' no es correcto"
            }
        },
        field: 'obligatoria'
    }

}, {
    tableName: 'caracteristicas',
    timestamps: false,
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
})


module.exports = Caracteristica;