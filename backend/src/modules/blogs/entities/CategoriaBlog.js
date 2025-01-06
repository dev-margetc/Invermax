//Tabla intermedia entre categorias y blogs
const sequelize = require('../../../conf/database');

const CategoriaBlog = sequelize.define('CategoriaBlog', {}, {
    tableName: 'categorias_blogs',  
    timestamps: false // No se tiene createdAt o updatedAt
  });
  
// Exportar el modelo
module.exports = CategoriaBlog;