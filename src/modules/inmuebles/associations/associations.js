// Define las relaciones entre los modelos de sequelize
const Departamento = require('../entities/Departamento');
const Ciudad = require('../entities/Ciudad');
const TipoInmueble = require("../entities/TipoInmueble");
const Zona = require("../entities/Zona");
const ZonaInmueble = require("../entities/ZonasInmuebles");
const Inmueble = require("../entities/Inmueble");
const Proyecto = require('../entities/Proyecto');
const Interesado = require('../entities/Interesado');
const DetalleInmueble = require('../entities/DetalleInmueble');

// Un departamento tiene muchas ciudades
Departamento.hasMany(Ciudad, { foreignKey: 'id_departamento', as: 'ciudades' }); //La fk es de ciudad

// Una ciudad pertenece a un departamento
Ciudad.belongsTo(Departamento, { foreignKey: 'id_departamento', as: 'departamento' }); // La fk es de ciudad por el tipo de relacion


// Un inmueble puede tener varios detalles (por proyecto principalmente)
Inmueble.hasMany(DetalleInmueble, { foreignKey: 'id_inmueble', as: 'detalles' });

// Un detalle solo tiene asociado un inmueble
DetalleInmueble.belongsTo(Inmueble, { foreignKey: 'id_inmueble', as: 'inmueble' });


// Un inmueble puede tener asociadas varias zonas
Inmueble.belongsToMany(Zona, {
  through: ZonaInmueble, // Mapeo de la intermedia
  foreignKey: 'id_inmueble' // Llave foranea relacionada en la intermedia
});

// Una zona puede tener asociados varios inmuebles
Inmueble.belongsToMany(Zona, {
  through: ZonaInmueble, // Mapeo de la intermedia
  foreignKey: 'id_inmueble' // Llave foranea relacionada en la intermedia
});

// Un tipo puede tener varios inmuebles asociados
TipoInmueble.hasMany(Inmueble, { foreignKey: 'id_tipo_inmueble', as: 'inmuebles' });

// Un inmueble tiene asociado un tipo
Inmueble.belongsTo(TipoInmueble, { foreignKey: 'id_tipo_inmueble', as: 'tipo_inmueble' });

// Un inmueble solo tiene un proyecto asociado
Inmueble.hasOne(Proyecto, {
  foreignKey: 'id_inmueble', // Clave foránea en la tabla de Proyecto
  as: 'proyecto' // Alias para la relación
});

// Un proyecto pertence solo a un inmueble
Proyecto.belongsTo(Inmueble, { foreignKey: 'id_proyecto', as: 'inmueble' });

// Un inmueble tiene varios interesados
Inmueble.hasMany(Interesado, { foreignKey: 'id_inmueble', as: 'interesados' });




// Un interesado pertenece a solo un inmueble
Interesado.belongsTo(Inmueble, { foreignKey: 'id_inmueble', as: 'inmueble' });
