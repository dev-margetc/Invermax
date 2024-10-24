// Define las relaciones entre los modelos de sequelize
const Departamento = require('../entities/Departamento');
const Ciudad = require('../entities/Ciudad');


// Un departamento tiene muchas ciudades
Departamento.hasMany(Ciudad, { foreignKey: 'id_departamento', as: 'ciudades' });

// Una ciudad pertenece a un departamento
Ciudad.belongsTo(Departamento, { foreignKey: 'id_departamento', as: 'departamento' });