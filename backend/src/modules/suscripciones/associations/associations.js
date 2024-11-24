// Define las relaciones entre los modelos de sequelize del modulo de suscripciones
const Plan = require("../entities/Plan");
const Customer = require("../../usuarios/entities/Customer");
const Inmueble = require("../../inmuebles/entities/Inmueble");
const Suscripcion = require("../entities/Suscripcion");
const Caracteristica = require("../entities/Caracteristica");
const InmuebleAscenso = require("../entities/InmuebleAscenso");
const InmuebleDestacado = require("../entities/InmuebleDestacado");
const CaracteristicaPlan = require("../entities/CaracteristicaPlan");
const SaldoCaracteristica = require("../entities/SaldoCaracteristica");

/* Relaciones caracteristicas-caracteristicasPlanes */

// Una caracteristica puede estar asociada a varios planes por medio de caracteristicas_Planes
Caracteristica.hasMany(CaracteristicaPlan, { foreignKey: 'id_caracteristica', as: 'caracteristicasPlanes' }); //La fk es de la foranea y se coloca como se conocera a los "muchos" de la relacion

// Una CaracteristicaPlan solo asocia una caracteristica a la vez
CaracteristicaPlan.belongsTo(Caracteristica, { foreignKey: 'id_caracteristica', as: 'caracteristica' }); // La fk es de la primaria por el tipo de relacion


/* Relaciones caracteristicas-saldosCaracteristicas */

// Una caracteristica puede tener varios saldos
Caracteristica.hasMany(SaldoCaracteristica, { foreignKey: 'id_caracteristica', as: 'saldosCaracteristica' }); //La fk es de la foranea y se coloca como se conocera a los "muchos" de la relacion

// Un saldo solo puede relacionarse con una caracteristica
SaldoCaracteristica.belongsTo(Caracteristica, { foreignKey: 'id_caracteristica', as: 'caracteristica' }); // La fk es de la primaria por el tipo de relacion


/* Relaciones planes-caracteristicas-planes*/

// Un plan puede tener varias caracteristicas por medio de caracteristicas_Planes 
Plan.hasMany(CaracteristicaPlan, { foreignKey: 'id_plan', as: 'caracteristicasPlanes' }); //La fk es de la foranea y se coloca como se conocera a los "muchos" de la relacion

// Una caracteristicaPlan solo pertenece a un plan
CaracteristicaPlan.belongsTo(Plan, { foreignKey: 'id_plan', as: 'plan' }); // La fk es de la primaria por el tipo de relacion


/* Relaciones planes-suscripciones*/

// Un plan puede tener varias suscripciones
Plan.hasMany(Suscripcion, { foreignKey: 'id_plan', as: 'suscripciones' }); //La fk es de la foranea y se coloca como se conocera a los "muchos" de la relacion

// Una suscripcion solo pertenece a un plan
Suscripcion.belongsTo(Plan, { foreignKey: 'id_plan', as: 'plan' }); // La fk es de la primaria por el tipo de relacion


/* Relaciones suscripciones-saldosCaracteristica*/

// Una suscripcion puede tener varios saldos
Suscripcion.hasMany(SaldoCaracteristica, { foreignKey: 'id_suscripcion', as: 'saldosCaracteristicas' }); //La fk es de la foranea y se coloca como se conocera a los "muchos" de la relacion

// Un saldo solo pertenece a una suscripcion
SaldoCaracteristica.belongsTo(Suscripcion, { foreignKey: 'id_suscripcion', as: 'suscripcion' }); // La fk es de la primaria por el tipo de relacion


/* Relaciones suscripciones-customer*/

// Un customer puede tener varias suscripciones
Customer.hasMany(Suscripcion, { foreignKey: 'id_customer', as: 'suscripciones' }); //La fk es de la foranea y se coloca como se conocera a los "muchos" de la relacion

// Una suscripcion solo pertenece a un customer
Suscripcion.belongsTo(Customer, { foreignKey: 'id_customer', as: 'customer' }); // La fk es de la primaria por el tipo de relacion


/* Relaciones suscripciones-inmueblesDestacados*/

// Una suscripcion puede tener varios destacados
Suscripcion.hasMany(InmuebleDestacado, { foreignKey: 'id_suscripcion', as: 'inmueblesDestacados' }); //La fk es de la foranea y se coloca como se conocera a los "muchos" de la relacion

// Un destacado solo pertenece a una suscripcion
InmuebleDestacado.belongsTo(Suscripcion, { foreignKey: 'id_suscripcion', as: 'suscripcion' }); // La fk es de la primaria por el tipo de relacion


/* Relaciones suscripciones-inmueblesAscenso*/

// Una suscripcion puede tener varios destacados
Suscripcion.hasMany(InmuebleAscenso, { foreignKey: 'id_suscripcion', as: 'inmueblesAscenso' }); //La fk es de la foranea y se coloca como se conocera a los "muchos" de la relacion

// Un ascenso solo pertenece a una suscripcion
InmuebleAscenso.belongsTo(Suscripcion, { foreignKey: 'id_suscripcion', as: 'suscripcion' }); // La fk es de la primaria por el tipo de relacion



/* Relaciones inmueblesAscenso-inmuebles*/

// Un inmueble puede tener varios registros en ascenso
Inmueble.hasMany(InmuebleAscenso, { foreignKey: 'id_inmueble', as: 'inmueblesAscenso' }); //La fk es de la foranea y se coloca como se conocera a los "muchos" de la relacion

// Un ascenso solo pertenece a una suscripcion
InmuebleAscenso.belongsTo(Inmueble, { foreignKey: 'id_inmueble', as: 'inmueble' }); // La fk es de la primaria por el tipo de relacion

/* Relaciones inmueblesDestacado-inmuebles*/

// Un inmueble puede tener varios registros en destacado
Inmueble.hasMany(InmuebleDestacado, { foreignKey: 'id_inmueble', as: 'inmueblesDestacados' }); //La fk es de la foranea y se coloca como se conocera a los "muchos" de la relacion

// Un ascenso solo pertenece a una suscripcion
InmuebleDestacado.belongsTo(Inmueble, { foreignKey: 'id_inmueble', as: 'inmueble' }); // La fk es de la primaria por el tipo de relacion




