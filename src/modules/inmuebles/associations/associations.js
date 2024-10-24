// Define las relaciones entre los modelos de sequelize
const Departamento = require('../entities/Departamento');
const Ciudad = require('../entities/Ciudad');
const TipoImueble = require("../entities/TipoInmueble");
const Zona = require("../entities/Zona");
const ZonaInmueble = require("../entities/ZonasInmuebles");
const Inmueble = require("../entities/Inmueble");
const Proyecto = require('../entities/Proyecto');
const Interesado = require('../entities/Interesado');

// Un departamento tiene muchas ciudades
Departamento.hasMany(Ciudad, { foreignKey: 'id_departamento', as: 'ciudades' }); //La fk es de ciudad

// Una ciudad pertenece a un departamento
Ciudad.belongsTo(Departamento, { foreignKey: 'id_departamento', as: 'departamento' }); // La fk es de ciudad por el tipo de relacion

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
TipoImueble.hasMany(Inmueble, { foreignKey: 'id_inmueble', as: 'inmuebles' });

// Un inmueble tiene asociado un tipo
Inmueble.belongsTo(TipoImueble, { foreignKey: 'id_inmueble', as: 'tipo_inmueble' });

// Un inmueble solo tiene un proyecto asociado
Inmueble.hasOne(Proyecto, { 
    foreignKey: 'id_inmueble', // Clave foránea en la tabla de Proyecto
    as: 'proyecto' // Alias para la relación
  });
  
  // Un proyecto pertence solo a un inmueble
  Proyecto.belongsTo(Inmueble, { 
    foreignKey: 'id_proyecto', // Clave foránea en la tabla de Proyecto
    as: 'inmueble' // Alias para la relación
  });

  // Un inmueble tiene varios interesados
Inmueble.hasMany(Interesado, { 
    foreignKey: 'id_inmueble', // Clave foránea en la tabla de interesados
    as: 'interesados' // Alias para la relación
  });
  
  // Un interesado pertenece a solo un inmueble
Interesado.belongsTo(Inmueble, { 
    foreignKey: 'id_inmueble', // Clave foránea en la tabla de interesados
    as: 'inmueble' // Alias para la relación
  });
  