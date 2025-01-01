const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');


//Tipos de estados permitidas
const ESTADOS = ['nuevo', 'usado'];

//Tipos de modalidades permitidas
const MODALIDADES = ['compra', 'arriendo'];

// Tipos de vivienda
const TIPO_VIVIENDA = ['VIS', 'no VIS'];

// Tipos de estados de publicacion permitidos
const ESTADOS_PUBLICACION = ['borrador', 'publicado'];

const Inmueble = sequelize.define('Inmueble', {
    idInmueble: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, // Declara que es autoincremental
        field: 'id_inmueble'
    },
    codigoInmueble: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'codigo_inmueble'
    },
    ubicacionInmueble: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        field: 'ubicacion_inmueble'
    },
    estadoInmueble: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [ESTADOS],
                msg: `Estado no valido. Los estados permitidos son: ${ESTADOS.join(', ')}.`
            }
        },
        field: 'estado_inmueble'
    },

    modalidadInmueble: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [MODALIDADES],
                msg: `Modalidad no valida. Las modalidades permitidas son: ${MODALIDADES.join(', ')}.`
            }
        },
        field: 'modalidad'
    },
    tituloInmueble: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'titulo_inmueble'
    },
    estrato: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        validate: {
            isIn: {
                args: [[1, 2, 3, 4, 5, 6]],  // Valores permitidos
                msg: "El valor del estrato debe ser 0, 1, 2, 3, 4, 5 o 6."
            }
        },
        field: 'estrato'
    },
    administracion: { //Administración incluida: 0- No, 1-si
        type: DataTypes.TINYINT(1),
        allowNull: true,
        validate: {
            isIn: {
                args: [[0, 1]],  // Valores permitidos
                msg: "El valor de 'administración incluida' no es correcto"
            }
        },
        field: 'administracion_incluida'
    },

    tipoVivienda: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [TIPO_VIVIENDA], //Valores permitidos
                msg: `Tipo no valido. Los tipos de vivienda permitidos son: ${TIPO_VIVIENDA.join(', ')}.`
            }
        },
        field: 'tipo_vivienda'
    },
    frameMaps: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'iframe_maps'
    },
    descripcionInmueble: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'descripcion'
    },
    estadoPublicacionInmueble: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isIn: {
                args: [ESTADOS_PUBLICACION], //Valores permitidos
                msg: `Tipo no valido. Los tipos de estado permitidos son: ${ESTADOS_PUBLICACION.join(', ')}.`
            }
        },
        field: 'estado_publicacion'
    },
    idCustomer: {
        type: DataTypes.INTEGER, //Integra a la tabla de customers
        references: {
            model: 'customers',  // Nombre de la tabla asociada
            key: 'id_customer' //Nombre de la clave primaria de la tabla asociada
        },
        allowNull: false,
        field: 'id_customer'
    },
    codigoCiudad: {
        type: DataTypes.INTEGER,
        references: {
            model: 'ciudades',  // Nombre de la tabla asociada
            key: 'cod_ciudad' //Nombre de la clave primaria de la tabla asociada
        },
        allowNull: false,
        field: 'cod_ciudad' //Nombre del campo FK
    },
    idTipoInmueble: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tipos_inmueble',  // Nombre de la tabla asociada
            key: 'id_tipo_inmueble' //Nombre de la clave primaria de la tabla asociada
        },
        allowNull: false,
        field: 'id_tipo_inmueble' //Nombre del campo FK
    }
}, {
    tableName: 'inmuebles',
    timestamps: false,
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

module.exports = Inmueble;