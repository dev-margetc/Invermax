const { DataTypes } = require('sequelize');
const sequelize = require('../../../conf/database');


const VistaInmueblesPublicados = sequelize.define('VistaInmueblesPublicados', {
    idInmueble: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Esto indica que es una clave primaria
        field: 'id_inmueble'
    },
    estadoInmueble: {type:DataTypes.STRING, field: 'estado_inmueble'},
    modalidad: {type:DataTypes.STRING}, 
    tituloInmueble: {type: DataTypes.STRING, field: 'titulo_inmueble'},
    fechaPublicacion: {type: DataTypes.DATE, field: 'fecha_publicacion'},
    idCustomer: {type: DataTypes.INTEGER,field: 'id_customer'},
    codCiudad: {type: DataTypes.INTEGER, field: 'cod_ciudad'},
    idTipoInmueble: {type: DataTypes.INTEGER,field: 'id_tipo_inmueble'}
}, {
    tableName: 'vista_inmuebles_publicados', // Nombre de la vista
    timestamps: false, // Las vistas no tienen timestamps
});

module.exports = VistaInmueblesPublicados;