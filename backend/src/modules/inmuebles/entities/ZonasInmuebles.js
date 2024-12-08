//Tabla intermedia entre zonas e inmuebles
const sequelize = require('../../../conf/database');

const ZonaInmueble = sequelize.define('ZonaInmueble', {}, {
    tableName: 'zonas_inmuebles',  
    timestamps: false // No se tiene createdAt o updatedAt
  });
  
// Exportar el modelo
module.exports = ZonaInmueble;