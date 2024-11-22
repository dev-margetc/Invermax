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
const Foto = require('../entities/Foto');
const Video = require('../entities/Video');
const VistaInmueblesPublicados = require('../entities/VistaInmueblesPublicados');
const Customer = require('../../usuarios/entities/Customer');

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
  foreignKey: 'id_inmueble', // Llave foranea relacionada en la intermedia
  as: "zonas"
});

// Una zona puede tener asociados varios inmuebles
Zona.belongsToMany(Inmueble, {
  through: ZonaInmueble, // Mapeo de la intermedia
  foreignKey: 'id_zona',
  as: "inmuebles" // Llave foranea relacionada en la intermedia
});

// Asociacion de la intermedia
Inmueble.hasMany(ZonaInmueble, { foreignKey: 'id_inmueble', as: 'zonasInmueble' });

// Un inmueble solo pertenece a un inmueble
Inmueble.belongsTo(Ciudad, {
  foreignKey: 'cod_ciudad',
  as: 'ciudad', // Alias para la relación
});


// Un tipo puede tener varios inmuebles asociados
TipoInmueble.hasMany(Inmueble, { foreignKey: 'id_tipo_inmueble', as: 'inmuebles' });

// Un inmueble tiene asociado un tipo
Inmueble.belongsTo(TipoInmueble, { foreignKey: 'id_tipo_inmueble', as: 'tipoInmueble' });

// Un inmueble solo tiene un proyecto asociado
Inmueble.hasOne(Proyecto, {
  foreignKey: 'id_inmueble', // Clave foránea en la tabla de Proyecto
  as: 'proyecto' // Alias para la relación
});

// Un proyecto pertence solo a un inmueble
Proyecto.belongsTo(Inmueble, { foreignKey: 'id_proyecto', as: 'inmueble' });

// Un inmueble tiene varios interesados
Inmueble.hasMany(Interesado, { foreignKey: 'idInmueble', as: 'interesados' });


// Un interesado pertenece a solo un inmueble
Interesado.belongsTo(Inmueble, { foreignKey: 'idInmueble', as: 'inmueble' });

// Un DetalleInmueble tiene varias fotos
DetalleInmueble.hasMany(Foto, { foreignKey: 'id_detalle_inmueble', as: 'fotos' });

//Una foto pertenece a un detalle
Foto.belongsTo(DetalleInmueble, { foreignKey: 'id_detalle_inmueble', as: 'detalle' });

// Un DetalleInmueble tiene varios videos
DetalleInmueble.hasMany(Video, { foreignKey: 'id_detalle_inmueble', as: 'videos' });

//Un video pertenece a un detalle
Video.belongsTo(DetalleInmueble, { foreignKey: 'id_detalle_inmueble', as: 'detalle' });


/* Relaciones de la vista de filtro*/
  VistaInmueblesPublicados.belongsTo(Ciudad, {
      foreignKey: 'cod_ciudad',
      as: 'ciudad', // Alias para la relación
  });

  VistaInmueblesPublicados.belongsTo(Inmueble, {
    foreignKey: 'id_inmueble',
    as: 'inmueble', // Alias para la relación
});

/* Relaciones con el modulo de usuarios*/
//Un inmueble pertenece a un customer
Inmueble.belongsTo(Customer, { foreignKey: 'id_customer', as: 'customer' });

// Un Customer puede tener varios inmuebles
Customer.hasMany(Inmueble, { foreignKey: 'id_customer', as: 'inmuebles' });
